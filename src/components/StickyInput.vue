<template>
  <vs-dialog width="300px" not-center v-model="active3">
    <template #header>
      <h4 class="not-margin">Welcome what is your <b>Name</b></h4>
    </template>

    <div class="con-content">
      <vs-input v-model="input1" placeholder="Name"></vs-input>
    </div>

    <template #footer>
      <div class="con-footer">
        <vs-button @click="active3 = false" transparent> Ok </vs-button>
        <vs-button @click="active3 = false" dark transparent>
          Cancel
        </vs-button>
      </div>
    </template>
  </vs-dialog>
</template>

<script>
export default {};
</script>

<style>
</style>