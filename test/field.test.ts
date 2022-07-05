import { render, fireEvent } from '@testing-library/vue';
import { expect, test } from 'vitest';
import Field from '../src/components/AppUrlField.vue';

const url = 'https://ru.drivemusic.me/dl/NSacDaI3qo4bp5su1zBpNg/1656987586/download_music/2021/01/rammstein-auslander.mp3';

test('AppUrlField: input url', async () => {
  expect(Field).toBeTruthy();

  const mounted = render(Field);

  const input = mounted.getByTestId('url-input');
  await fireEvent.update(input, url);

  const button = mounted.getByTestId('url-button');
  await fireEvent.click(button);

  const emits = mounted.emitted();
  expect(emits).toHaveProperty('update:url');
  expect((emits['update:url'][0] as string[])[0] as string).toBe(url);
});
