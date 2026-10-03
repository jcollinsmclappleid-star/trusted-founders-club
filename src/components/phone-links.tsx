import { siteConfig } from "@/lib/site";

export function PhoneLinks({ phoneClassName }: { phoneClassName?: string }) {
  return (
    <span className="phone-line">
      <a className={phoneClassName} href={siteConfig.phoneHref}>
        {siteConfig.phoneDisplay}
      </a>
      <a
        className={`whatsapp-link ${phoneClassName ?? ""}`.trim()}
        href={siteConfig.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.39-1.41a10 10 0 0 0 4.65 1.18h.01c5.46 0 9.89-4.4 9.89-9.83C21.94 6.41 17.5 2 12.04 2Zm5.76 14.15c-.24.68-1.4 1.3-1.94 1.38-.5.08-1.12.1-1.81-.11-.42-.13-.95-.31-1.64-.61-2.88-1.25-4.76-4.14-4.9-4.33-.15-.19-1.17-1.55-1.17-2.95 0-1.4.74-2.09 1-2.37.24-.27.64-.4 1.02-.4h.33c.26 0 .39.02.56.43.2.48.68 1.66.74 1.78.06.12.1.27.02.43-.08.17-.12.27-.24.41-.12.14-.25.32-.36.43-.12.12-.24.25-.1.48.14.23.62 1.02 1.33 1.65.92.82 1.69 1.07 1.93 1.19.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.18 1.26Z"
          />
        </svg>
        WhatsApp
      </a>
    </span>
  );
}
