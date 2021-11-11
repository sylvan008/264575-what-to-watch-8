import {validateEmail, validatePassword, validateTextLength} from './validation';

describe('Function: validateEmail', () => {
  it('should return "true"', () => {
    const email = 'test@mail.ru';
    expect(validateEmail(email)).toBe(true);
  });

  it('should return "false"', () => {
    const emailWithoutName = '@mail.ru';
    expect(validateEmail(emailWithoutName)).toBe(false);

    const emailWithoutServiceName = 'testmail.ru';
    expect(validateEmail(emailWithoutServiceName)).toBe(false);

    const emailWithoutZone = 'test@mailru';
    expect(validateEmail(emailWithoutZone)).toBe(false);
  });
});

describe('Function: validatePassword', () => {
  it('should return "true"', () => {
    const password = 'w1';
    expect(validatePassword(password)).toBe(true);
  });

  it('should return "false"', () => {
    const shortPassword = 'w';
    expect(validatePassword(shortPassword)).toBe(false);

    const passwordWithoutDigit = 'wasd';
    expect(validatePassword(passwordWithoutDigit)).toBe(false);

    const passwordWithoutLetter = '123';
    expect(validatePassword(passwordWithoutLetter)).toBe(false);
  });
});

describe('Function: validateTextLength', () => {
  const min = 3;
  const max = 5;
  let text = 'abcd';

  it ('should return "true" when message\'s length ', () => {
    expect(validateTextLength(text, min, max)).toBe(true);
    // Меняем местами min и max
    expect(validateTextLength(text, max, min)).toBe(true);
    // Включительно минимальной границы
    text = 'abc';
    expect(validateTextLength(text, min, max)).toBe(true);
    // Включительно максимальной границы
    text = 'abcde';
    expect(validateTextLength(text, min, max)).toBe(true);
  });

  it('should return "false" when message\'s length is short or tall', () => {
    // Текст слишком короткий
    text = 'ab';
    expect(validateTextLength(text, min, max)).toBe(false);
    // Текст слишком длинный
    text = 'abcdefg';
    expect(validateTextLength(text, min, max)).toBe(false);
  });
});
