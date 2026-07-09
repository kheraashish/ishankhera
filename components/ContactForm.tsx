'use client'

import { useState } from 'react'
import { projectTypes } from '@/lib/site'

type Status = 'idle' | 'submitting' | 'success' | 'error'

// Web3Forms calls this a public key, like a form id, and it ships in the client bundle
// by design. Rotate it from the dashboard if the form starts attracting spam.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
const ENDPOINT = 'https://api.web3forms.com/submit'

const field =
  'mt-2 w-full border border-ink/25 bg-paper px-4 py-3 text-ink placeholder:text-ink/40 transition-colors focus:border-accent focus:outline-none disabled:cursor-not-allowed disabled:bg-mist disabled:opacity-70'
const label = 'block text-sm font-medium text-ink'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [types, setTypes] = useState<string[]>([])
  const [typeError, setTypeError] = useState(false)

  function toggleType(value: string) {
    setTypes((prev) => {
      const next = prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
      if (next.length) setTypeError(false)
      return next
    })
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!types.length) {
      setTypeError(true)
      return
    }

    const form = event.currentTarget
    const data = new FormData(form)
    data.set('access_key', WEB3FORMS_KEY as string)
    data.set('Music for', types.join(', '))
    data.set('subject', `New enquiry from ${data.get('Name') || 'ishankhera.com'}`)
    data.set('from_name', 'ishankhera.com')

    setStatus('submitting')
    setError(null)

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })

      // Web3Forms answers 200 with { success: false } on a rejected submission,
      // so res.ok alone is not proof of delivery.
      const body = await res.json().catch(() => null)
      if (!res.ok || !body?.success) {
        throw new Error(body?.message ?? 'That did not send. Please try again.')
      }

      setStatus('success')
      form.reset()
      setTypes([])
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'That did not send. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-ink/15 bg-mist p-8">
        <p className="text-xl font-medium text-ink">Thank you. Your message is on its way.</p>
        <p className="mt-3 leading-relaxed text-ink/70">
          Ishan reads every enquiry personally and will reply to the address you gave.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 rounded-full border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink/50"
        >
          Send another
        </button>
      </div>
    )
  }

  // Without an endpoint the form still renders, so the layout is reviewable, but every
  // control is inert. Never take an enquiry that has nowhere to go.
  const configured = Boolean(WEB3FORMS_KEY)
  const busy = status === 'submitting' || !configured

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      {!configured && (
        <div className="border border-accent/30 bg-accent/5 p-6">
          <p className="font-medium text-ink">The form is not connected yet.</p>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            Set <code className="bg-mist px-1.5 py-0.5">NEXT_PUBLIC_WEB3FORMS_KEY</code> to
            switch it on. Until then every control is disabled, so no enquiry is silently
            dropped.
          </p>
        </div>
      )}

      {/* Web3Forms' honeypot. A bot fills every field it finds; a human never sees this. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label htmlFor="name" className={label}>
          Name
        </label>
        <input id="name" name="Name" type="text" required disabled={busy} className={field} />
      </div>

      <div>
        <label htmlFor="email" className={label}>
          Email
        </label>
        <input id="email" name="Email" type="email" required disabled={busy} className={field} />
      </div>

      <div>
        <label htmlFor="budget" className={label}>
          Budget
        </label>
        <input id="budget" name="Budget" type="text" required disabled={busy} className={field} />
        <p className="mt-2 text-sm text-ink/55">A range is fine. It sets the scope of the work.</p>
      </div>

      <fieldset aria-describedby={typeError ? 'types-error' : undefined}>
        <legend className={label}>Music for</legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {projectTypes.map((type) => (
            <label key={type} className="flex cursor-pointer items-center gap-3 text-[15px] text-ink">
              <input
                type="checkbox"
                checked={types.includes(type)}
                onChange={() => toggleType(type)}
                disabled={busy}
                className="h-4 w-4 accent-[var(--color-accent)]"
              />
              {type}
            </label>
          ))}
        </div>
        {typeError && (
          <p id="types-error" className="mt-3 text-sm font-medium text-accent">
            Please choose at least one.
          </p>
        )}
      </fieldset>

      {status === 'error' && error && (
        <p role="alert" className="border-l-2 border-accent pl-4 text-sm font-medium text-accent">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full rounded-full bg-accent px-6 py-4 text-sm font-semibold text-paper transition-colors hover:bg-accent-deep active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-12"
      >
        {status === 'submitting' ? 'Sending...' : 'Submit'}
      </button>
    </form>
  )
}
