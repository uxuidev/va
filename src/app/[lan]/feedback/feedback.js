'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ImagePlus, LoaderCircle, Star, UploadCloud, X } from 'lucide-react'
import Image from 'next/image'

const MAX_IMAGE_SIZE = 2 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

const getWordCount = (value) => value.trim() ? value.trim().split(/\s+/).length : 0
const inputClassName = 'w-full rounded-md border border-card-border bg-section-alpha px-3.5 py-3 text-[15px] leading-6 text-text-main outline-none transition-[border-color,box-shadow] placeholder:text-text-muted focus:border-accent-color focus:ring-2 focus:ring-accent-color/20'

function StarRating({ value, onChange, label }) {
    const [hoveredValue, setHoveredValue] = useState(null)
    const activeValue = hoveredValue ?? value

    return (
        <div
            role="radiogroup"
            aria-label={label}
            onMouseLeave={() => setHoveredValue(null)}
            className="flex w-fit items-center gap-1"
        >
            {Array.from({ length: 5 }, (_, index) => {
                const starNumber = index + 1
                const fill = activeValue >= starNumber ? 1 : activeValue === starNumber - 0.5 ? 0.5 : 0

                return (
                    <div key={starNumber} className="relative h-10 w-10">
                        <Star aria-hidden="true" size={40} strokeWidth={1.5} className="absolute inset-0 text-text-muted" />
                        <div className="pointer-events-none absolute inset-0 overflow-hidden text-accent-color" style={{ width: `${fill * 100}%` }}>
                            <Star size={40} strokeWidth={1.8} fill="currentColor" />
                        </div>
                        <button
                            type="button"
                            role="radio"
                            aria-checked={value === starNumber - 0.5}
                            aria-label={`${starNumber - 0.5} stars`}
                            onMouseEnter={() => setHoveredValue(starNumber - 0.5)}
                            onFocus={() => setHoveredValue(starNumber - 0.5)}
                            onClick={() => onChange(starNumber - 0.5)}
                            className="absolute left-0 top-0 h-full w-1/2 cursor-pointer opacity-0 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-color"
                        />
                        <button
                            type="button"
                            role="radio"
                            aria-checked={value === starNumber}
                            aria-label={`${starNumber} stars`}
                            onMouseEnter={() => setHoveredValue(starNumber)}
                            onFocus={() => setHoveredValue(starNumber)}
                            onClick={() => onChange(starNumber)}
                            className="absolute right-0 top-0 h-full w-1/2 cursor-pointer opacity-0 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-color"
                        />
                    </div>
                )
            })}
        </div>
    )
}

function PreviewStars({ rating }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, index) => {
                const starNumber = index + 1
                const fill = rating >= starNumber ? 1 : rating === starNumber - 0.5 ? 0.5 : 0

                return (
                    <span key={starNumber} className="relative block h-4.5 w-4.5">
                        <Star size={18} strokeWidth={1.5} className="absolute inset-0 text-text-muted" />
                        <span className="absolute inset-0 overflow-hidden text-accent-color" style={{ width: `${fill * 100}%` }}>
                            <Star size={18} strokeWidth={1.8} fill="currentColor" />
                        </span>
                    </span>
                )
            })}
        </div>
    )
}

