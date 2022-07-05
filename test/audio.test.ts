/* eslint-disable camelcase */
import { render, fireEvent } from '@testing-library/vue';
import { expect, test } from 'vitest';
import Player from '../src/components/AppPlayer.vue';

const url = 'https://ru.drivemusic.me/dl/NSacDaI3qo4bp5su1zBpNg/1656987586/download_music/2021/01/rammstein-auslander.mp3';

test('AppPlayer: mute', async () => {
  expect(Player).toBeTruthy();

  const mounted = render(Player, {
    props: { url },
  });

  const audio = mounted.getByTestId('audio') as HTMLAudioElement;
  const muteBtn = mounted.getByTestId('mute-btn');

  expect(audio.muted).toBe(false);
  await fireEvent.click(muteBtn);
  expect(audio.muted).toBe(true);
  await fireEvent.click(muteBtn);
  expect(audio.muted).toBe(false);
});

test('AppPlayer: speed', async () => {
  expect(Player).toBeTruthy();

  const mounted = render(Player, {
    props: { url },
  });

  const audio = mounted.getByTestId('audio') as HTMLAudioElement;
  const speed_0_5 = mounted.getByTestId('speed-btn-0.5');
  const speed_1 = mounted.getByTestId('speed-btn-1');
  const speed_1_5 = mounted.getByTestId('speed-btn-1.5');
  const speed_2 = mounted.getByTestId('speed-btn-2');

  expect(audio.playbackRate).toBe(1);

  await fireEvent.click(speed_0_5);
  expect(audio.playbackRate).toBe(0.5);
  await fireEvent.click(speed_1);
  expect(audio.playbackRate).toBe(1);
  await fireEvent.click(speed_1_5);
  expect(audio.playbackRate).toBe(1.5);
  await fireEvent.click(speed_2);
  expect(audio.playbackRate).toBe(2);
});
