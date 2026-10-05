"use client";

import { FormEvent, useEffect, useState } from "react";
import { enquiryKinds, validateEnquiry, type EnquiryKind, type FieldErrors } from "@/lib/enquiry";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

export function EnquiryForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [notice, setNotice] = useState("");
  const [kind, setKind] = useState<EnquiryKind>("general");

  useEffect(() => {
    function apply(value: string | null) {
      if (enquiryKinds.some((item) => item.id === value)) {
        setKind(value as EnquiryKind);
      }
    }

    function onClick(event: MouseEvent) {
      const link = (event.target as Element | null)?.closest?.("[data-enquiry]");
      if (!link) return;
      apply(link.getAttribute("data-enquiry"));
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const input = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      message: String(data.get("message") ?? ""),
      kind,
      company: String(data.get("company") ?? ""),
    };
    const result = validateEnquiry(input);
    setErrors(result.errors);
    if (Object.keys(result.errors).length > 0) {
      setStatus("error");
      setNotice("Please check the highlighted fields.");
      return;
    }

    setStatus("sending");
    setNotice("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const body = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (response.ok && body.ok) {
        form.reset();
        setKind("general");
        setErrors({});
        setStatus("sent");
        setNotice("Thank you. Your message has been sent. Dermot will reply by email.");
        return;
      }
      setStatus("error");
      setNotice(
        body.error ||
          `The message could not be sent. Please call ${siteConfig.phoneDisplay} or email ${siteConfig.email}.`,
      );
    } catch {
      setStatus("error");
      setNotice(
        `The message could not be sent. Please call ${siteConfig.phoneDisplay} or email ${siteConfig.email}.`,
      );
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="sr-only" aria-hidden="true" inert>
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label htmlFor="kind" className="field-label">
          Enquiry
        </label>
        <select
          id="kind"
          name="kind"
          className="field-input mt-2"
          value={kind}
          onChange={(event) => setKind(event.target.value as EnquiryKind)}
        >
          {enquiryKinds.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <Field
        id="name"
        name="name"
        label="Name"
        autoComplete="name"
        error={errors.name}
      />
      <Field
        id="email"
        name="email"
        label="Email"
        type="email"
        autoComplete="email"
        error={errors.email}
      />
      <Field
        id="phone"
        name="phone"
        label="Phone"
        hint="Optional"
        type="tel"
        autoComplete="tel"
        error={errors.phone}
      />
      <div>
        <label htmlFor="message" className="field-label">
          Message
        </label>
        <p id="message-hint" className="mt-1 text-base text-ink/75">
          A short note is enough for a first step.
        </p>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-hint message-error" : "message-hint"}
          className="field-input mt-2 min-h-36 resize-y"
        />
        {errors.message ? (
          <p id="message-error" className="mt-2 text-base text-forest">
            {errors.message}
          </p>
        ) : null}
      </div>
      <div>
        <button type="submit" className="submit-button" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p
          role="status"
          aria-live="polite"
          className="mt-4 min-h-6 text-lg"
        >
          {notice}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  hint,
  type = "text",
  autoComplete,
  error,
}: {
  id: string;
  name: string;
  label: string;
  hint?: string;
  type?: string;
  autoComplete: string;
  error?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {hint ? <span className="ml-2 font-body text-base normal-case tracking-normal text-ink/70">{hint}</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={type !== "tel"}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="field-input mt-2"
      />
      {error ? (
        <p id={errorId} className="mt-2 text-base text-forest">
          {error}
        </p>
      ) : null}
    </div>
  );
}
