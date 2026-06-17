export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidName(name) {
  const trimmed = name.trim();

  return trimmed.length >= 2 && !/[<>]/.test(trimmed);
}

export function hasNoHtmlTags(value) {
  return !/[<>]/.test(value);
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

export function filterPhoneInput(phone) {
  const numbers = phone.replace(/\D/g, '').slice(0, 11);

  if (!numbers) {
    return '';
  }

  if (numbers.length < 3) {
    return `(${numbers}`;
  }

  const areaCode = numbers.slice(0, 2);
  const phoneNumber = numbers.slice(2);
  const firstPartLength = numbers.length > 10 ? 5 : 4;
  const firstPart = phoneNumber.slice(0, firstPartLength);
  const secondPart = phoneNumber.slice(firstPartLength);

  if (secondPart) {
    return `(${areaCode}) ${firstPart}-${secondPart}`;
  }

  return `(${areaCode}) ${firstPart}`;
}

export function isSafeWebAddress(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return true;
  }

  if (/[\s<>"']/.test(trimmed)) {
    return false;
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
