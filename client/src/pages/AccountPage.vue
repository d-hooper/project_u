<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import { Pop } from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';
import { daysService } from '@/services/DaysService.js';

const account = computed(() => AppState.account)
const activeDay = computed(() => AppState.activeDay)
const mealEntries = computed(() => AppState.mealEntries)

onMounted(() => {
  getOrCreateCurrentDay()
})

async function getOrCreateCurrentDay() {
  try {
    await daysService.getOrCreateCurrentDay()
  }
  catch (error) {
    Pop.error(error, 'Could not get days for this account');
    logger.error('Could not get days for this account'.toUpperCase(), error);
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
              <h2>{{ activeDay.createdAt.toDateString() }}</h2>
              <div class="cal-goal d-flex justify-content-center align-items-center">
                <p class="mb-0 display-5 text-center">{{ activeDay.dayCaloriesConsumed }} / {{ activeDay.calorieGoal }}
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div>
              <h2>Meals Eaten</h2>
              <table class="table w-100">
                <thead>
                  <tr>
                    <th scope="col">Meal/Item</th>
                    <th scope="col">Servings</th>
                    <th scope="col">Calories</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="mealEntry in mealEntries" :key="mealEntry.id">
                    <th scope="row" class="text-capitalize">
                      <img :src="mealEntry.smImageURL" :alt="mealEntry.meal.name" class="table-img">
                      {{ mealEntry.meal.name }}
                    </th>
                    <td>{{ mealEntry.meal.servingSize }}</td>
                    <td>{{ mealEntry.meal.calorieCount * mealEntry.meal.servingSize }}</td>
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
</template>

<style scoped lang="scss">
.cal-goal {
  height: 25dvh;
  aspect-ratio: 1/1;
  border-radius: 50%;
  border-style: outset;
  border-color: var(--bs-primary);
}

table {
  border: 2px inset var(--bs-primary)
}

thead {
  border-bottom: 2px solid var(--bs-primary);
}

tr {
  border-bottom: 2px solid var(--bs-primary);
}

td,
th {
  border-right: 2px solid var(--bs-primary);
  padding: 0.25rem;
}

.table-img {
  height: 5dvh;
}
</style>
