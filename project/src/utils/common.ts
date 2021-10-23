const HOUR = 60;

function humanizeRuntime(duration: number): string {
  const hours = Math.floor(duration / HOUR);
  const minutes = duration % HOUR;
  return `${hours}h ${minutes}m`;
}

export {
  humanizeRuntime
};
