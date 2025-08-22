<script setup>
import { AppState } from '@/AppState.js';
import { accountService } from '@/services/AccountService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, ref } from 'vue';


const account = computed(() => AppState.account)

const editableAccountData = ref({
  profileImage: '',
  calorieGoal: 0
})

async function editAccount() {
  try {
    await accountService.editAccount(editableAccountData.value)
    editableAccountData.value = {
      profileImage: '',
      calorieGoal: 0
    }
  }
  catch (error) {
    Pop.error(error, 'Could not edit account data')
    logger.error('COULD NOT EDIT ACCOUNT DATA', error)
  }
}

</script>


<template>
  <section class="container pt-5">
    <div class="row">
      <div class="col-12 text-center">
        <img :src="account.picture" alt="">
        <h1 class="py-4">
          {{ account.name }}
        </h1>
        <h2>
          {{ account.calorieGoal }}
        </h2>
      </div>
      <div class="col-12">
        <form @submit.prevent="editAccount()">
          <div class="form-floating mb-3">
            <input v-model="editableAccountData.profileImage" class="form-control" id="floatingInput"
              placeholder="Profile Image URL" type="url" minlength="10" maxlength="1500">
            <label for="calorieGoal">Profile Image</label>
          </div>
          <div class="form-floating">
            <input v-model="editableAccountData.calorieGoal" class="form-control" id="floatingPassword"
              placeholder="CalorieGoal" type="number" min="100" max="7000">
            <label for="calorieGoal">Calorie Goal</label>
          </div>
          <button class="btn btn-success mt-3" type="submit" title="submit form">Submit</button>
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
  object-position: center;
  object-fit: cover;
}
</style>