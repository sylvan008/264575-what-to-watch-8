const HOUR = 60;

function humanizeRuntime(duration: number): string {
  const hours = Math.floor(duration / HOUR);
  const minutes = duration % HOUR;
  return `${hours}h ${minutes}m`;
}

/**
 * Объединяет названия CSS классов в одну строку
 */
function classNames(className: string, ...rest: string[]): string {
  if (rest.length) {
    return [className, ...rest].join(' ').trim();
  }
  return className;
}

/**
 * Проверяет email на валидность
 */
function validateEmail(email: string): boolean {
  if (!email.length) {
    return false;
  }
  const emailTest = /.+?@.+?\..+/;
  if (!emailTest.test(email)) {
    return false;
  }
  return true;
}

/**
 * Проверяет пароль на валидность
 */
function validatePassword(password: string): boolean {
  if (password.length < 2) {
    return false;
  }

  const passwordLetterTest = /[a-z]+?/i;
  if (!passwordLetterTest.test(password)) {
    return false;
  }

  const passwordDigitTest = /\d+?/;
  if (!passwordDigitTest.test(password)) {
    return false;
  }

  return true;
}

export {
  classNames,
  humanizeRuntime,
  validateEmail,
  validatePassword
};
