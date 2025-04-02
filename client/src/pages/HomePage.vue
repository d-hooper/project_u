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
        <div class="form-area my-3 d-flex align-items-center rounded">
          <form @submit.prevent="getFoodItemsByQuery()" class="mx-3 w-100">
            <div class="form-floating mb-3">
              <input v-model="editableSearchData" type="text" class="form-control" id="floatingInput"
                     placeholder="name@example.com">
              <label for="floatingInput">Search for food</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row">
      <div v-for="food in foods" :key="food.id" class="col-md-4 col-lg-3">
        <SearchedFood :food="food" />
      </div>
    </div>
  </section>

</template>

<style scoped lang="scss">
.form-area {
  min-height: 25dvh;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1479150928156-423a69d91fe0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: 15% 85%;
}

input {
  width: 100%;
}
</style>
