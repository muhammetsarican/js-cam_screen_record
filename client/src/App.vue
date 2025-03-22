<script lang="ts">
import { RecordRTCPromisesHandler, invokeSaveAsDialog } from "recordrtc";
import recordcomp from "./components/recordcomp.vue";
import filesaver from "file-saver";

export default {
  data() {
    return {
      duration: 3,
      videoSrc: null,
      videoSrcObject: null,
      file: null,
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
      // ! this is for cam recording
      const cam_stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      // ! this is for streaming cam record to user
      this.videoSrcObject = cam_stream;

      // ! this is for screen recording
      const screen_stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });

      // this.videoSrcObject = screen_stream;

      // ! this is recorder comes from the lib
      const recorder = new RecordRTCPromisesHandler(
        // ? in here takes streams as array and records it horizontally
        [cam_stream, screen_stream],
        {
          type: "video",
        }
      );

      // ! start the operation
      recorder.startRecording();
      this.timer;

      // ! this is for keep recording live during the given duration time
      const sleep = (m) => new Promise((r) => setTimeout(r, m));
      await sleep(this.duration * 1000);

      await recorder.stopRecording();

      // ! this is gives video blob
      const blob = await recorder.getBlob();

      // ! this is sets video src for stream it
      this.videoSrc = URL.createObjectURL(blob);

      // ! convert blob to file
      this.file = new File([blob], "screen_and_cam_record_server.webm");
      // ! create form data for send data to api
      const data = new FormData();
      data.append("record", this.file);

      this.sendToServer(data);
    },
    saveToLocal() {
      // ! this is for saving local, it comes from recordrtc
      // invokeSaveAsDialog(blob, "screen_record.webm");
      // ! if wanted to save to local first convert to file then save it
      if (!this.file) return;
      filesaver.saveAs(this.file, "../records/screen_record_filesaver.webm");
    },
    sendToServer(data: FormData) {
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
    <recordcomp
      :startrecord="record"
      :duration="duration"
      :file="file"
      :saveToLocal="saveToLocal"
    />
    <video
      :src="videoSrc"
      :srcObject="videoSrcObject"
      style="
        border-radius: 25px;
        width: 350px;
        position: absolute;
        bottom: 15px;
        right: 15px;
        border: 1px solid gray;
      "
    ></video>
  </div>
</template>

<style scoped>
</style>
