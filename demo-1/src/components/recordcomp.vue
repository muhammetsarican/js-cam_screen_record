<script lang="ts">
export default {
  props: ["startrecord", "duration", "saveToLocal", "file"],
};
</script>

<template>
  <div class="main">
    <div id="title-box">
      <h1>cam and screen</h1>
      <h1>recording during an exam</h1>
    </div>

    <div
      style="
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
      "
    >
      <!-- // ? for saving records at local -->
      <button type="button" @click="saveToLocal" :disabled="!file">
        download
      </button>
      <!-- // ? this starts the record operation -->
      <button type="button" @click="startrecord" :disabled="this.duration <= 0">
        start
      </button>
    </div>
    <!-- // ? warnings -->
    <div style="display: flex; flex-direction: column; gap: 1px; color: gray">
      <p>we checking cam records after exam for prevent the theft of labor</p>

      <p>
        if you have any objection for results, please send your application with
        your proofs
      </p>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.main {
  display: flex;
  flex-direction: column;
  gap: 100px;
  text-transform: capitalize;
}
#title-box {
  padding: 100px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
button {
  text-transform: capitalize;
  padding: 10px 20px;
}
</style>
