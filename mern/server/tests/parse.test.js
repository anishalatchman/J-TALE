import {
  parse,
  createQAs,
  initialQAID,
  createQA,
  isValidItem,
} from "../utils/parse";
const mongoose = require("mongoose");
require("dotenv").config();
import QA from "../models/question_answer.js";

describe("initialQAID function testing", () => {
  const validQuestion = {
    id: "lol1",
    question: "Hello",
    question_included: false,
    intents: { value: "hi", included: false, children: ["lol"] },
  };
  const validQuestions = [
    validQuestion,
    { question: "bye", id: "2" },
    { question: "hello", id: "3" },
    { question: "goodbye", id: "4" },
    { question: "alo", id: "5" },
  ];
  const singleItemQuestions = [
    { question: "hi", id: "1" },
    { question: "bye", id: "2" },
    { question: "hello", id: "3" },
    { question: "goodbye", id: "4" },
    { question: "alo", id: "5" },
  ];
  const noQuestions = [];

  test("Empty list of questions", () => {
    expect(initialQAID(noQuestions) == null);
  });

  test("5 question list with no children", () => {
    expect(initialQAID(singleItemQuestions) == "1");
  });

  test("5 question list with 1 valid", () => {
    expect(initialQAID(validQuestions) == "lol1");
  });
});

//createQA takes a QA item and creates an object in mongo
describe("createQA function testing", () => {
  beforeAll(async () => {
    const uri = process.env.ATLAS_URI;
    await mongoose.connect(uri, { useNewUrlParser: true });
  });
  const emptyQuestion = {};
  const invalidQuestion = { id: "lol1", question: "question" };
  const validQuestion = {
    id: "lol1",
    question: "Hello",
    question_included: false,
    intents: { value: "hi", included: false, children: ["lol"] },
  };
  test("Invalid input: Empty question", () => {
    expect(createQA(emptyQuestion) == false);
  });

  test("Invalid input: incorrect JSON object", () => {
    expect(createQA(invalidQuestion) == false);
  });

  test("Valid input", () => {
    expect(createQA(validQuestion) == true);
  });
  test("Duplicate question answer pair id", () => {
    expect(createQA(validQuestion) == false);
  });
  afterAll(async () => {
    QA.find();
    await QA.deleteOne({ id: { $eq: "lol1" } });
    // Closes the Mongoose connection
    await mongoose.connection.close();
  });
});

//checks item (question answer object) to see if it's valid to be added to mongo
describe("isValidItem function testing", () => {
  const emptyQuestion = {};
  const invalidQuestion = { id: "lol1", question: "question" };
  const validQuestion = {
    id: "lol",
    question: "Hello",
    question_included: false,
    intents: { value: "hi", included: false, children: ["lol"] },
  };
  const validQuestion2 = {
    id: "lol3",
    question: "Hello",
    question_included: false,
    intents: { value: "hi", included: false, children: ["lol"] },
  };
  test("Empty question", () => {
    expect(isValidItem(emptyQuestion) == false);
  });

  test("Incorrect JSON object", () => {
    expect(isValidItem(invalidQuestion) == false);
  });

  test("Duplicate id", () => {
    expect(isValidItem(validQuestion) == false);
  });

  test("Valid question, unique ID", () => {
    expect(isValidItem(validQuestion2) == true);
  });
});
