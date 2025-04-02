<script setup>
import { Meal } from '@/models/Meal.js';

defineProps({
  food: { type: Meal, required: true }
})
</script>


<template>
  <div class="card">
    <div>
      <img :src="`${food.medImageURL}`" :alt="`A picture of ${food.name}`">
    </div>
    <div>
      <p class="mb-0">{{ food.name }}</p>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>