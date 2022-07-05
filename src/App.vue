
<template>
  <div class="app">
    <app-url-field />
    <app-player :url="url" />
  </div>
</template>

<script setup lang="ts">
import AppPlayer from '@/components/AppPlayer.vue';
import AppUrlField from './components/AppUrlField.vue';

const url = 'https://ru.drivemusic.me/dl/NSacDaI3qo4bp5su1zBpNg/1656987586/download_music/2021/01/rammstein-auslander.mp3';
</script>

<style lang="scss">
@import '@/styles/common.scss';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  display: grid;
  justify-items: center;
  align-items: center;
}

.app {
  width: 1000px;
  padding: 32px;
}

svg {
  width: 100%;
  height: 100%;
  fill: $secondary;
}

button:hover svg, button:focus svg {
  fill: $primary;
}
</style>
