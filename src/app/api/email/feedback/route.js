import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const MAX_IMAGE_SIZE = 2 * 1024 * 1024
const REQUIRED_ENV_VARS = ['EMAIL_HOST', 'EMAIL_PORT', 'EMAIL_ADDRESS', 'EMAIL_PW']
const ALLOWED_IMAGE_TYPES = new Set(['image/gif', 'image/jpeg', 'image/png', 'image/webp'])

function text(value, maxLength = 1000) {
  return typeof value === 'string' ? value.replace(/\r\n/g, '\n').trim().slice(0, maxLength) : ''
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

function validateImage(file) {
  if (file === null) return ''
  if (!(file instanceof File) || file.size === 0) return 'The uploaded image could not be read.'
  if (file.size > MAX_IMAGE_SIZE) return 'The uploaded image must be smaller than 2MB.'
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) return 'Please upload a JPEG, PNG, WEBP, or GIF image.'

  return ''
}

function isSupportedImage(buffer) {
  const isJpeg = buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
  const isPng = buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  const isGif = buffer.length >= 6 && (buffer.subarray(0, 6).toString() === 'GIF87a' || buffer.subarray(0, 6).toString() === 'GIF89a')
  const isWebp = buffer.length >= 12 && buffer.subarray(0, 4).toString() === 'RIFF' && buffer.subarray(8, 12).toString() === 'WEBP'

  return isJpeg || isPng || isGif || isWebp
}

export async function POST(request) {
  let formData

  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ message: 'Invalid multipart form submission.' }, { status: 400 })
  }

  const fields = {
    fullName: text(formData.get('fullName'), 120),
    company: text(formData.get('company'), 160),
    designation: text(formData.get('designation'), 160),
    comment: text(formData.get('comment'), 2000),
  }
  const rating = Number.parseFloat(text(formData.get('rating'), 10))
  const image = formData.get('image')
  const imageError = validateImage(image)

  if (!fields.fullName || !Number.isFinite(rating) || imageError) {
    return NextResponse.json(
      { message: imageError || 'Name and star rating are required.' },
      { status: 400 }
    )
  }

  if (rating < 0.5 || rating > 5 || !Number.isInteger(rating * 2)) {
    return NextResponse.json({ message: 'Please provide a rating in half-star increments.' }, { status: 400 })
  }

  try {
    const imageBuffer = image ? Buffer.from(await image.arrayBuffer()) : null
    if (imageBuffer && !isSupportedImage(imageBuffer)) {
      return NextResponse.json({ message: 'The uploaded file is not a valid image.' }, { status: 400 })
    }

    const safeFields = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => [key, escapeHtml(value)])
    )
    const stars = `${rating.toFixed(1)} / 5.0`
    const attachment = image
      ? [{ filename: image.name, content: imageBuffer, contentType: image.type }]
      : []

    await createTransporter().sendMail({
      from: `Bitwork Tech <${process.env.EMAIL_FROM ?? process.env.EMAIL_ADDRESS}>`,
      to: process.env.EMAIL_TO || process.env.EMAIL_ADDRESS,
      subject: `New Bitwork Tech feedback: ${fields.fullName} (${stars})`,
      text: [
        'New feedback submitted through the Bitwork Tech website.',
        '',
        `Name: ${fields.fullName}`,
        `Designation: ${fields.designation || 'Not provided'}`,
        `Company: ${fields.company || 'Not provided'}`,
        `Star Rating: ${stars}`,
        `Comment: ${fields.comment || 'Not provided'}`,
        image ? `Photo / Logo: ${image.name}` : 'Photo / Logo: Not attached',
      ].join('\n'),
      html: `
        <div style="margin:0;background:#f4f7fb;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#142334;">
          <div style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid rgba(20,35,52,0.08);border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(20,35,52,0.12);">
            <div style="padding:28px;background:linear-gradient(135deg,#15354a 0%,#1f6f85 55%,#d8a14f 100%);color:#f8fbff;">
              <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;opacity:0.82;">Bitwork Tech Feedback</p>
              <h1 style="margin:0;font-size:28px;line-height:1.2;">A new review has arrived</h1>
            </div>
            <div style="padding:28px;">
              <div style="margin:0 0 24px;padding:20px;border-radius:16px;background:#eef6f7;text-align:center;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#1f6f85;">Star Rating</p>
                <p style="margin:0;font-size:32px;font-weight:700;letter-spacing:0.05em;color:#d59b38;">&#9733; <span style="font-size:18px;color:#142334;vertical-align:middle;">${stars}</span></p>
              </div>
              <table role="presentation" style="width:100%;border-collapse:separate;border-spacing:0 10px;">
                <tr><td style="width:150px;padding:13px 15px;border-radius:12px 0 0 12px;background:#f5f8fb;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7c8e;">Name</td><td style="padding:13px 15px;border-radius:0 12px 12px 0;background:#f5f8fb;font-size:15px;color:#142334;">${safeFields.fullName}</td></tr>
                <tr><td style="width:150px;padding:13px 15px;border-radius:12px 0 0 12px;background:#f5f8fb;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7c8e;">Designation</td><td style="padding:13px 15px;border-radius:0 12px 12px 0;background:#f5f8fb;font-size:15px;color:#142334;">${safeFields.designation || 'Not provided'}</td></tr>
                <tr><td style="width:150px;padding:13px 15px;border-radius:12px 0 0 12px;background:#f5f8fb;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6b7c8e;">Company</td><td style="padding:13px 15px;border-radius:0 12px 12px 0;background:#f5f8fb;font-size:15px;color:#142334;">${safeFields.company || 'Not provided'}</td></tr>
              </table>
              <div style="margin-top:20px;padding:20px;border:1px solid #e4ebf1;border-radius:16px;background:#fbfcfd;">
                <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6b7c8e;">Comment</p>
                <p style="margin:0;font-size:15px;line-height:1.75;color:#142334;white-space:pre-wrap;">${safeFields.comment || 'Not provided'}</p>
              </div>
              <div style="margin-top:18px;padding:15px 18px;border-radius:12px;background:#eef6f7;color:#1f6f85;font-size:14px;">${image ? `Photo / logo attached: <strong>${escapeHtml(image.name)}</strong>` : 'No photo or logo attached.'}</div>
            </div>
          </div>
        </div>
      `,
      attachments: attachment,
    })

    return NextResponse.json({ message: 'Thank you. Your feedback has been submitted.' })
  } catch (error) {
    console.error('Failed to send feedback email:', error)
    return NextResponse.json({ message: 'Unable to submit your feedback right now.' }, { status: 500 })
  }
}