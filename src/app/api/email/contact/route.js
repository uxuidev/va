import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const REQUIRED_ENV_VARS = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_ADDRESS', 'EMAIL_PW']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function text(value, maxLength = 1000) {
  return typeof value === 'string'
    ? value.replace(/\r\n/g, '\n').trim().slice(0, maxLength)
    : ''
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function createTransporter() {
  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key])
  if (missing.length) throw new Error(`Missing email configuration: ${missing.join(', ')}`)

  const port = Number.parseInt(process.env.EMAIL_PORT, 10)
  if (!Number.isFinite(port)) throw new Error('EMAIL_PORT must be a valid number.')

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port,
    secure: ['1', 'true', 'yes'].includes((process.env.EMAIL_SECURITY ?? '').toLowerCase()) || port === 465,
    auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PW },
  })
}

// Helper function to sync general contact form submissions to HubSpot
async function syncToHubSpot({ name, country, phone, email, subject, message }) {
  const apiKey = process.env.HUBSPOT_API_KEY || process.env.HUBSPOT_ACCESS_TOKEN

  if (!apiKey) {
    console.warn('HubSpot integration skipped: HUBSPOT_API_KEY environment variable is not defined.')
    return
  }

  // Split full name into first and last name
  const nameParts = name.trim().split(' ')
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ') || ''

  // Combine subject line into the message body so context isn't lost in standard properties
  const fullMessage = subject ? `Subject: ${subject}\n\n${message}` : message

  try {
    const hubspotPayload = {
      properties: {
        email: email,
        firstname: firstName,
        lastname: lastName,
        country: country,
        phone: phone, // Native HubSpot property for phone number
        message: fullMessage, // Standard multi-line text property
      },
    }

    const response = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hubspotPayload),
    })

    const responseData = await response.json()

    // HTTP status 409 means contact already exists in HubSpot
    if (response.status === 409) {
      console.log(`HubSpot sync notice: Contact (${email}) already exists in HubSpot.`)
      return
    }

    if (!response.ok) {
      console.error('HubSpot API Error:', responseData)
    } else {
      console.log(`Successfully synced contact (${email}) to HubSpot. ID: ${responseData.id}`)
    }
  } catch (error) {
    // Log the error so failures in HubSpot do not break email dispatch
    console.error('Failed to sync contact to HubSpot:', error)
  }
}

export async function POST(request) {
  let payload
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid JSON payload.' }, { status: 400 })
  }

  const name = text(payload?.name, 120)
  const country = text(payload?.country ?? payload?.company, 160)
  const phone = text(payload?.phone, 60)
  const email = text(payload?.email, 160)
  const subject = text(payload?.subject, 120) || 'Website contact request'
  const message = text(payload?.message, 4000)

  if (![email, message].every(Boolean)) {
    return NextResponse.json({ message: 'All contact fields are required.' }, { status: 400 })
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ message: 'Please provide a valid email address.' }, { status: 400 })
  }

  // 1. Sync Contact Data to HubSpot CRM
  await syncToHubSpot({ name, country, phone, email, subject, message })

  // 2. Prepare and Send Email Notification via Nodemailer
  const safe = [name, country, phone, email, subject, message].map(escapeHtml)
  const [safeName, safeCountry, safePhone, safeEmail, safeSubject, safeMessage] = safe

  try {
    await createTransporter().sendMail({
      from: `VIVA WORK <${process.env.EMAIL_FROM ?? process.env.EMAIL_ADDRESS}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_ADDRESS,
      replyTo: email,
      subject: `Website contact: ${subject}`,
      text: [
        'A new contact request was submitted through the Vivawork website.',
        '',
        `Name: ${name}`,
        `Country: ${country}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <div style="margin:0;background:#f4f7fb;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#142334;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid rgba(20,35,52,0.08);border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(20,35,52,0.12);">
            <div style="padding:28px;background:linear-gradient(135deg,#15354a 0%,#1f6f85 55%,#d8a14f 100%);color:#f8fbff;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.82;">Vivawork Contact Desk</p>
              <h1 style="margin:0;font-size:28px;line-height:1.2;">New Contact Request</h1>
            </div>
            <div style="padding:28px;">
              <p style="margin:0 0 22px;font-size:15px;line-height:1.7;color:#4b5c6d;">Someone sent a message through the website contact form.</p>
              <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0 10px;">
                <tr><td style="width:150px;padding:13px 15px;border-radius:12px 0 0 12px;background:#f5f8fb;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7c8e;">Name</td><td style="padding:13px 15px;border-radius:0 12px 12px 0;background:#f5f8fb;font-size:15px;color:#142334;">${safeName}</td></tr>
                <tr><td style="width:150px;padding:13px 15px;border-radius:12px 0 0 12px;background:#f5f8fb;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7c8e;">Country</td><td style="padding:13px 15px;border-radius:0 12px 12px 0;background:#f5f8fb;font-size:15px;color:#142334;">${safeCountry}</td></tr>
                <tr><td style="width:150px;padding:13px 15px;border-radius:12px 0 0 12px;background:#f5f8fb;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7c8e;">Phone</td><td style="padding:13px 15px;border-radius:0 12px 12px 0;background:#f5f8fb;font-size:15px;color:#142334;">${safePhone}</td></tr>
                <tr><td style="width:150px;padding:13px 15px;border-radius:12px 0 0 12px;background:#f5f8fb;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7c8e;">Email</td><td style="padding:13px 15px;border-radius:0 12px 12px 0;background:#f5f8fb;font-size:15px;color:#142334;">${safeEmail}</td></tr>
                <tr><td style="width:150px;padding:13px 15px;border-radius:12px 0 0 12px;background:#f5f8fb;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7c8e;">Subject</td><td style="padding:13px 15px;border-radius:0 12px 12px 0;background:#f5f8fb;font-size:15px;color:#142334;">${safeSubject}</td></tr>
              </table>
              <div style="margin-top:20px;padding:20px;border:1px solid #e4ebf1;border-radius:16px;background:#fbfcfd;">
                <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6b7c8e;">Message</p>
                <p style="margin:0;font-size:15px;line-height:1.75;color:#142334;white-space:pre-wrap;">${safeMessage}</p>
              </div>
            </div>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ message: 'Message sent successfully.' })
  } catch (error) {
    console.error('Failed to send contact email:', error)
    return NextResponse.json({ message: 'Unable to send your message right now.' }, { status: 500 })
  }
}