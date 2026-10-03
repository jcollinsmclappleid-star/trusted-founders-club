export type EnquiryInput = {
  name: string;
  email: string;
  phone: string;
  message: string;
  company: string;
};

export type FieldName = "name" | "email" | "phone" | "message";
export type FieldErrors = Partial<Record<FieldName, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+()\d][\d\s()+-]{6,19}$/;

export function validateEnquiry(input: EnquiryInput) {
  const errors: FieldErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const message = input.message.trim();

  if (name.length < 2 || name.length > 80) {
    errors.name = "Please add your name.";
  }

  if (!emailPattern.test(email) || email.length > 120) {
    errors.email = "Please add an email address Dermot can reply to.";
  }

  if (phone && !phonePattern.test(phone)) {
    errors.phone = "Please check the phone number, or leave it blank.";
  }

  if (message.length < 8 || message.length > 1000) {
    errors.message = "A short note is enough for a first step.";
  }

  return {
    errors,
    honeypot: input.company.trim().length > 0,
    clean: { name, email, phone, message },
  };
}
