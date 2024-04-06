    const multer = require('multer');
    const imageFilter = (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
          cb(null, true);
        } else {
          cb("Please upload only images.", false);
        }
      };
    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(
        null,
        file.fieldname +
            "-" +
            Date.now() +
            "." +
            file.originalname.split(".").pop()
        );
    },
    });
    const upload = multer({ storage: storage ,fileFilter: imageFilter});
    module.exports = { upload }; 
