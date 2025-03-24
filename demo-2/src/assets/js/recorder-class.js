class ExamRecorder {
    cam_stream;
    screen_stream;

    recorder;

    setStreamsAndRecorder() {
        const options = {
            video: true,
            audio: true
        };
        navigator.mediaDevices.getUserMedia(options)
            .then((stream) => {
                this.cam_stream = stream;
            })
            .catch(err => console.log(err));

        navigator.mediaDevices.getDisplayMedia({
            ...options,
            preferCurrentTab: true
        })
            .then((stream) => {
                this.screen_stream = stream;
            })
            .catch(err => console.log(err));

        this.recorder = new MediaRecorder([this.cam_stream, this.screen_stream]);
    }

    startRecording() {
        console.log("record started")
        this.setStreamsAndRecorder();
        this.recorder.startRecording();
    }

}

const button = document.querySelector("#start-record");
const recorder = new ExamRecorder();

button.addEventListener("click", () => recorder.startRecording());