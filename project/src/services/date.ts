const formatter = new Intl.DateTimeFormat('en-En', {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
});

/**
 * Возвращает строковое представление даты с учётом установленной locale
 */
export const dateFormat = (date: Date): string => formatter.format(date);
