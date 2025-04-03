<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { daysService } from '@/services/DaysService.js';

const account = computed(() => AppState.account)

onMounted(() => {
  getOrCreateCurrentDay()
})

async function getOrCreateCurrentDay() {
  try {
    await daysService.getOrCreateCurrentDay()
  }
  catch (error) {
    Pop.error(error, 'Could not get days for this account');
    logger.error('Could not get days for this account'.toUpperCase(), error);
  }
}
</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
