const express = require("express");
const path = require("path");
const { examRouter } = require("./routes/exam");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const app = express();
// ? this is for prevent cors errors
app.use(cors());
// ? this is for get files from client side
app.use(fileUpload());

// ? base route for testing
app.get("/", (req, res, next) => {
    res.status(200).send({
        success: true,
        message: "welcome to record screen demo"
    })
})

// ? server initiated
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`server running on ${PORT} port.`);

    // ? exam route created for this demo
    app.use("/exam", examRouter);

    app.use((req, res, next) => {
        return next(new Error("the page that you searched, not found"));
    })
})