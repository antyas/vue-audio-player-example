<template>
  <div class="app-player">
    <div class="app-player__main">
      <audio
        ref="audioEl"
        data-testid="audio"
        class="app-player__audio"
        :src="url"
      />

      <button
        class="app-player__start"
        data-testid="start-btn"
        @click="audio.togglePlay()"
      >
        <pause-icon v-show="audio.isPlaying.value" />
        <play-icon v-show="!audio.isPlaying.value" />
      </button>

      <app-slider :ratio="audio.timeRatio.value" @update:ratio="updateTime" />

      <span class="app-player__time">{{ timeText }} / {{ durationText }}</span>
    </div>

    <div class="app-player__speeds">
      <button
        v-for="speed in speeds"
        :key="speed"
        :data-active="audio.speed.value === speed || null"
        :data-testid="`speed-btn-${speed}`"
        class="app-player__speed"
        @click="audio.setSpeed(speed)"
      >
        {{speed}}x
      </button>
    </div>

    <div class="app-player__volume">
      <button
        class="app-player__mute"
        data-testid="mute-btn"
        @click="audio.toggleMute()"
      >
        <volume-off-icon v-show="audio.muted.value" />
        <volume-on-icon v-show="!audio.muted.value"  />
      </button>

      <app-slider :ratio="audio.volume.value" @update:ratio="audio.setVolume" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import PlayIcon from '@/icons/play.svg';
import PauseIcon from '@/icons/pause.svg';
import VolumeOnIcon from '@/icons/volume-on.svg';
import VolumeOffIcon from '@/icons/volume-off.svg';
import AppSlider from './AppSlider.vue';
import { useAudio } from '@/composables/use-audio';
import { formatTime } from '@/lib/time';

defineProps<{url: string}>();

const speeds = [0.5, 1, 1.5, 2];

const audioEl = ref<HTMLAudioElement | null>(null);
const audio = useAudio(audioEl);

const durationText = computed(() => formatTime(audio.duration.value));
const timeText = computed(() => formatTime(audio.time.value));

function updateTime(ratio: number) {
  audio.setTime(ratio * audio.duration.value);
}
</script>

<style lang="scss">
@import '@/styles/common.scss';

.app-player {
  border: 2px solid $secondary;
  border-radius: 4px;
  height: 52px;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto auto;

  &__loading {
    @include text;
  }

  &__start {
    @include icon-button;
  }

  &__mute {
    @include icon-button;
    padding: 8px;
  }

  &__time {
    @include text;
  }

  &__main {
    height: 100%;
    padding: 8px;
    display: grid;
    grid-gap: 16px;
    align-items: center;
    grid-template-columns: auto 1fr auto;
  }

  &__speeds {
    border-left: 2px solid $secondary;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 8px;
  }

  &__speed {
    height: 100%;
    padding: 8px;
    border: none;
    background: transparent;
    cursor: pointer;

    @include text;
    @include activated;

    &[data-active] {
      color: $primary;
    }

  }

  &__volume {
    width: 200px;
    height: 100%;
    border-left: 2px solid $secondary;
    padding: 8px 16px 8px 8px;
    display: grid;
    align-items: center;
    grid-gap: 16px;
    grid-template-columns: auto 1fr;
  }
}
</style>
