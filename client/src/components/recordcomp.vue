<script lang="ts">
export default {
  props: ["startrecord", "duration"],
};
</script>

<template>
  <div>
    <h1>cam and screen recording during an exam</h1>

    <div class="card">
      <button type="button" @click="startrecord" :disabled="this.duration <= 0">
        start
      </button>
      <p>we checking cam records after exam for prevent the theft of labor</p>
    </div>

    <p>
      if you have any objection for results, please send your application with
      your proofs
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
