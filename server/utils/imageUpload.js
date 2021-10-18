const multer = require('multer');
/**
 * 
 * @param req request
 * @param res response
 * @param prefix file name prefix
 * @param path file storage path
 * @param callback callback
 */
const singleFileUpload = async (req, res, prefix, path, callback) => {
  const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/' + path)
    },
    filename: function (req, file, cb) {
      cb(null, prefix + '_' + Date.now())
    }
  })
  const fileUpload = multer({ storage: fileStorage }).single('image');

  fileUpload(req, res, async (err, data) => {
    if (err instanceof multer.MulterError) {
      throw new Error('File upload failed !')
    } else if (err) {
      throw new Error('File upload failed !')
    }
    await callback(req.file.filename)
  })
}

module.exports = {
  singleFileUpload
};