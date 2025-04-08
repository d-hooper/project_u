<script setup>
import { AppState } from '@/AppState.js';
import { MealEntry } from '@/models/MealEntry.js';
import { mealsService } from '@/services/MealsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';
import { computed, onMounted, ref, } from 'vue';

// NOTE this was originally copied and pasted from Nutrition Info Modal, so there might be extra stuff we can take out

const food = computed(() => AppState.activeFood)

const serving = computed(() => AppState.activeFoodServingSize)

const mealEntryId = computed(() => AppState.activeMealEntryId)


// defineProps({
//   mealEntry: { type: MealEntry, required: true }
// })

onMounted(() => {
  const myModalId = document.getElementById('MealEntryModal')
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

async function changeServings() {
  try {

    await mealsService.changeServings(mealEntryId, serving.value)
  } catch (error) {
    Pop.error('couldnt change the serving amounts', error)
    logger.log('nice try. but we cant change the serving amount', error)
  }
}

async function addFoodToDay(food) {
  try {

    await mealsService.addMealToDay({ ...food, spoonacularMealId: food.id, servings: serving.value, unit: food.theUnit })
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
  <div class="modal fade" id="MealEntryModal" tabindex="-1" aria-labelledby="MealEntryModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div v-if="food" class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-capitalize text-indigo" id="MealEntryModalLabel">{{ food.name }}</h1>
          <button @click="resetServingSize()" type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body pt-0">
          <div class="text-center my-5">
            <img class="shadow rounded-5" :src="`${food.imageBaseUrl}` + '_250x250/' + `${food.image}`" alt="">
          </div>
          <div class="fs-4 text-indigo">
            <div class="d-flex justify-content-between rounded ps-2 ">
              <p v-if="food.unitLong" class="text-capitalize">{{ food.unitLong
              }}: 1
              </p>
              <p v-else class="text-capitalize border border-indigo rounded ps-2">{{ food.theUnit }}: 1</p>
              <div class="d-flex gap-2">
                <span @click="decreaseServingSize()" type="button" title="decrease serving"
                  class="mdi mdi-minus-circle"></span>
                <p>{{ serving }}</p>
                <span @click="increaseServingSize()" type="button" title="increase serving"
                  class="mdi mdi-plus-circle"></span>
              </div>
            </div>
            <p v-if="food.calories && food.calories.amount > 1" class="border border-indigo rounded ps-2">
              Calories:
              {{ food.calories.amount.toFixed(0) * serving }}
              {{ food.calories.unit }}
            </p>
            <p v-else class="border border-indigo rounded ps-2">
              Calories:
              {{ food.calories.amount.toFixed(0) * serving }}
              {{ food.calories.unit }}
            </p>
            <p v-if="food.carbohydrates && food.carbohydrates.amount > .5" class="border border-indigo rounded ps-2">
              Carbohydrates:
              {{ food.carbohydrates.amount.toFixed(0) * serving }}
              {{ food.carbohydrates.unit }}
            </p>
            <p v-if="food.protein && food.protein.amount > .5" class="border border-indigo rounded ps-2">
              Protein:
              {{ food.protein.amount.toFixed(0) * serving }}
              {{ food.protein.unit }}
            </p>
            <p v-if="food.fat && food.fat.amount > .5" class="border border-indigo rounded ps-2">
              Fat:
              {{ food.fat.amount.toFixed(0) * serving }}
              {{ food.fat.unit }}
            </p>
            <p v-if="food.sugar && food.sugar.amount > .5" class="border border-indigo rounded ps-2">
              Sugar:
              {{ food.sugar.amount.toFixed(0) * serving }}
              {{ food.sugar.unit }}
            </p>
            <p v-if="food.sodium && food.sodium.amount > .5" class="border border-indigo rounded ps-2">
              Sodium:
              {{ food.sodium.amount.toFixed(0) * serving }}
              {{ food.sodium.unit }}
            </p>
            <p v-if="food.iron && food.iron.amount > .5" class="border border-indigo rounded ps-2">
              Iron:
              {{ food.iron.amount.toFixed(0) * serving }}
              {{ food.iron.unit }}
            </p>
            <p v-if="food.calcium && food.calcium.amount > .5" class="border border-indigo rounded ps-2">
              Calcium:
              {{ food.calcium.amount.toFixed(0) * serving }}
              {{ food.calcium.unit }}
            </p>
            <p v-if="food.caffeine && food.caffeine.amount > .5" class="border border-indigo rounded ps-2">
              Caffeine:
              {{ food.caffeine.amount.toFixed(0) * serving }}
              {{ food.caffeine.unit }}
            </p>
            <p v-if="food.cholesterol && food.cholesterol.amount > .5" class="border border-indigo rounded ps-2">
              Cholesterol:
              {{ food.cholesterol.amount.toFixed(0) * serving }}
              {{ food.cholesterol.unit }}
            </p>
          </div>
        </div>
        <div class="modal-footer">

          <button @click="changeServings()" type="button" class="btn btn-primary text-light">Save
            Changes</button>
        </div>
      </div>
      <div v-else class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="MealEntryModalLabel"></h1>
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