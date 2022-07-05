<template>
  <div class="app-url-field">
    <input
      v-model="url"
      data-testid="url-input"
      class="app-url-field__input"
      type="text"
      placeholder="Audio url"
      @keyup.enter="emit('update:url', url)"
    >

    <button
      data-testid="url-button"
      class="app-url-field__button"
      @click="emit('update:url', url)"
    >
      Listen
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Emits {
  (e: 'update:url', value: string): void,
}

const emit = defineEmits<Emits>();
const url = ref('');
</script>

<style lang="scss">
@import '@/styles/common.scss';

@mixin field-element() {
  border: 2px solid $secondary;
  border-radius: 4px;
  padding: 8px;
}

.app-url-field {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  grid-gap: 8px;
  margin-bottom: 8px;

  &__input {
    @include field-element;
    @include text;
    @include activated;

    caret-color: $primary;
  }

  &__button {
    @include text;
    @include field-element;
    @include activated;

    background: transparent;
    cursor: pointer;
  }
}
</style>
