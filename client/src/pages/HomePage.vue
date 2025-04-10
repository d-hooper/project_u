<script setup>
import { AppState } from '@/AppState.js';
import NutritionInfoModal from '@/components/NutritionInfoModal.vue';
import SearchedFood from '@/components/SearchedFood.vue';
import { mealsService } from '@/services/MealsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const editableSearchData = ref('')
const foods = computed(() => AppState.searchedFoods)
const route = useRoute()
const router = useRouter()
const searchResults = ref('')

let activeSearchOption = route.query.type
let searchBackground = ref('https://images.unsplash.com/photo-1479150928156-423a69d91fe0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')

onUnmounted(() => {
  resetSearchResults()
})


onMounted(() => {
  if (!route.query.type) {
    router.push({ query: { type: 'food' } })
  }
  setActiveSearchOption('food')
})
// NOTE we could later have a function run onMounted to get most recent searches/previously used foods

function setActiveSearchOption(option) {
  activeSearchOption = option
  setSearchBackground()
}

function setSearchBackground() {
  if (activeSearchOption == 'food') {
    searchBackground.value = 'https://images.unsplash.com/photo-1479150928156-423a69d91fe0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
  if (activeSearchOption == 'recipes') {
    searchBackground.value = 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?q=80&w=2092&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
}

async function getItemsByQuery() {
  try {
    const searchQuery = editableSearchData.value
    searchResults.value = editableSearchData.value
    if (activeSearchOption == 'food') {
      await mealsService.getFoodItemsByQuery(searchQuery)
    }
    if (activeSearchOption == 'recipes') {
      await mealsService.getRecipesByQuery(searchQuery)
    }
    editableSearchData.value = ''
  }
  catch (error) {
    Pop.error(error, 'Could not return item(s) from search query');
    logger.error('Could not return item(s) from search query'.toUpperCase(), error)
  }
}

function resetSearchResults() {
  mealsService.resetSearchResults()
}
</script>

<template>
  <div class="row">
    <div class="form-area d-flex flex-column justify-content-center align-items-center shadow p-4"
         :style="{ backgroundImage: `url(${searchBackground})` }">

      <form @submit.prevent="getItemsByQuery()" class="mx-3 w-100">
        <div class="form-floating mb-3 input-group text-center text-dark">
          <input v-model="editableSearchData" type="text" class="form-control rounded-start" id="floatingInput">
          <label v-if="activeSearchOption == 'food'" for="floatingInput" class="text-primary fw-bold fs-5">Search for
            food</label>
          <label v-else-if="activeSearchOption == 'recipes'" for="floatingInput"
                 class="text-primary fw-bold fs-5">Search
            for recipes</label>
          <label v-else-if="activeSearchOption == 'exercises'" for="floatingInput"
                 class="text-primary fw-bold fs-5">Search
            for exercises</label>
          <button class="btn btn-grey text-light text-shadow" type="submit" :title="`Search for ${activeSearchOption}`">
            Search
          </button>
        </div>
      </form>
      <div class="mt-2">
        <RouterLink :to="{ query: { type: 'food' } }">
          <button @click="setActiveSearchOption('food')"
                  :class="`btn btn-grey text-shadow text-light me-2 ${route.query.type == 'food' ? 'border-bottom border-primary border-3' : ''}`"
                  type="button">Food</button>
        </RouterLink>
        <RouterLink :to="{ query: { type: 'recipes' } }">
          <button @click="setActiveSearchOption('recipes')"
                  :class="`btn btn-grey text-shadow text-light me-2 ${route.query.type == 'recipes' ? 'border-bottom border-primary border-3' : ''}`"
                  type="button">Recipes</button>
        </RouterLink>
      </div>
    </div>
  </div>
  <section class="container-fluid">
    <div class="row">
    </div>
  </section>
  <section class="container mt-3">
    <div class="row mt-2">
      <div v-if="foods.length > 0" class="col-12">
        <div class="d-flex gap-2 align-items-center mb-1
        ">
          <span @click="resetSearchResults" class="mdi mdi-close-thick fs-2 text-danger" role="button"
                title="Clear search results"></span>
          <h2 class="mb-0">Showing results for "{{ searchResults }}"</h2>
        </div>
      </div>
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
  min-height: 50dvh;
  width: 120%;
  background-size: cover;
  background-position: 15% 85%;
}

.input-group {
  max-width: 75%;
  margin: auto;
}

@media screen and (max-width: 576px) {
  .form-area {
    min-height: 25dvh;
    background-position: center;
  }

  .input-group {
    max-width: 100%;
    margin: auto
  }
}
</style>
