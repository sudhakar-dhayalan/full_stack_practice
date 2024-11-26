const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadSchema = new Schema({
  uploads: [
    {
      fileName: { type: String, required: true },
      filePath: { type: String, required: true },
      fileType: { type: String, required: true },
      fileSize: { type: Number, required: true },
    },
  ],
  // user: {
  //   userId: {
  //     type: mongoose.SchemaTypes.ObjectId,
  //     required: true,
  //     ref: 'User',
  //   },
  //   email: { type: String, required: true, ref: 'User' },
  // },
});

module.exports = mongoose.model('Upload', uploadSchema);
