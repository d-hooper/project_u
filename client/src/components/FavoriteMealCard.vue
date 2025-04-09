<script setup>
import { FavoriteMeal } from '@/models/FavoriteMeal.js';


defineProps({
  meals: { type: FavoriteMeal, required: true }
})

</script>


<template>

  <div class="card shadow mb-4 d-flex flex-column align-items-center" data-bs-toggle="modal"
    data-bs-target="#NutritionInfoModal" type="button">
    <div class="d-flex align-items-center justify-content-evenly flex-column">
      <div class="card-body card-image-body">
        <img :src="`${meals.medImageURL}`" :alt="`A picture of ${meals.name}`" class="food-search-img" role="button">

      </div>
      <div class="card-body card-title-body d-flex align-items-center justify-content-center">
        <div class="mb-0 text-capitalize text-primary fw-bold fs-4 text-center">{{ meals.name }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-title-body {
  height: 10dvh;
  width: 100%;
  aspect-ratio: 1/1;

}

// .card-image-body{
//  height: 25dvh;
//  width: 100%;
//  aspect-ratio: 1/1;

// }

.food-search-img {

  height: 25dvh;
  width: 100%;
  aspect-ratio: 1/1;
  // object-position: top;
  object-fit: contain;

}

.food-title {
  height: 20%;
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: contain;
  // object-position: top;




}

.card {
  border: none;
  // height: 20dvh
}
</style>