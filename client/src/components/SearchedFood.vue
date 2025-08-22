<script setup>
import { Meal } from '@/models/Meal.js';
import { mealsService } from '@/services/MealsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';
import { AppState } from '@/AppState.js';

const activeFood = computed(() => AppState.activeFood)
const identity = computed(() => AppState.identity)

defineProps({
  food: { type: Meal, required: true }
})

async function getDetailsById(food) {
  try {



    if (!food.possibleUnits) {
      await mealsService.getRecipeDetailsById(food)

      if (identity.value != null) {

        try {
          await mealsService.checkForFavoriteById(food)
        } catch (error) {
          Pop.error(error, 'Couldn\'t check if favorited')
        }
      }

      return
    }
    await mealsService.getIngredientDetailsById(food.id, food.theUnit)

    if (identity.value != null) {

      try {
        await mealsService.checkForFavoriteById(food)
      } catch (error) {
        Pop.error(error, 'Couldn\'t check if favorited')
      }
    }

  }
  catch (error) {
    Pop.error(error, 'Could not get food details')
    logger.error('COULD NOT GET FOOD DETAILS', error)
  }
}
</script>


<template>
  <div @click="getDetailsById(food)" class="card shadow mb-4 d-flex flex-column align-items-center"
       data-bs-toggle="modal" data-bs-target="#NutritionInfoModal" type="button">
    <div class="d-flex align-items-center justify-content-evenly flex-column">
      <div class="card-body card-image-body">
        <img v-if="food.possibleUnits" :src="`${food.medImageURL}`" :alt="`A picture of ${food.name}`"
             class="food-search-img" role="button"
             onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/b/b8/Placeholder-image.png?20150323180114'">

        <img v-else :src="`${food.medImageURL}`" :alt="`A picture of ${food.name}`" class="recipe-search-img"
             role="button"
             onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/b/b8/Placeholder-image.png?20150323180114'">

      </div>
      <div class="card-body card-title-body d-flex align-items-center justify-content-center">
        <div v-if="food.name.length < 25" class="text-capitalize text-primary fw-bold fs-4 text-center pb-3">{{
          food.name }}</div>
        <div v-else-if="food.name.length < 35"
             class="mb-0 text-capitalize text-primary fw-bold fs-5 text-center pb-4 px-2">
          {{ food.name }}</div>
        <div v-else class="mb-0 text-capitalize text-primary fw-bold text-center pb-4 px-2">{{ food.name }}</div>

      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.card-title-body {
  height: 10dvh;
  width: 115%;
  aspect-ratio: 1/1;

}

// .card-image-body{
//  height: 25dvh;
//  width: 100%;
//  aspect-ratio: 1/1;

// }

.food-search-img {

  height: 25dvh;
  width: 100%;
  aspect-ratio: 1/1;
  // object-position: top;
  object-fit: contain;

}

.recipe-search-img {

  height: 25dvh;
  width: 100%;
  aspect-ratio: 1/1;
  // object-position: top;
  object-fit: cover;

}

.food-title {
  height: 20%;
  width: 100%;
  aspect-ratio: 1/1;

  // object-position: top;




}

.card {
  border: none;
  // height: 20dvh
}
</style>