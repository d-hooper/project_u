<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { daysService } from '@/services/DaysService.js';

const account = computed(() => AppState.account)
const activeDay = computed(() => AppState.activeDay)
const mealEntries = computed(() => AppState.mealEntries)
const days = computed(() => AppState.days)

onMounted(() => {
  getOrCreateCurrentDay()
  getDaysByAccountId()
})

async function getOrCreateCurrentDay() {
  try {
    await daysService.getOrCreateCurrentDay()
  }
  catch (error) {
    Pop.error(error, 'Could not get current day for this account');
    logger.error('Could not get current day for this account'.toUpperCase(), error);
  }
}

async function getDaysByAccountId() {
  try {
    await daysService.getDaysByAccountId()
  }
  catch (error) {
    Pop.error(error, 'Could not get days for this account');
    logger.error('Could not get days for this account'.toUpperCase(), error);
  }
}

async function getDayById(dayId) {
  try {
    if (dayId == activeDay.value.id) {
      Pop.toast('The selected day is already displayed')
      return
    }
    await daysService.setActiveDay(dayId)
  }
  catch (error) {
    Pop.error(error, 'Could not get selected day for this account');
    logger.error('Could not get selected day for this account'.toUpperCase(), error);
  }
}

</script>

<template>
  <section v-if="account && activeDay" class="container mt-3">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12">
            <h1>Welcome {{ account.name }}!</h1>
          </div>
          <div class="col-md-6">
            <div class="d-flex flex-column align-items-center bg-dark text-bg-dark py-4">
              <h2>{{ activeDay.day.toDateString() }}</h2>
              <div
                :class="`cal-goal d-flex justify-content-center align-items-center ${activeDay.dayCaloriesConsumed > activeDay.calorieGoal ? 'border-danger' : 'border-success'}`">
                <p class="mb-0 display-5 text-center">{{ activeDay.dayCaloriesConsumed }} / {{ activeDay.calorieGoal }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="meals-eaten pe-2 overflow-y-scroll">
              <h2>Meals Eaten</h2>
              <table class="table w-100">
                <thead>
                  <tr>
                    <th scope="col">Meal/Item</th>
                    <th scope="col">Servings</th>
                    <th scope="col">Calories</th>
                  </tr>
                </thead>
                <tbody v-if="mealEntries">
                  <tr v-for="mealEntry in mealEntries" :key="mealEntry.id">
                    <th scope="row" class="text-capitalize">
                      <img :src="mealEntry.smImageURL" :alt="mealEntry.meal.name" class="table-img">
                      {{ mealEntry.meal.name }}
                    </th>
                    <td>{{ mealEntry.servings }}</td>
                    <td>{{ mealEntry.meal.calorieCount * mealEntry.servings }}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>Total Calories</th>
                    <td></td>
                    <td>{{ activeDay.dayCaloriesConsumed }}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div v-else>
    <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
  </div>
  <section v-if="days" class="container mt-4">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div v-for="day in days" :key="day.id" class="col-md-4">
            <div @click="getDayById(day.id)" class="card text-center" role="button">
              <div>
                <p class="mb-0 fs-3">{{ day.day.toDateString() }}</p>
              </div>
              <div>
                <p class="md-0 fs-5">Calorie Goal: {{ day.calorieGoal }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cal-goal {
  height: 25dvh;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border-style: outset;
}

.meals-eaten {
  max-height: 35dvh;
}

table {
  border: 3px inset var(--bs-primary)
}

thead {
  border-bottom: 3px solid var(--bs-primary);
}

tr {
  border-bottom: 3px solid var(--bs-primary);
}

td,
th {
  border-right: 3px solid var(--bs-primary);
  padding: 0.25rem;
}

.table-img {
  height: 5dvh;
}
</style>
