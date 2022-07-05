export function formatTime(fullSeconds: number) {
  const full = Math.abs(fullSeconds);
  const prefix = fullSeconds < 0 ? '-' : '';
  const minutes = Math.floor(full / 60);
  const seconds = Math.floor(full % 60);

  return `${prefix}${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};
