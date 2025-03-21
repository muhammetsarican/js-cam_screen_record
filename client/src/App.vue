<script lang="ts">
import {
  RecordRTCPromisesHandler,
  invokeSaveAsDialog,
  DiskStorage,
} from "recordrtc";
import recordcomp from "./components/recordcomp.vue";
import filesaver from "file-saver";

export default {
  data() {
    return {
      duration: 3,
    };
  },
  components: {
    recordcomp,
  },
  methods: {
    async record() {
      console.log("record starting");
      let stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      let recorder = new RecordRTCPromisesHandler(stream, {
        type: "video",
      });
      console.log("hello");
      recorder.startRecording();

      const sleep = (m) => new Promise((r) => setTimeout(r, m));
      await sleep(this.duration * 1000);

      await recorder.stopRecording();
      let blob = await recorder.getBlob();
      console.log(blob);
      // invokeSaveAsDialog(blob, "screen_record.webm");

      // ! if wanted to save to local first convert to file then save it
      // const file = new File([blob], "screen_record_local.webm");
      // filesaver.saveAs(file, "../records/screen_record_filesaver.webm");

      const file = new File([blob], "screen_record_server.webm");
      const data = new FormData();
      data.append("screen_record", file);

      // ! for send to server
      fetch("http://localhost:3000/exam/upload-screen-record", {
        method: "POST",
        body: data,
      }).then((response) => console.log(response));
    },
  },
};
</script>


<template>
  <div>
    <select v-model="duration">
      <option value="3">Please select duration</option>
      <option value="10">10sec</option>
      <option value="30">30sec</option>
      <option value="60">1min</option>
      <option value="300">5min</option>
    </select>
    <recordcomp :startrecord="record" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
