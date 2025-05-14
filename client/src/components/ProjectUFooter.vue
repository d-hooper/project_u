<script setup>

</script>


<template>
  <section class="container-fluid bg-light border-top border-3 border-primary">
    <div class="row justify-content-between pb-5">
      <div class="col-1 pt-4">
        <span class="mdi mdi-arm-flex display-4 text-start text-primary"></span>
      </div>
      <div class="col-lg-3 col-md-4 col-6 pt-4">
        <p class="fs-4 fw-bold">
          Our mission is to make the world a healthier place
        </p>
        <p class="gray-text">
          Want to learn more? Visit our about page!
        </p>
        <RouterLink :to="{ name: 'About' }" class="selectable">
          <button class="btn btn-primary text-light">About Page</button>
        </RouterLink>
      </div>
      <div class="col-1"></div>
    </div>
    <div class="row">
    </div>
  </section>
</template>


<style lang="scss" scoped>
.gray-text {
  color: rgb(67, 67, 67);
}
</style>