const multer = require("multer");
const path = require("path");
const fs = require("fs");

module.exports.multerStorage = (req, res, next) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../files'));  // Save files to the directory
        },
        filename: function (req, file, cb) {
            // Extract the original file extension
            const ext = path.extname(file.originalname);

            // Save the file with a unique name and retain the original extension
            cb(null, file.fieldname + '-' + Date.now() + ext);
        }
    });

    // File filter to allow only PNG and JSON files
    const fileFilter = (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true); // Accept the file
        } else {
            cb(new Error('Invalid file type. Only PNG, JPG, JPEG, and WEBP files are allowed.'), false); // Reject the file
        }
    };

    const upload = multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: { fileSize: 2 * 1024 * 1024 } // 2MB file size limit
    });

    upload.array("files", 10)(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // Multer-specific errors
            return res.status(400).json({ error: `Multer error: ${err.message}` });
        } else if (err) {
            // General errors (e.g., file type error)
            return res.status(400).json({ error: `Error: ${err.message}` });
        }

        // No error
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        console.log(req.files);
        console.log("Files uploaded Successfully");
    });
    return;
}