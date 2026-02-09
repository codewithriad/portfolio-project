export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Anti-spam field
}

export interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
  honeypot?: string;
}

export const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Requires country code (e.g., +880...) and accepts spaces/dashes
  // Regex: Starts with +, followed by 6-20 characters (digits, spaces, dashes, dots)
  const re = /^\+[0-9\s\-\.]{6,20}$/;
  return re.test(phone);
};

export const validateForm = (data: ContactFormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!validateEmail(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (data.phone.trim() && !validatePhone(data.phone)) {
    errors.phone = "Please enter a valid phone number";
  }

  // Subject is optional in some designs, but let's make it required if the prompt implies it's a key field
  if (!data.subject.trim()) {
    errors.subject = "Subject is required";
  }

  if (!data.message.trim()) {
    errors.message = "Message is required";
  }

  // Honeypot check: If this is filled, it's likely a bot.
  // We don't return an error to the UI, but the API will handle it.
  if (data.honeypot) {
    errors.honeypot = "Bot detected";
  }

  return errors;
};
