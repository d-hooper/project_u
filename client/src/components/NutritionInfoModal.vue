<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';


const food = computed(() => AppState.activeFood)



</script>


<template>
  <!-- inert? -->
  <div class="modal fade" id="NutritionInfoModal" tabindex="-1" aria-labelledby="NutritionInfoModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div v-if="food" class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-capitalize" id="NutritionInfoModalLabel">{{ food.name }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="text-center">
            <img :src="`${food.imageBaseUrl}` + '_250x250/' + `${food.image}`" alt="">
          </div>
          <div class="fs-4">
            <p>Serving: 1</p>
            <p v-if="food.calories.amount">Calories: {{ food.calories.amount.toFixed(0) }} {{ food.calories.unit }}</p>
            <p v-if="food.carbohydrates.amount">Carbohydrates: {{ food.carbohydrates.amount.toFixed(0) }} {{
              food.carbohydrates.unit }}</p>
            <p v-if="food.protein.amount">Protein: {{ food.protein.amount.toFixed(0) }} {{ food.protein.unit }}</p>
            <p v-if="food.fat.amount">Fat: {{ food.fat.amount.toFixed(0) }} {{ food.fat.unit }}</p>
            <p v-if="food.sugar.amount">Sugar: {{ food.sugar.amount.toFixed(0) }} {{ food.sugar.unit }}</p>
            <p v-if="food.sodium.amount">Sodium: {{ food.sodium.amount.toFixed(0) }} {{ food.sodium.unit }}</p>
            <p v-if="food.iron.amount">Iron: {{ food.iron.amount.toFixed(0) }} {{ food.iron.unit }}</p>
            <p v-if="food.calcium.amount">Calcium: {{ food.calcium.amount.toFixed(0) }} {{ food.calcium.unit }}</p>
            <p v-if="food.caffeine.amount">Caffeine: {{ food.caffeine.amount.toFixed(0) }} {{ food.caffeine.unit }}</p>
            <p v-if="food.cholesterol.amount">Cholesterol: {{ food.cholesterol.amount.toFixed(0) }} {{
              food.cholesterol.unit }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Eat food</button>
        </div>
      </div>
      <div v-else class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="NutritionInfoModalLabel"></h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="text-center my-5 display-5">
            <span>Loading</span>
            <span class="mdi mdi-loading mdi-spin"></span>
          </div>
        </div>
      </div>
      <!-- <div v-else>
        <span>Loading</span>
        <span class="mdi mdi-loading mdi-spin"></span>
      </div> -->
    </div>
  </div>
</template>


<style lang="scss" scoped></style>