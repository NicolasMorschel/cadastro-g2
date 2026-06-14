export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone) {
  const trimmed = phone.trim();

  if (!trimmed) {
    return true;
  }

  const onlyNumbers = trimmed.replace(/\D/g, '');

  return /^[0-9()+\-\s]+$/.test(trimmed)
    && onlyNumbers.length >= 10
    && onlyNumbers.length <= 13;
}

export function isSafeWebAddress(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return true;
  }

  try {
    const url = new URL(trimmed);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}
