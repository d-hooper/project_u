<script setup>
import { mealsService } from '@/services/MealsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted, ref } from 'vue';

const editableSearchData = ref('')

// onMounted(() => {
// })

async function getFoodItemsByQuery() {
  try {
    const searchQuery = editableSearchData.value
    await mealsService.getFoodItemsByQuery(searchQuery)
  }
  catch (error) {
    Pop.error(error, 'Could not get food item(s) by search query');
    logger.error('Could not get food item(s) by search query'.toUpperCase(), error)
  }
}

</script>

<template>
  <form @submit.prevent="getFoodItemsByQuery()">
    <div class="form-floating mb-3">
      <input v-model="editableSearchData" type="text" class="form-control" id="floatingInput"
             placeholder="name@example.com">
      <label for="floatingInput">Search for food</label>
    </div>

  </form>
</template>

<style scoped lang="scss"></style>
