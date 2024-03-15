<template>
  <q-layout>
    <q-header> ... </q-header>
    <q-drawer> ... </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer> ... </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
