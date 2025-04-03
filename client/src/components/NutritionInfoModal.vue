<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';


const food = computed(() => AppState.activeFood)



</script>


<template>
  <!-- inert? -->
  <div class="modal fade" id="NutritionInfoModal" tabindex="-1" aria-labelledby="NutritionInfoModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div v-if="food" class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-capitalize" id="NutritionInfoModalLabel">{{ food.name }}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="text-center">
            <img :src="`${food.imageBaseUrl}` + '_250x250/' + `${food.image}`" alt="">
          </div>
          <div>
            <p>Calories: {{ food.calories.amount }}</p>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
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
      <!-- <div v-else>
        <span>Loading</span>
        <span class="mdi mdi-loading mdi-spin"></span>
      </div> -->
    </div>
  </div>
</template>


<style lang="scss" scoped></style>