export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidName(name) {
  const trimmed = name.trim();

  return trimmed.length >= 2 && !/[<>]/.test(trimmed);
}

export function isValidPhone(phone) {
  const trimmed = phone.trim();

  if (!trimmed) {
    return true;
  }

  const onlyNumbers = trimmed.replace(/\D/g, '');

  return /^[0-9()+\-\s]+$/.test(trimmed)
    && (onlyNumbers.length === 10 || onlyNumbers.length === 11);
}

export function isSafeWebAddress(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return true;
  }

  try {
    const url = new URL(trimmed);
    const hasSafeProtocol = url.protocol === 'http:' || url.protocol === 'https:';
    const hasValidHost = url.hostname.includes('.') && !url.hostname.includes(' ');

    return hasSafeProtocol && hasValidHost;
  } catch {
    return false;
  }
}
