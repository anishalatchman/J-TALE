import { parse, createQAs } from "../utils/parse";

// describe("Parse function testing", () => {
//   const integerNumbers = [-10, -1, 0, 1, 10];

//   test.each(integerNumbers)("passes for integer value %j", (fixture) =>
//     expect(isInteger(fixture)).toBe(true)
//   );

//   const floatNumbers = [-10.1, -1.1, 0.1, 1.1, 10.1];

//   test.each(floatNumbers)("fails for non-integer value %j", (fixture) =>
//     expect(isInteger(fixture)).toBe(false)
//   );
// });

describe("createQAs function testing", () => {
  const singleItemQuestions = [
    { question: "hi", id: "1" },
    { question: "bye", id: "2" },
    { question: "hello", id: "3" },
    { question: "goodbye", id: "4" },
    { question: "alo", id: "5" },
  ];
  const noQuestions = [];
  test("Empty list of questions", () => {
    expect(createQAs(noQuestions) == null);
  });

  test("5 question list with no children", () => {
    expect(createQAs(singleItemQuestions) == "1");
  });
  //   const integerNumbers = [-10, -1, 0, 1, 10];
  //   test.each(integerNumbers)("passes for integer value %j", (fixture) =>
  //     expect(isInteger(fixture)).toBe(true)
  //   );
  //   const floatNumbers = [-10.1, -1.1, 0.1, 1.1, 10.1];
  //   test.each(floatNumbers)("fails for non-integer value %j", (fixture) =>
  //     expect(isInteger(fixture)).toBe(false)
  //   );
});
