'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Eye, EyeOff, LoaderCircle, Mail, MapPin, MessageCircle, Send } from 'lucide-react';

const initialForm = {
    name: '',
    email: '',
    country: '',
    phone: '',
    message: '',
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact({ t = {} }) {
    const shouldReduceMotion = useReducedMotion();
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState('idle');
    const [statusMessage, setStatusMessage] = useState('');
    const [isMapRevealed, setIsMapRevealed] = useState(false);
    const [isMapClosing, setIsMapClosing] = useState(false);

    const formCopy = t.form || {};
    const labels = {
        name: formCopy.nameLabel || 'Full name',
        email: formCopy.emailLabel || 'Email address',
        country: formCopy.countryLabel || 'Country',
        phone: formCopy.phoneLabel || 'Phone number',
        message: formCopy.messageLabel || 'Message',
    };

    const validate = () => {
        const nextErrors = {};
        ['email', 'message'].forEach((field) => {
            const label = labels[field];
            if (!form[field].trim()) nextErrors[field] = `${label} ${t.requiredError || 'is required.'}`;
        });
        if (form.email && !emailPattern.test(form.email)) {
            nextErrors.email = t.emailError || 'Enter a valid email address.';
        }
        return nextErrors;
    };

    const handleChange = ({ target: { name, value } }) => {
        setForm((current) => ({ ...current, [name]: value }));
        setErrors((current) => {
            if (!current[name]) return current;
            const { [name]: _clearedError, ...remainingErrors } = current;
            return remainingErrors;
        });
        if (status !== 'idle') setStatus('idle');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const nextErrors = validate();
        if (Object.keys(nextErrors).length) {
            setErrors(nextErrors);
            setStatus('error');
            setStatusMessage(t.validationError || 'Please correct the highlighted fields.');
            return;
        }

        setStatus('submitting');
        setStatusMessage('');

        try {
            const response = await fetch('/api/email/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const result = await response.json().catch(() => ({}));

            if (!response.ok) throw new Error(result.message || t.errorMessage || 'Unable to send your message right now.');

            setForm(initialForm);
            setErrors({});
            setStatus('success');
            setStatusMessage(result.message || t.successMessage || 'Thanks. Your message has been sent.');
        } catch (error) {
            setStatus('error');
            setStatusMessage(error.message || t.errorMessage || 'Unable to send your message right now.');
        }
    };

    const entrance = shouldReduceMotion ? {} : { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.16 }, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } };
    const inputClass = 'mt-2 w-full rounded-md border bg-body-bg px-3 py-2.5 text-sm text-text-main outline-none transition-[border-color,box-shadow] placeholder:text-text-muted focus:border-accent-color focus:ring-2 focus:ring-accent-color/25';

    return (
        <section id="contact" className="scroll-mt-20 overflow-hidden bg-section-beta py-16 sm:py-20 lg:py-24" aria-labelledby="contact-heading">
            <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                <div className="max-w-3xl">
                    <span className="inline-flex rounded-full border border-header-border bg-section-alpha px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-accent-color">
                        {t.eyebrow || 'Contact'}
                    </span>
                    <h2 id="contact-heading" className="mt-4 text-3xl font-bold leading-tight text-heading-color sm:text-4xl">{t.heading || "Let's get started"}</h2>
                    <p className="mt-4 text-base leading-relaxed text-text-muted">{t.subheading || 'Send us a message and let us know how we can help.'}</p>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] lg:gap-10">
                    <motion.div {...entrance} className="rounded-lg border border-card-border bg-section-alpha p-5 shadow-[0_18px_40px_-28px_color-mix(in_srgb,var(--heading-color)_60%,transparent)] sm:p-7">
                        <form noValidate onSubmit={handleSubmit} className="space-y-5" aria-describedby={statusMessage ? 'contact-form-status' : undefined}>
                            <div className="grid gap-5 sm:grid-cols-2">
                                {['name', 'email', 'country', 'phone'].map((field) => (
                                    <div key={field}>
                                        <label htmlFor={`contact-${field}`} className="text-sm font-bold text-heading-color">
                                            {labels[field]} {field === 'email' && <><span className="text-accent-color" aria-hidden="true">*</span><span className="sr-only"> {t.requiredLabel || 'required'}</span></>}
                                        </label>
                                        <input id={`contact-${field}`} name={field} type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'} autoComplete={field === 'name' ? 'name' : field === 'email' ? 'email' : field === 'country' ? 'country-name' : 'tel'} value={form[field]} onChange={handleChange} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `contact-${field}-error` : undefined} className={`${inputClass} ${errors[field] ? 'border-accent-color ring-2 ring-accent-color/25' : 'border-card-border'}`} placeholder={formCopy[`${field}Placeholder`] || ''} />
                                        {errors[field] && <p id={`contact-${field}-error`} className="mt-1.5 text-xs font-medium text-accent-color">{errors[field]}</p>}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <label htmlFor="contact-message" className="text-sm font-bold text-heading-color">{labels.message} <span className="text-accent-color" aria-hidden="true">*</span><span className="sr-only"> {t.requiredLabel || 'required'}</span></label>
                                <textarea id="contact-message" name="message" rows="6" value={form.message} onChange={handleChange} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'contact-message-error' : undefined} className={`${inputClass} resize-y ${errors.message ? 'border-accent-color ring-2 ring-accent-color/25' : 'border-card-border'}`} placeholder={formCopy.messagePlaceholder || ''} />
                                {errors.message && <p id="contact-message-error" className="mt-1.5 text-xs font-medium text-accent-color">{errors.message}</p>}
                            </div>
                            {status !== 'idle' && <p id="contact-form-status" role={status === 'error' ? 'alert' : 'status'} className={`flex items-center gap-2 text-sm font-medium ${status === 'success' ? 'text-heading-color' : 'text-accent-color'}`}>{status === 'success' ? <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" /> : <AlertCircle className="size-4 shrink-0" aria-hidden="true" />}{statusMessage}</p>}
                            <button type="submit" disabled={status === 'submitting'} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-accent-color bg-accent-color px-5 py-2.5 text-sm font-bold text-body-bg transition-[background-color,color,transform,opacity] hover:-translate-y-px hover:bg-heading-color disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color">
                                {status === 'submitting' ? <LoaderCircle className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
                                {status === 'submitting' ? (t.submittingLabel || 'Sending...') : (formCopy.submitButton || 'Send message')}
                            </button>
                        </form>
                    </motion.div>

                    <motion.div {...entrance} transition={{ ...entrance.transition, delay: shouldReduceMotion ? 0 : 0.12 }} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                            <a href="mailto:adeel@bitwork.tech" className="group flex items-start gap-3 rounded-lg border border-card-border bg-section-alpha p-5 transition-[border-color,transform] hover:-translate-y-1 hover:border-accent-color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color">
                                <Mail className="mt-0.5 size-5 shrink-0 text-accent-color" aria-hidden="true" /><span><span className="block text-sm font-bold text-heading-color">{t.emailLabel || 'Email us'}</span><span className="mt-1 block text-sm text-text-muted">adeel@bitwork.tech</span></span>
                            </a>
                            <a href="https://wa.me/923456789765" target="_blank" rel="noreferrer" className="group flex items-start gap-3 rounded-lg border border-card-border bg-section-alpha p-5 transition-[border-color,transform] hover:-translate-y-1 hover:border-accent-color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color">
                                <MessageCircle className="mt-0.5 size-5 shrink-0 text-accent-color" aria-hidden="true" /><span><span className="block text-sm font-bold text-heading-color">{t.whatsAppLabel || 'WhatsApp'}</span><span className="mt-1 block text-sm text-text-muted">+92 345 6789765</span></span>
                            </a>
                        </div>
                        <div className="overflow-hidden rounded-lg border border-card-border">
                            <div className="flex items-start gap-3 border-b border-card-border p-5"><MapPin className="mt-0.5 size-5 shrink-0 text-accent-color" aria-hidden="true" /><div><h3 className="text-sm font-bold text-heading-color">{t.locationLabel || 'Office location'}</h3><p className="mt-1 text-sm leading-relaxed text-text-muted">381-A, Main Park, Bismillah Housing Scheme Main Park, Lahore</p></div></div>
                            <div className="relative h-72 overflow-hidden">
                                <iframe title={t.mapTitle || 'Bismillah Housing Scheme Main Park, Lahore'} src="https://www.google.com/maps?q=Bismillah%20Housing%20Scheme%20Main%20Park%2C%20Lahore&output=embed" className="block h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

                                <AnimatePresence>
                                    {!isMapRevealed && (
                                        <motion.div
                                            key="map-cover"
                                            initial={{ clipPath: isMapClosing ? 'inset(0 100% 0 0)' : 'inset(0 0 0 0)' }}
                                            animate={{ clipPath: 'inset(0 0 0 0)' }}
                                            exit={{ clipPath: 'inset(0 0 0 100%)', transition: { duration: shouldReduceMotion ? 0 : 0.72, ease: [0.76, 0, 0.24, 1] } }}
                                            onAnimationComplete={() => {
                                                if (isMapClosing) setIsMapClosing(false);
                                            }}
                                            className="absolute inset-0 z-10 grid place-items-center bg-section-alpha p-6"
                                        >
                                            {!isMapClosing && (
                                                <motion.button
                                                    type="button"
                                                    onClick={() => setIsMapRevealed(true)}
                                                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: shouldReduceMotion ? 0 : 0.35, delay: shouldReduceMotion ? 0 : 0.12, ease: [0.22, 1, 0.36, 1] } }}
                                                    whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.03 }}
                                                    whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                                                    className="group inline-flex min-h-14 items-center gap-3 rounded-md border border-header-border bg-body-bg px-5 py-3 text-sm font-bold text-heading-color shadow-[0_12px_28px_-18px_color-mix(in_srgb,var(--heading-color)_60%,transparent)] transition-[border-color,background-color,color,box-shadow] duration-200 hover:border-accent-color hover:bg-accent-color hover:text-body-bg hover:shadow-[0_16px_30px_-16px_color-mix(in_srgb,var(--accent-color)_65%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color"
                                                >
                                                    <Eye className="size-5 text-accent-color transition-colors group-hover:text-body-bg" aria-hidden="true" />
                                                    {t.mapRevealLabel || 'Click to view Map'}
                                                </motion.button>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <AnimatePresence>
                                    {isMapRevealed && (
                                        <motion.button
                                            type="button"
                                            key="map-hide"
                                            initial={{ opacity: 0, scale: 0.85 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.85 }}
                                            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                                            onClick={() => {
                                                setIsMapClosing(true);
                                                setIsMapRevealed(false);
                                            }}
                                            aria-label={t.mapHideLabel || 'Hide Map'}
                                            title={t.mapHideLabel || 'Hide Map'}
                                            className="group absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-header-border bg-section-alpha/95 text-heading-color shadow-[0_8px_18px_-12px_color-mix(in_srgb,var(--heading-color)_70%,transparent)] backdrop-blur-sm transition-[width,background-color,color,border-color] hover:w-24 hover:border-accent-color hover:bg-accent-color hover:text-body-bg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-color"
                                        >
                                            <EyeOff className="size-4 shrink-0" aria-hidden="true" />
                                            <span className="max-w-0 overflow-hidden whitespace-nowrap pl-0 text-xs opacity-0 transition-[max-width,opacity,padding] duration-200 group-hover:max-w-16 group-hover:pl-1.5 group-hover:opacity-100">
                                                {t.mapHideLabel || 'Hide Map'}
                                            </span>
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}