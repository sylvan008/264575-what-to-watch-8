const formatter = new Intl.DateTimeFormat('en-En', {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
});

function dateFormat(date: Date) {
  return formatter.format(date);
}

export {
  dateFormat
};
