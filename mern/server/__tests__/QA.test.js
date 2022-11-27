import QA from "../models/question_answer";
import request from "supertest";
import app from "../server";

const qa = {
  id: "00000000",
  question: "What kind of pizza do you want to order?",
  question_included: false,
  intents: [
    {
      value: "cheese",
      included: false,
      children: ["00000001", "00000010"],
    },
    {
      value: "pepperoni",
      included: false,
      children: ["00000011", "00000100"],
    },
    {
      value: "hawaiian",
      included: false,
      children: ["00000101", "00000110"],
    },
  ],
};

describe("QA Tests", () => {
  test("Valid QA", async () => {
    const res = await request(app).post("/qa/add").send(qa);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBe(qa.id);
  });

  test("QA Missing id Field", async () => {
    const res = await request(app)
      .post("/qa/add")
      .send({
        question: "Test",
        question_included: false,
        intents: ["Testing"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual("Missing Input Field");
  });

  test("QA Missing Question Field", async () => {
    const res = await request(app)
      .post("/qa/add")
      .send({
        id: "00000000",
        question_included: false,
        intents: ["Testing"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual("Missing Input Field");
  });

  test("QA Missing Included Question Field", async () => {
    const res = await request(app)
      .post("/qa/add")
      .send({
        id: "00000000",
        question: "Test",
        intents: ["Testing"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual("Missing Input Field");
  });

  test("Invalid ID", async () => {
    const res = await request(app)
      .post("/qa/add")
      .send({
        id: 1234,
        question: "Test",
        question_included: false,
        intents: ["Testing"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Invalid QA Data");
  });

  test("Invalid Question", async () => {
    const res = await request(app)
      .post("/qa/add")
      .send({
        id: "test",
        question: 1234,
        question_included: false,
        intents: ["Testing"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Invalid QA Data");
  });

  test("Invalid Question Included Type", async () => {
    const res = await request(app)
      .post("/qa/add")
      .send({
        id: "Test",
        question: "Test",
        question_included: 1234,
        intents: ["Testing"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Invalid QA Data");
  });

  test("Invalid Intents", async () => {
    const res = await request(app)
      .post("/qa/add")
      .send({
        id: 1234,
        question: "Test",
        question_included: false,
        intents: ["Testing"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Invalid QA Data");
  });

  test("Existing QA", async () => {
    await request(app).post("/qa/add").send(qa);

    const res = await request(app).post("/qa/add").send(qa);

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("QA Exists");
  });

  test("Repeated ID", async () => {
    await request(app).post("/qa/add").send(qa);

    const res = await request(app)
      .post("/qa/add")
      .send({
        id: "00000000",
        question: "Test",
        question_included: false,
        intents: ["Testing"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("QA Exists");
  });

  test("No ID Exists", async () => {
    const res = await request(app)
      .get("/qa/")
      .send({
        id: "00000100",
        question: "Test",
        question_included: false,
        intents: ["Testing"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("No Qa Exists");
  });

  test("Get by ID", async () => {
    await request(app).post("/qa/add").send(qa);
    const res = await request(app).get("/qa/").send({
      id: "00000000",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(qa.id);
  });

  test("Update QA", async () => {
    await request(app).post("/qa/add").send(qa);
    const res = await request(app).put("/qa/update").send(qa);

    expect(res.statusCode).toBe(200);
    expect(res.body).toBe(qa.id);
  });

  test("Invalid Update Missing id", async () => {
    await request(app).post("/qa/add").send(qa);

    const res = await request(app)
      .put("/qa/update")
      .send({
        question: "Test",
        question_included: false,
        intents: ["Testing"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Missing Input Field");
  });

  test("Invalid Update Missing Question", async () => {
    await request(app).post("/qa/add").send(qa);
    const res = await request(app)
      .put("/qa/update")
      .send({
        id: "00000100",
        question_included: false,
        intents: ["Testing"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Missing Input Field");
  });

  test("Invalid Update Missing Question Included", async () => {
    await request(app).post("/qa/add").send(qa);
    const res = await request(app)
      .put("/qa/update")
      .send({
        id: "00000100",
        question: "Test",
        intents: ["Testing"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Missing Input Field");
  });

  afterEach(async () => {
    QA.find();
    await QA.deleteOne({ id: qa.id });
  });
});
