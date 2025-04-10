<script setup>
import { AppState } from '@/AppState.js';
import { MealEntry } from '@/models/MealEntry.js';
import { daysService } from '@/services/DaysService.js';
import { mealsService } from '@/services/MealsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.js';
import { computed, onMounted, ref, } from 'vue';

// NOTE this was originally copied and pasted from Nutrition Info Modal, so there might be extra stuff we can take out

const food = computed(() => AppState.activeFood)
const serving = computed(() => AppState.activeFoodServingSize)
const mealEntryId = computed(() => AppState.activeMealEntryId)

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
    await mealsService.changeServings(mealEntryId.value, serving.value)
    // await daysService.updateDay(day.value.id)
    // Modal.getOrCreateInstance('#MealEntryModal').hide()
  } catch (error) {
    Pop.error(error, `couldn't change the serving amounts`)
    logger.error('nice try. but we cant change the serving amount', error)
  }
}
async function deleteEntry() {
  try {
    const confirmed = await Pop.confirm('Are you sure you want to delete this meal entry?', 'If you do, it will be gone forever', 'YES', 'NO')
    if (!confirmed) {
      return
    }
    await mealsService.deleteEntry(mealEntryId.value)
    // Modal.getOrCreateInstance('#MealEntryModal').hide()
  } catch (error) {
    Pop.error(error, 'Could not delete meal entry')
    logger.error('COULD NOT DELETE MEAL ENTRY', error)
  }
}
</script>


<template>
  <!-- inert? -->
  <div class="modal fade" id="MealEntryModal" tabindex="-1" aria-labelledby="MealEntryModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div v-if="food" class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-capitalize text-primary fw-bold" id="MealEntryModalLabel">{{ food.name }}
          </h1>
          <button @click="resetServingSize()" type="button" class="btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body pt-0">
          <div class="text-center my-5">
            <img class="img-fluid" :src="food.medImageURL" alt="">
          </div>
          <div class="fs-4 text-dark">
            <div class="d-flex justify-content-between rounded text-primary fw-bold">
              <p v-if="food.unitLong && food.unitLong != 'undefined'" class="text-capitalize">{{
                food.unitLong ?
                  `${food.unitLong}` : 'Serving' }}<span class="text-lowercase">(s)</span>
              </p>
              <p v-else-if="food.unit == '' || !food.unit" class="text-capitalize rounded px-2">
                Serving<span class="text-lowercase">(s)</span>
              </p>
              <p v-else class="text-capitalize rounded px-2">
                {{ food.theUnit != undefined ? `${food.theUnit}` : 'Serving' }}<span class="text-lowercase">(s)</span>
              </p>
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
              {{ food.calories.amount.toFixed(2) * serving }}
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
        <div class="modal-footer d-flex justify-content-between">
          <button @click="deleteEntry()" type="button" title="Delete meal entry" class="btn btn-danger text-light"
            data-bs-dismiss="modal">Delete</button>

          <button @click="changeServings()" type="button" class="btn btn-primary text-light"
            data-bs-dismiss="modal">Save
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