import "server-only";

type EnquiryMail = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export function getEnquiryMailConfig() {
  const apiKey = process.env.RESEND_API_KEY?.trim() || "";
  const from = process.env.FROM_EMAIL?.trim() || "";
  const to = process.env.CONTACT_TO?.trim() || "";

  return {
    configured: Boolean(apiKey && from && to),
    apiKey,
    from,
    to,
  };
}

export async function sendEnquiryEmail(input: EnquiryMail) {
  const config = getEnquiryMailConfig();
  if (!config.configured) {
    console.info("Enquiry not sent: email provider is not configured");
    return { ok: false as const, reason: "not_configured" as const };
  }

  const subjectName = input.name.replace(/[\r\n]+/g, " ").slice(0, 80);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: input.email,
      subject: `Website enquiry from ${subjectName}`,
      text: [
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        `Phone: ${input.phone || "Not given"}`,
        "",
        input.message,
        "",
        "Sent from the Dermot Cox Counselling website enquiry form.",
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error(`Enquiry email failed: provider status ${response.status}`);
    return { ok: false as const, reason: "provider" as const };
  }

  console.info("Enquiry email accepted by provider");
  return { ok: true as const };
}
