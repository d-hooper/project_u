<script setup>
import { Meal } from '@/models/Meal.js';
import { mealsService } from '@/services/MealsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import NutritionInfoModal from './NutritionInfoModal.vue';
import { computed } from 'vue';
import { AppState } from '@/AppState.js';

const activeFood = computed(() => AppState.activeFood)

defineProps({
  food: { type: Meal, required: true }
})

async function getDetailsById(id, unit) {
  try {
    await mealsService.getDetailsById(id, unit)
  }
  catch (error) {
    Pop.error(error, 'Could not get food details')
    logger.error('COULD NOT GET FOOD DETAILS', error)
  }
}
</script>


<template>
  <div @click="getDetailsById(food.id, food.unit)" class="card mb-3 d-flex flex-column align-items-center"
    data-bs-toggle="modal" data-bs-target="#NutritionInfoModal" type="button">
    <div>
      <img :src="`${food.medImageURL}`" :alt="`A picture of ${food.name}`" class="food-search-img" role="button">
    </div>
    <div>
      <p class="mb-0 text-capitalize">{{ food.name }}</p>
    </div>

  </div>
</template>


<style lang="scss" scoped>
.food-search-img {
  height: 25dvh;
  aspect-ratio: 1/1;
  object-position: center;
  object-fit: contain;
}
</style>