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
  computed: {
    timer: function () {
      const counterInterval = setInterval(() => {
        if (this.duration <= 0) return clearInterval(counterInterval);
        this.duration -= 1;
        console.log(this.duration);
      }, 1000);
    },
  },
  components: {
    recordcomp,
  },
  methods: {
    async record() {
      console.log("record starting");
      const cam_stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const screen_stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      const recorder = new RecordRTCPromisesHandler(
        [cam_stream, screen_stream],
        {
          type: "video",
        }
      );

      console.log("hello");
      recorder.startRecording();
      this.timer;

      const sleep = (m) => new Promise((r) => setTimeout(r, m));
      await sleep(this.duration * 1000);

      await recorder.stopRecording();
      const blob = await recorder.getBlob();
      console.log(blob);
      // invokeSaveAsDialog(blob, "screen_record.webm");

      // ! if wanted to save to local first convert to file then save it
      // const file = new File([blob], "screen_record_local.webm");
      // filesaver.saveAs(file, "../records/screen_record_filesaver.webm");

      const file = new File([blob], "screen_and_cam_record_server.webm");
      const data = new FormData();
      data.append("record", file);

      // ! for send to server
      fetch("http://localhost:3001/exam/upload-screen-record", {
        method: "POST",
        body: data,
      }).then((response) => console.log(response));
    },
  },
};
</script>


<template>
  <div>
    <div
      style="display: flex; height: fit-content; justify-content: space-between"
    >
      <select v-model="duration" style="height: fit-content">
        <option value="3">Please select duration</option>
        <option value="10">10sec</option>
        <option value="30">30sec</option>
        <option value="60">1min</option>
        <option value="300">5min</option>
      </select>
      <p>Time Left: {{ duration }} sec.</p>
    </div>
    <recordcomp :startrecord="record" :duration="duration" />
  </div>
</template>

<style scoped>
</style>
