<script setup>
import { Meal } from '@/models/Meal.js';

defineProps({
  food: { type: Meal, required: true }
})
</script>


<template>
  <div class="card mb-3 d-flex flex-column align-items-center">
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