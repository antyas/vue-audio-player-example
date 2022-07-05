<template>
  <div class="app-slider" @click="onClick">
    <div ref="sliderEmptyEl" class="app-slider__empty" />

    <div
      ref="sliderDotEl"
      class="app-slider__dot"
      :style="sliderDotStyle"
    />

    <div
      ref="sliderFilledEl"
      class="app-slider__filled"
      :style="sliderFilledStyle"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  ratio: number;
}

interface Emits {
  (e: 'update:ratio', value: number): void,
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const sliderEmptyEl = ref<HTMLDivElement | null>(null);
const sliderDotEl = ref<HTMLDivElement | null>(null);
const sliderFilledEl = ref<HTMLDivElement | null>(null);

const sliderDotStyle = computed(() => ({
  left: props.ratio * (sliderEmptyEl.value?.clientWidth ?? 0) + 'px',
}));

const sliderFilledStyle = computed(() => ({
  width: props.ratio * (sliderEmptyEl.value?.clientWidth ?? 0) + 'px',
}));

function onClick(event: MouseEvent) {
  if (!sliderDotEl.value || !sliderEmptyEl.value) return;

  const delta = Math.abs(event.offsetX - sliderDotEl.value?.offsetLeft);
  if (delta < 8) return;

  const ratio = event.offsetX / sliderEmptyEl.value.clientWidth;
  emit('update:ratio', ratio);
}
</script>

<style lang="scss">
@import '@/styles/common.scss';

.app-slider {
  position: relative;
  height: 32px;
  width: 100%;
  cursor: pointer;

  &__empty {
    height: 2px;
    width: 100%;
    position: absolute;
    top: 15px;
    left: 0;
    background: $secondary;
  }

  &__dot {
    height: 16px;
    width: 16px;
    border-radius: 8px;
    position: absolute;
    background: $primary;
    top: 8px;
    pointer-events: none;
    transform: translateX(-8px);
  }

  &__filled {
    height: 2px;
    background: $primary;
    position: absolute;
    top: 15px;
    left: 0;
  }
}
</style>
