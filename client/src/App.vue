<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';
import ProjectUFooter from './components/ProjectUFooter.vue';

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView />
  </main>
  <footer class=" text-center">
    <ProjectUFooter />
  </footer>
</template>

<style lang="scss"></style>
