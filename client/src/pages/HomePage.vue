<script setup>
import { AppState } from '@/AppState.js';
import SearchedFood from '@/components/SearchedFood.vue';
import { mealsService } from '@/services/MealsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';

const editableSearchData = ref('')
const foods = computed(() => AppState.searchedFoods)

// onMounted(() => {
// })

async function getFoodItemsByQuery() {
  try {
    const searchQuery = editableSearchData.value
    await mealsService.getFoodItemsByQuery(searchQuery)
  }
  catch (error) {
    Pop.error(error, 'Could not get food item(s) by search query');
    logger.error('Could not get food item(s) by search query'.toUpperCase(), error)
  }
}

</script>

<template>
  <section class="container">
    <div class="row">
      <div class="col-12">
        <form @submit.prevent="getFoodItemsByQuery()">
          <div class="form-floating mb-3">
            <input v-model="editableSearchData" type="text" class="form-control" id="floatingInput"
                   placeholder="name@example.com">
            <label for="floatingInput">Search for food</label>
          </div>
        </form>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row">
      <div v-for="food in foods" :key="food.id" class="col-md-4">
        <SearchedFood :food="food" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
