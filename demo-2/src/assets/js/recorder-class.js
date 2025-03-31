const button = document.querySelector("#start-record");
const cam_video = document.querySelector("#cam-stream");

class ExamRecorder {
    cam_stream;
    screen_stream;

    recorder;

    socket;

    constructor() {
        this.socket = new WebSocket("ws://localhost:3002");
    }

    async setStreamsAndRecorder() {
        const options = {
            video: true,
            audio: true
        };
        this.cam_stream = await navigator.mediaDevices.getUserMedia({
            ...options,
            audio: false
        });

        this.screen_stream = await navigator.mediaDevices.getDisplayMedia(options);

        this.recorder = new MediaRecorder(this.cam_stream);
        console.log(this.recorder);
    }

    async start() {
        console.log("record started")
        await this.setStreamsAndRecorder();
        this.recorder.start();
        cam_video.srcObject = this.cam_stream;
        cam_video.onloadedmetadata = () => {
            cam_video.play();
        }
    }

    stop() {
        return this.recorder.stop();
    }

    sendRecorderData() {
        this.recorder.ondataavaliable = (e) => {
            console.log("the data is available");

            // sending socket the record data
            this.socket.send(e.data);
        };
    }

    sendMessage() {
        // Get the value of
        // the message input
        const message = "Hello dear user";
        // Send the message to 
        // the WebSocket server
        this.socket.send(message);
        // Clear the message input
        messageInput.value = '';
    }
}

const recorder = new ExamRecorder();

button.addEventListener("click", async () => {
    await recorder.start();
    const sleep = () => new Promise((resolve, reject) => {
        setTimeout(resolve, 5000);
    });
    await sleep();
    await recorder.stop();
    console.log("record stopped");
});
