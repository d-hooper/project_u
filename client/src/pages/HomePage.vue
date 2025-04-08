<script setup>
import { AppState } from '@/AppState.js';
import NutritionInfoModal from '@/components/NutritionInfoModal.vue';
import SearchedFood from '@/components/SearchedFood.vue';
import { mealsService } from '@/services/MealsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';

const editableSearchData = ref('')
const foods = computed(() => AppState.searchedFoods)
const searchOptions = ['food', 'recipes', 'exercises']
const activeSearchOption = ref('food')
let searchBackground = ref('https://images.unsplash.com/photo-1479150928156-423a69d91fe0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')

onMounted(() => {
  setSearchBackground()
})
// NOTE we could later have a function run onMounted to get most recent searches/previously used foods

function setActiveSearchOption(option) {
  activeSearchOption.value = option
  this.setSearchBackground()
}

function setSearchBackground() {
  if (activeSearchOption.value == 'food') {
    searchBackground.value = 'https://images.unsplash.com/photo-1479150928156-423a69d91fe0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
  if (activeSearchOption.value == 'recipes') {
    searchBackground.value = 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?q=80&w=2092&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
}

async function getItemsByQuery() {
  try {
    const searchQuery = editableSearchData.value
    if (activeSearchOption.value == 'food') {
      await mealsService.getFoodItemsByQuery(searchQuery)
    }
    if (activeSearchOption.value == 'recipes') {
      await mealsService.getRecipesByQuery(searchQuery)
    }
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
        <div class="form-area my-3 d-flex flex-column justify-content-center align-items-center rounded shadow p-4"
             :style="{ backgroundImage: `url(${searchBackground})` }">

          <form @submit.prevent="getItemsByQuery()" class="mx-3 w-100">
            <div class="form-floating mb-3 d-flex">
              <input v-model="editableSearchData" type="text" class="form-control" id="floatingInput">
              <label v-if="activeSearchOption == 'food'" for="floatingInput">Search for food</label>
              <label v-else-if="activeSearchOption == 'recipes'" for="floatingInput">Search for recipes</label>
              <label v-else for="floatingInput">Search for exercises</label>
              <div class="text-end">
                <button class="btn btn-grey h-100 text-light text-shadow" type="submit"
                        :title="`Search for ${activeSearchOption}`">
                  Search
                </button>
              </div>
            </div>
          </form>
          <div class="mt-2">
            <button @click="setActiveSearchOption('food')" class="btn btn-grey text-shadow text-light me-2"
                    type="button">Food</button>
            <button @click="setActiveSearchOption('recipes')" class="btn btn-grey text-shadow text-light me-2"
                    type="button">Recipes</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row mt-2">
      <!-- col-md-4 col-lg-3  -->
      <div v-for="food in foods" :key="food.id" class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3">
        <SearchedFood :food="food" />
      </div>
    </div>
  </section>
  <NutritionInfoModal />

</template>

<style scoped lang="scss">
.form-area {
  min-height: 35dvh;
  width: 100%;
  background-size: cover;
  background-position: 15% 85%;
}

input {
  width: 100%;
}
</style>
