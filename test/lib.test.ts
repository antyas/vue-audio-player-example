import { formatTime } from '../src/lib/time';
import { expect, test } from 'vitest';

test('lib/time/formatTime', async () => {
  expect(formatTime(1)).toBe('0:01');
  expect(formatTime(12)).toBe('0:12');
  expect(formatTime(1213)).toBe('20:13');
  expect(formatTime(-1)).toBe('-0:01');
  expect(formatTime(-59)).toBe('-0:59');
  expect(formatTime(-195)).toBe('-3:15');
});
