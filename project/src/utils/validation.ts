import {MAX_MESSAGE_LENGTH, MIN_MESSAGE_LENGTH} from './const';

/**
 * Проверяет email на валидность
 */
function validateEmail(email: string): boolean {
  if (!email.length) {
    return false;
  }
  const emailTest = /.+?@.+?\..+/;

  return emailTest.test(email);
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

/**
 * Проверяет длину строки, чтобы оно было в пределах установленного диапазона
 */
function validateTextLength(text: string, min = MIN_MESSAGE_LENGTH, max = MAX_MESSAGE_LENGTH): boolean {
  return text.length > min && text.length <= max;
}

export {
  validateEmail,
  validatePassword,
  validateTextLength
};
