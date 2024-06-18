<script lang="ts">
import { defineComponent } from 'vue'
import NoteManager from './components/NoteManager.vue'

export default defineComponent({
  name: 'App',
  components: {
        NoteManager
  }
})
</script>

<template>
  <div class="min-h-screen flex py-12 flex-col items-center w-screen bg-stone-950 text-white">
    <!--img alt="Vue logo" src="./assets/logo.png"-->
    <NoteManager />
  </div>
</template>
