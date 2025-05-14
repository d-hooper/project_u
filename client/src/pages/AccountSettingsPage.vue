<script setup>
import { AppState } from '@/AppState.js';
import { computed, ref } from 'vue';


const account = computed(() => AppState.account)

const editableAccountData = ref({
  profileImage: '',
  calorieGoal: 0
})

</script>


<template>
  <section class="container pt-5">
    <div class="row">
      <div class="col-12 text-center">
        <img :src="account.picture" alt="">
        <h1 class="pt-4">
          {{ account.name }}
        </h1>
      </div>
      <div class="col-12">
        <form @submit.prevent="">
          <div class="form-floating mb-3">
            <input class="form-control" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">Profile Image</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Calorie Goal</label>
          </div>
          <button class="btn btn-success mt-3" type="button" title="submit form">Submit</button>
        </form>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
img {
  height: 25dvh;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>