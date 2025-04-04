<script setup>
import { AppState } from '@/AppState.js';
import { mealsService } from '@/services/MealsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';


const food = computed(() => AppState.activeFood)


async function addFoodToDay(foodId) {
  try {
    await mealsService.addFoodToDay(foodId)
  }
  catch (error) {
    Pop.error(error, 'could not log food!');
    logger.log('could not log food', error)
  }
}

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
            <p v-if="food.unitLong" class="text-capitalize">{{ food.unitLong }}: 1</p>
            <p v-else class="text-capitalize">{{ food.unit }}: 1</p>
            <p v-if="food.calories && food.calories.amount > .5">Calories: {{ food.calories.amount.toFixed(0) }} {{
              food.calories.unit }}</p>
            <p v-if="food.carbohydrates && food.carbohydrates.amount > .5">Carbohydrates: {{
              food.carbohydrates.amount.toFixed(0) }} {{
                food.carbohydrates.unit }}</p>
            <p v-if="food.protein && food.protein.amount > .5">Protein: {{ food.protein.amount.toFixed(0) }} {{
              food.protein.unit }}</p>
            <p v-if="food.fat && food.fat.amount > .5">Fat: {{ food.fat.amount.toFixed(0) }} {{ food.fat.unit }}</p>
            <p v-if="food.sugar && food.sugar.amount > .5">Sugar: {{ food.sugar.amount.toFixed(0) }} {{ food.sugar.unit
            }}</p>
            <p v-if="food.sodium && food.sodium.amount > .5">Sodium: {{ food.sodium.amount.toFixed(0) }} {{
              food.sodium.unit }}</p>
            <p v-if="food.iron && food.iron.amount > .5">Iron: {{ food.iron.amount.toFixed(0) }} {{ food.iron.unit }}
            </p>
            <p v-if="food.calcium && food.calcium.amount > .5">Calcium: {{ food.calcium.amount.toFixed(0) }} {{
              food.calcium.unit }}</p>
            <p v-if="food.caffeine && food.caffeine.amount > .5">Caffeine: {{ food.caffeine.amount.toFixed(0) }} {{
              food.caffeine.unit }}</p>
            <p v-if="food.cholesterol && food.cholesterol.amount > .5">Cholesterol: {{
              food.cholesterol.amount.toFixed(0) }} {{
                food.cholesterol.unit }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="addFoodToDay(food.id)" type="button" class="btn btn-primary">Log Food</button>
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