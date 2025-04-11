<script setup>
import { computed, ref, watch } from 'vue';
import { loadState, saveState } from '../utils/Store.js';
import Login from './Login.vue';
import { AuthService } from '@/services/AuthService.js';
import { AppState } from '@/AppState.js';

const theme = ref(loadState('theme') || 'light')
const account = computed(() => AppState.account)

function toggleTheme() {
  theme.value = theme.value == 'light' ? 'dark' : 'light'
}

watch(theme, () => {
  document.documentElement.setAttribute('data-bs-theme', theme.value)
  saveState('theme', theme.value)
}, { immediate: true })

function logout() {
  AuthService.logout()
}


</script>

<template>
  <nav class="navbar navbar-expand-md bg-white border-bottom border-primary border-3 shadow-lg">
    <div class="container-fluid gap-2">
      <RouterLink :to="{ name: 'Home' }" class="d-flex align-items-center  text-light">
        <span class="mdi mdi-arm-flex text-primary text-shadow display-4"></span>
        <b class="fs-2 text-primary fw-bold">Project U</b>
      </RouterLink>
      <!-- collapse button -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-links"
        aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="mdi mdi-menu text-dark"></span>
      </button>
      <!-- collapsing menu -->
      <div class="collapse navbar-collapse d-md-flex align-items-start align-items-md-center justify-content-md-between"
        id="navbar-links">
        <ul class="navbar-nav">
          <li>
            <RouterLink :to="{ name: 'About' }" class="btn text-primary fw-bold selectable">
              About
            </RouterLink>
          </li>
          <li v-if="account">
            <RouterLink :to="{ name: 'Account' }" class="btn text-primary fw-bold selectable">
              Meal Tracking
            </RouterLink>
          </li>
          <li v-if="account">
            <RouterLink :to="{ name: 'AccountSettings' }" class="btn text-primary fw-bold selectable">
              Account Settings
            </RouterLink>
          </li>
        </ul>
        <!-- LOGIN COMPONENT HERE -->
        <!-- <div class="ms-auto">
          <button class="btn text-light" @click="toggleTheme"
          :title="`Enable ${theme == 'light' ? 'dark' : 'light'} theme.`">
          <i v-if="theme == 'dark'" class="mdi mdi-weather-sunny"></i>
          <i v-if="theme == 'light'" class="mdi mdi-weather-night"></i>
        </button>
      </div> -->
        <div v-if="account" class="d-flex gap-2 align-items-center">
          <p class="text-danger rounded list-group-item dropdown-item list-group-item-action selectable py-1 px-3 mb-0"
            @click="logout">
            <i class="mdi mdi-logout"></i>
            Logout
          </p>
          <Login />
        </div>
        <div v-else>
          <Login />
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
a {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-primary);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
