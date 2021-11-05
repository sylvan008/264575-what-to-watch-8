const HOUR = 60;

/**
 * Делает время продолжительности фильма, удобочитаемым для людей
 */
function humanizeRuntime(duration: number): string {
  const hours = Math.floor(duration / HOUR);
  const minutes = duration % HOUR;
  return `${hours}h ${minutes}m`;
}

/**
 * Формирует текстовое представление оценки
 */
function humanizedRating(rating: number): string {
  switch (Math.floor(rating)) {
    case 0:
    case 1:
    case 2:
      return 'Bad';
    case 3:
    case 4:
      return 'Normal';
    case 5:
    case 6:
    case 7:
      return 'Good';
    case 8:
    case 9:
      return 'Very good';
    case 10:
      return 'Awesome';
    default:
      return 'Normal';
  }
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

export {
  classNames,
  humanizeRuntime,
  humanizedRating
};
