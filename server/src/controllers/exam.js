const path = require("path");

class exam {
    upload() {
        return (req, res, next) => {
            console.log(req.files);

            const folderPath = path.join(__dirname, "../", "uploads/exam", `${req.files.screen_record.name}`);

            req.files.screen_record.mv(folderPath, function (err) {
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