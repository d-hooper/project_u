<script setup>
import { FavoriteMeal } from '@/models/FavoriteMeal.js';
import { mealsService } from '@/services/MealsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap';


defineProps({
  meal: { type: FavoriteMeal, required: true }
})

// async function addFoodToDay(food) {
//   try {
//     if (!food.unit) {
//       await mealsService.addMealToDay({
//         ...food,
//         mealId: food.spoonacularMealId,
//         isRecipe: food.isRecipe,
//       })
//     }
//     else {
//     await mealsService.addMealToDay({ ...food, mealId: food.spoonacularMealId, servings: 1 })
//     }
//     Pop.success(`You successfully added ${food.name} to your calorie count!`)
//   }
//   catch (error) {
//     Pop.error(error, 'could not log food!');
//     logger.error('could not log food', error)
//   }
// }

async function addFoodToDay(meal) {
  try {
    if (!meal.unit) {
      await mealsService.addMealToDay({
        ...meal,
        servings: 1,
        calorieCount: meal.calorieCount,
        isRecipe: meal.isRecipe
      })
    }
    else {
      await mealsService.addMealToDay({ ...meal, servings: 1, unit: meal.theUnit, calorieCount: meal.calorieCount })
    }
    Pop.success(`You successfully added ${meal.name} to your calorie count!`)
  }
  catch (error) {
    Pop.error(error, 'could not log food!');
    logger.error('could not log food', error)
  }
}

async function deleteFavoriteMeal(meal) {
  try {
    const confirm = await Pop.confirm('Are you sure you want to delete this meal from your favorites?', 'If you do, it will be gone for ever', 'yes', 'no')
    if (!confirm) {
      return
    }
    await mealsService.deleteFavoriteMeal(meal)
  }
  catch (error) {
    Pop.error(error, 'Could not delete favorite meal')
    logger.error('COULD NOT DELETE FAVORITE MEAL', error)
  }
}

</script>


<template>

  <div class="card shadow mb-4 d-flex">
    <div class="d-flex align-items-center justify-content-evenly flex-column">
      <div class="card-body card-image-body">
        <img :src="`${meal.medImageURL}`" :alt="`A picture of ${meal.name}`" class="food-search-img">

      </div>
      <div class="card-body card-title-body d-flex align-items-center justify-content-center">
        <div class="mb-0 text-capitalize text-primary fw-bold fs-4 text-center">{{ meal.name }}</div>
      </div>
    </div>
    <div class="d-flex justify-content-between p-3 pt-5">
      <button @click="deleteFavoriteMeal(meal)" class="btn btn-danger"
        :title="`Delete ${meal.name} from your favorited meals`">Delete</button>
      <button @click="addFoodToDay(meal)" class="btn btn-primary text-light"
        :title="`Delete ${meal.name} from your favorited meals`">Log
        Food</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-title-body {
  height: 10dvh;
  width: 100%;
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

.food-title {
  height: 20%;
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: contain;
  // object-position: top;




}

.card {
  border: none;
  // height: 20dvh
}
</style>