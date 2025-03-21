const express = require("express");
const path = require("path");
const { examRouter } = require("./routes/exam");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "./", "uploads")));
app.use(cors());
app.use(fileUpload());

app.get("/", (req, res, next) => {
    res.status(200).send({
        success: true,
        message: "welcome to record screen demo"
    })
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server running on ${PORT} port.`);

    app.use("/exam", examRouter);

    app.use((req, res, next) => {
        return next(new Error("the page that you searched, not found"));
    })
})