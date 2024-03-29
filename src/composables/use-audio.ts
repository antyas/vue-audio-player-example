import { computed, onMounted, onUnmounted, readonly, Ref, ref } from 'vue';

function error() {
  throw new Error('Сomponent not mounted');
}

export function useAudio(el: Ref<HTMLAudioElement | null>) {
  const isPlaying = ref(true);
  const muted = ref(false);
  const volume = ref(1);
  const duration = ref(0);
  const time = ref(0);
  const speed = ref(1);

  const timeRatio = computed(() => time.value / duration.value);

  function onVolume() {
    volume.value = el.value?.volume ?? 0;
    muted.value = el.value?.muted ?? false;
  }

  function onDuration() {
    duration.value = el.value?.duration || 0;
  }

  function onTime() {
    time.value = el.value?.currentTime || 0;
  }

  function onPlayChange() {
    isPlaying.value = !el.value?.paused;
  }

  onMounted(() => {
    if (!el.value) return;

    el.value.addEventListener('volumechange', onVolume);
    el.value.addEventListener('durationchange', onDuration);
    el.value.addEventListener('timeupdate', onTime);
    el.value.addEventListener('play', onPlayChange);
    el.value.addEventListener('pause', onPlayChange);
  });

  onUnmounted(() => {
    if (!el.value) return;

    el.value.removeEventListener('volumechange', onVolume);
    el.value.removeEventListener('durationchange', onDuration);
    el.value.removeEventListener('timeupdate', onTime);
    el.value.removeEventListener('play', onPlayChange);
    el.value.removeEventListener('pause', onPlayChange);
  });

  function togglePlay() {
    if (!el.value) return error();

    if (isPlaying.value) {
      el.value?.pause();
    } else {
      el.value?.play();
    }
  }

  function toggleMute() {
    if (!el.value) return error();
    el.value.muted = !el.value?.muted ?? false;
  }

  function setTime(value: number) {
    if (!el.value) return error();
    el.value.currentTime = value;
  }

  function setVolume(value: number) {
    if (!el.value) return error();
    el.value.volume = value;
  }

  function setSpeed(value: number) {
    if (!el.value) return error();
    el.value.playbackRate = value;
    speed.value = value;
  }

  return {
    isPlaying: readonly(isPlaying),
    muted: readonly(muted),
    volume: readonly(volume),
    duration: readonly(duration),
    time: readonly(time),
    timeRatio: readonly(timeRatio),
    speed: readonly(speed),
    setTime,
    setVolume,
    setSpeed,
    toggleMute,
    togglePlay,
  };
}
