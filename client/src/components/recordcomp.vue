<script lang="ts">
export default {
  props: ["startrecord"],
};
</script>

<template>
  <div>
    <h1>cam recording during an exam</h1>

    <div class="card">
      <button type="button" @click="startrecord">start the exam</button>
      <p>we checking cam records after exam for prevent the theft of labor</p>
    </div>

    <p>
      if you have any objection for results, please send your application with
      proofs
    </p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
