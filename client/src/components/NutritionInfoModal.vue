<script setup>
import { AppState } from '@/AppState.js';
import { accountService } from '@/services/AccountService.js';
import { mealsService } from '@/services/MealsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';
import { computed, onMounted, ref, } from 'vue';
import Login from './Login.vue';


const identity = computed(() => AppState.identity)
const food = computed(() => AppState.activeFood)
const serving = computed(() => AppState.activeFoodServingSize)
const activeFavorite = computed(() => AppState.activeFoodFavoriteId)

onMounted(() => {
  const myModalId = document.getElementById('NutritionInfoModal')
  myModalId.addEventListener('hidden.bs.modal', event => {
    resetServingSize()
  })
})

function increaseServingSize() {
  mealsService.increaseServingSize()
}

function decreaseServingSize() {
  mealsService.decreaseServingSize()
}
function resetServingSize() {
  mealsService.resetServingSize()
}


async function addFoodToFavorites(food) {
  try {

    await mealsService.addFoodToFavorites({ ...food, spoonacularMealId: food.spoonacularMealId, servings: serving.value, unit: food.theUnit, calorieCount: food.calories.amount })
    // Pop.success(`You successfully added ${food.name} to your favorites!`)

  }
  catch (error) {
    Pop.error(error, 'could not favorite this food');
    logger.log('could not favorite food', error)
  }
}

async function removeFoodFromFavorites() {
  try {
    await mealsService.removeFoodFromFavorites()
  }
  catch (error) {
    Pop.error(error, 'could not unfavorite');
  }
}

async function addFoodToDay(food) {
  try {
    if (!food.unit) {
      await mealsService.addMealToDay({
        ...food,
        spoonacularMealId: food.id,
        servings: serving.value,
        isRecipe: food.isRecipe
      })
    }
    else {
      await mealsService.addMealToDay({ ...food, spoonacularMealId: food.id, servings: serving.value, unit: food.theUnit })
    }
    Pop.success(`You successfully added ${food.name} to your calorie count!`)
  }
  catch (error) {
    Pop.error(error, 'could not log food!');
    logger.log('could not log food', error)
  }
}

</script>


<template>
  <!-- inert? -->
  <div class="modal fade" id="NutritionInfoModal" tabindex="-1" key="nutrition-modal">
    <div class="modal-dialog">
      <div v-if="food" class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-capitalize text-primary fw-bold" id="NutritionInfoModalLabel">{{ food.name }}
          </h1>
          <button @click="resetServingSize()" type="button" class="btn-close" data-bs-dismiss="modal"
                  aria-label="Close"></button>
        </div>
        <div class="modal-body pt-0">
          <div class="text-center my-5">
            <img class="shadow rounded-5 img-fluid" :src="food.medImageURL" :alt="food.name"
                 onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/b/b8/Placeholder-image.png?20150323180114'">
          </div>
          <div class="fs-4 text-dark">
            <span v-if="activeFavorite" class="mdi mdi-heart text-pink"></span>
            <div
                 class="d-flex justify-content-between rounded text-capitalize rounded border-primary text-primary fw-bold">
              <p v-if="food.unitLong">{{ food.unitLong
              }}<span class="text-lowercase">(s)</span>
              </p>
              <p v-else>{{ food.theUnit || 'Serving' }} <span class="text-lowercase">(s)</span></p>
              <div class="d-flex gap-2">
                <span @click="decreaseServingSize()" type="button" title="decrease serving"
                      class="mdi mdi-minus-circle"></span>
                <p>{{ serving }}</p>
                <span @click="increaseServingSize()" type="button" title="increase serving"
                      class="mdi mdi-plus-circle"></span>
              </div>
            </div>
            <p v-if="food.calories && food.calories.amount > 1" class="border border-primary rounded ps-2">
              Calories:
              {{ food.calories.amount.toFixed(0) * serving }}
              {{ food.calories.unit }}
            </p>
            <p v-else class="border border-primary rounded ps-2">
              Calories:
              {{ food.calories.amount.toFixed() * serving }}
              {{ food.calories.unit }}
            </p>
            <p v-if="food.carbohydrates && food.carbohydrates.amount > .5" class="border border-primary rounded ps-2">
              Carbohydrates:
              {{ food.carbohydrates.amount.toFixed(0) * serving }}
              {{ food.carbohydrates.unit }}
            </p>
            <p v-if="food.protein && food.protein.amount > .5" class="border border-primary rounded ps-2">
              Protein:
              {{ food.protein.amount.toFixed(0) * serving }}
              {{ food.protein.unit }}
            </p>
            <p v-if="food.fat && food.fat.amount > .5" class="border border-primary rounded ps-2">
              Fat:
              {{ food.fat.amount.toFixed(0) * serving }}
              {{ food.fat.unit }}
            </p>
            <p v-if="food.sugar && food.sugar.amount > .5" class="border border-primary rounded ps-2">
              Sugar:
              {{ food.sugar.amount.toFixed(0) * serving }}
              {{ food.sugar.unit }}
            </p>
            <p v-if="food.sodium && food.sodium.amount > .5" class="border border-primary rounded ps-2">
              Sodium:
              {{ food.sodium.amount.toFixed(0) * serving }}
              {{ food.sodium.unit }}
            </p>
            <p v-if="food.iron && food.iron.amount > .5" class="border border-primary rounded ps-2">
              Iron:
              {{ food.iron.amount.toFixed(0) * serving }}
              {{ food.iron.unit }}
            </p>
            <p v-if="food.calcium && food.calcium.amount > .5" class="border border-primary rounded ps-2">
              Calcium:
              {{ food.calcium.amount.toFixed(0) * serving }}
              {{ food.calcium.unit }}
            </p>
            <p v-if="food.caffeine && food.caffeine.amount > .5" class="border border-primary rounded ps-2">
              Caffeine:
              {{ food.caffeine.amount.toFixed(0) * serving }}
              {{ food.caffeine.unit }}
            </p>
            <p v-if="food.cholesterol && food.cholesterol.amount > .5" class="border border-primary rounded ps-2">
              Cholesterol:
              {{ food.cholesterol.amount.toFixed(0) * serving }}
              {{ food.cholesterol.unit }}
            </p>
          </div>
          <div v-if="identity" class="d-flex justify-content-between">
            <button v-if="!activeFavorite" @click="addFoodToFavorites(food)" type="button"
                    class="btn btn-primary mdi mdi-heart text-light text-shadow fw-bold">
              Favorite</button>
            <button v-else @click="removeFoodFromFavorites()"
                    class="btn btn-primary mdi mdi-heart-broken text-light text-shadow fw-bold" type="button">
              Unfavorite</button>
            <button @click="addFoodToDay(food)" data-bs-dismiss="modal" type="button"
                    class="btn btn-primary text-light text-shadow fw-bold">Log
              Food</button>
          </div>
          <div v-else>
            <div class="text-center d-flex align-items-sm-center justify-content-sm-center flex-column flex-sm-row">
              <Login />to favorite
              or add
              this food to your daily totals.
            </div>
          </div>
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
    </div>
  </div>
</template>


<style lang="scss" scoped></style>