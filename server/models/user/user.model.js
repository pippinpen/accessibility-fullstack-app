const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customQuestionsSchema = new Schema({
    questionText: {
      type: String,
      required: true,
    },
    answerType: {
      type: String,
      required: true,
    },
});

const formConfigSchema = new Schema({
    participantInfo: {
      type: Boolean,
      required: true,
    },
    venue: {
      type: Boolean,
      required: true,
    },
    presentingMaterials: {
      type: Boolean,
      required: true,
    },
    content: {
      type: Boolean,
      required: true,
    },
    food: {
      type: Boolean,
      required: true,
    },
    drink: {
      type: Boolean,
      required: true,
    },
    customQuestions: [{
      type: customQuestionsSchema,
    }],
    participantComment: {
      type: Boolean,
      required: true,
    },
});

const participantResponseSchema = new Schema({
  questionText: {
    type: String,
    required: true,
  },
  answerValue: {
    type: String,
    required: true,
  },
});

const formTodoSchema = new Schema({
  todoTitle: {
    type: String,
    required: true,
  },
  todoDate: {
    type: Date,
    required: true,
  },
})

const eventSchema = new Schema({
    formName: {
    type: String,
    required: true,
    },
    formConfig: {
      type: formConfigSchema,
    },
    customQuestions: [{
      type: String,
      required: true,
    }],
    participantResponses: [{
      type: participantResponseSchema,
    }],
    formTodo: [{
      type: formTodoSchema
    }],
});

const settingsSchema = new Schema({
  marketingEmails:{
      type: Boolean,
      required: true,
    },
});

const userSchema = new Schema({
  userInfo: {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    customerID: {
    type: String,
    required: true,
  }
  },
  events: [{
    type: eventSchema,
  }],
  settings: {
    type: settingsSchema,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;