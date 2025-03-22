const path = require("path");

class exam {
    upload() {
        return (req, res, next) => {
            // ? folder path for save the file correctly, I got this part from my previous vue project
            const folderPath = path.join(__dirname, "../", "uploads/exam", `${req.files.record.name}`);

            req.files.record.mv(folderPath, function (err) {
                if (err) return next(new Error(err?.message));
            })

            res.status(200).send({
                success: true,
                message: `the screen record saved successfully`
            })
        }
    }
}

module.exports.examController = new exam();