const mongoose = require("mongoose");
const Schema = mongoose.Schema;

questionSchema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  answerType: {
    type: String,
    required: true,
  },
  answerText: {
    type: String,
  },
});

const formTypeSchema = new Schema({
  category: {
    type: String,
    enum: ["participantInfo", "venue", "presentingMaterials", "content", "food", "drink", "customQuestions", "participant-comment"]
  },
  questions: [{
    type: questionSchema,
  }],
  
});

const FormType = mongoose.model('FormType', formTypeSchema);

module.exports = FormType;