export default function Feedback({ content: t }) {
    const fileInputRef = useRef(null)
    const [rating, setRating] = useState(0)
    const [previewUrl, setPreviewUrl] = useState('')
    const [selectedImageName, setSelectedImageName] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)
    const [dragging, setDragging] = useState(false)
    const [error, setError] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({ fullName: '', company: '', designation: '', comment: '' })

    useEffect(() => () => {
        if (previewUrl) URL.revokeObjectURL(previewUrl)
    }, [previewUrl])

    const clearImage = () => {
        setSelectedImage(null)
        setSelectedImageName('')
        setPreviewUrl((currentUrl) => {
            if (currentUrl) URL.revokeObjectURL(currentUrl)
            return ''
        })
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const updateImage = (file) => {
        if (!file) return
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type) || file.size > MAX_IMAGE_SIZE) {
            setError(t.imageError)
            return
        }

        const nextUrl = URL.createObjectURL(file)
        setPreviewUrl((currentUrl) => {
            if (currentUrl) URL.revokeObjectURL(currentUrl)
            return nextUrl
        })
        setSelectedImageName(file.name)
        setSelectedImage(file)
        setError('')
    }

    const updateField = (event) => {
        const { name, value } = event.target
        const nextValue = name === 'comment' ? value.split(/\s+/).slice(0, 50).join(' ') : value
        setSubmitted(false)
        setError('')
        setFormData((current) => ({ ...current, [name]: nextValue }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (isSubmitting) return

        if (!formData.fullName.trim() || rating === 0) {
            setError(t.requiredError)
            return
        }

        setError('')
        setSubmitted(false)
        setIsSubmitting(true)

        try {
            const payload = new FormData()
            payload.append('fullName', formData.fullName)
            payload.append('company', formData.company)
            payload.append('designation', formData.designation)
            payload.append('comment', formData.comment)
            payload.append('rating', String(rating))
            if (selectedImage) payload.append('image', selectedImage)

            const response = await fetch('/api/email/feedback', { method: 'POST', body: payload })
            const result = await response.json().catch(() => ({}))

            if (!response.ok) throw new Error(result.message || 'Unable to submit your feedback right now.')

            setFormData({ fullName: '', company: '', designation: '', comment: '' })
            setRating(0)
            setSelectedImage(null)
            setSelectedImageName('')
            setPreviewUrl((currentUrl) => {
                if (currentUrl) URL.revokeObjectURL(currentUrl)
                return ''
            })
            if (fileInputRef.current) fileInputRef.current.value = ''
            setSubmitted(result.message || t.success)
        } catch (submissionError) {
            setError(submissionError.message || 'Unable to submit your feedback right now.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const wordCount = getWordCount(formData.comment)
    const title = formData.designation || t.designationPlaceholder
    const name = formData.fullName || t.namePlaceholder
    const organization = formData.company

    return (
        <section className="min-h-screen bg-section-beta text-text-main transition-colors duration-300">
            <div className="mx-auto grid max-w-350 gap-7 px-5 py-20 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(380px,0.92fr)] lg:px-15 lg:py-28">
                <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="self-start">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-color">{t.eyebrow}</p>
                    <h1 className="mb-5 max-w-[11ch] text-4xl font-semibold leading-[1.04] text-heading-color md:text-6xl">{t.title}</h1>
                    <p className="max-w-xl text-base leading-8 text-text-muted">{t.body}</p>

                    <motion.div layout className="mt-10 overflow-hidden rounded-md border border-card-border bg-card-bg p-6 shadow-sm">
                        <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-text-muted">{t.previewLabel}</p>
                        <div className="flex items-start gap-4">
                            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-card-border bg-section-alpha">
                                {previewUrl ? <Image src={previewUrl} alt="" fill unoptimized sizes="56px" className="object-cover" /> : <ImagePlus size={22} className="text-text-muted" />}
                            </div>
                            <div className="min-w-0">
                                <PreviewStars rating={rating} />
                                <blockquote className="mt-4 text-lg leading-7 text-heading-color">
                                    {formData.comment ? t.previewQuote.replace('{comment}', formData.comment) : t.previewEmpty}
                                </blockquote>
                                <p className="mt-5 font-semibold">{name}</p>
                                <p className="text-sm text-text-muted">{title} {organization ? `· ${organization}` : ''}</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.form initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.08 }} onSubmit={handleSubmit} className="grid gap-4.5 rounded-md border border-card-border bg-card-bg p-6 shadow-lg md:p-8">
                    <div>
                        <h2 className="text-2xl font-semibold text-heading-color">{t.formTitle}</h2>
                        <p className="mt-2 text-sm leading-6 text-text-muted">{t.formSubtitle}</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label={t.nameLabel} name="fullName" value={formData.fullName} placeholder={t.namePlaceholder} onChange={updateField} required />
                        <Field label={t.companyLabel} name="company" value={formData.company} placeholder={t.companyPlaceholder} onChange={updateField} />
                    </div>
                    <Field label={t.designationLabel} name="designation" value={formData.designation} placeholder={t.designationPlaceholder} onChange={updateField} />
                    <div className="grid gap-2"><span className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted">{t.ratingLabel} <RequiredMark /></span><StarRating value={rating} onChange={setRating} label={t.ratingLabel} /><span className="text-sm text-text-muted">{rating ? `${rating.toFixed(1)} / 5.0` : t.ratingHint}</span></div>
                    <label className="grid gap-2"><span className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted">{t.commentLabel}</span><textarea name="comment" value={formData.comment} onChange={updateField} placeholder={t.commentPlaceholder} rows={4} className={`${inputClassName} min-h-30 resize-y`} /><span className="text-right text-xs text-text-muted">{t.wordCounter.replace('{count}', wordCount)}</span></label>
                    <div className="grid gap-2"><span className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted">{t.uploadLabel}</span><button type="button" onClick={() => fileInputRef.current?.click()} onDragOver={(event) => { event.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); updateImage(event.dataTransfer.files?.[0]) }} className={`cursor-pointer rounded-md border-2 border-dashed p-5 text-center transition-colors ${dragging || selectedImageName ? 'border-accent-color bg-section-beta' : 'border-card-border bg-section-alpha hover:border-accent-color'}`}><input ref={fileInputRef} className="hidden" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => updateImage(event.target.files?.[0])} /><UploadCloud className="mx-auto mb-2 text-accent-color" size={24} /><p className="font-medium text-heading-color">{selectedImageName || t.uploadTitle}</p><p className="mt-1 text-xs text-text-muted">{selectedImageName ? t.uploadSelected : t.uploadBody}</p></button>{selectedImageName ? <button type="button" onClick={clearImage} className="inline-flex w-fit items-center gap-1 text-xs font-semibold text-text-muted transition-colors hover:text-accent-color"><X size={14} aria-hidden="true" />{t.removeImage}</button> : null}</div>
                    <AnimatePresence>{error ? <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} role="alert" className="rounded-md border border-accent-color bg-section-beta px-3 py-2 text-sm text-heading-color">{error}</motion.p> : null}{submitted ? <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} role="status" className="rounded-md border border-accent-color bg-section-beta px-3 py-2 text-sm text-heading-color">{submitted}</motion.p> : null}</AnimatePresence>
                    <motion.button whileHover={isSubmitting ? undefined : { y: -1 }} whileTap={isSubmitting ? undefined : { scale: 0.99 }} type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent-color px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-body-bg transition-colors hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting ? <LoaderCircle size={16} className="animate-spin" /> : <Star size={16} fill="currentColor" />}{isSubmitting ? t.sending : t.submit}</motion.button>
                </motion.form>
            </div>
        </section>
    )
}

function RequiredMark() {
    return <span aria-hidden="true" className="text-accent-color"> *</span>
}

function Field({ label, name, value, placeholder, onChange, required = false }) {
    return <label className="grid gap-2"><span className="text-xs font-bold uppercase tracking-[0.14em] text-text-muted">{label}{required ? <RequiredMark /> : null}</span><input name={name} value={value} placeholder={placeholder} onChange={onChange} required={required} aria-required={required} className={inputClassName} /></label>
}