import Flow from "../models/flow.model";
import request from "supertest";
import app from "../server";

const flow = {
  name: "Testing",
  questions: ["00000000", "00000001"],
  allQuestions: ["00000000", "00000001", "00000010", "00000011"],
  transcriptID: "551137c2f9e1fac808a5f572",
};

describe("Flow Tests", () => {
  test("Valid Flow", async () => {
    const res = await request(app).post("/flow/add").send(flow);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(flow.name);
  });

  test("Flow Missing Name", async () => {
    const res = await request(app)
      .post("/flow/add")
      .send({
        questions: ["00000000", "00000001"],
        allQuestions: ["00000000", "00000001", "00000010", "00000011"],
        transcriptID: "551137c2f9e1fac808a5f572",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Missing Input Field");
  });

  test("Flow Missing Starting Questions", async () => {
    const res = await request(app)
      .post("/flow/add")
      .send({
        name: "Testing",
        allQuestions: ["00000000", "00000001", "00000010", "00000011"],
        transcriptID: "551137c2f9e1fac808a5f572",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Missing Input Field");
  });

  test("Flow Missing All Questions", async () => {
    const res = await request(app)
      .post("/flow/add")
      .send({
        name: "Testing",
        questions: ["00000000", "00000001"],
        transcriptID: "551137c2f9e1fac808a5f572",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Missing Input Field");
  });

  test("Flow Missing Transcript ID", async () => {
    const res = await request(app)
      .post("/flow/add")
      .send({
        name: "Testing",
        questions: ["00000000", "00000001"],
        allQuestions: ["00000000", "00000001", "00000010", "00000011"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Missing Input Field");
  });

  test("Invalid Name", async () => {
    const res = await request(app)
      .post("/flow/add")
      .send({
        name: 1234,
        questions: ["00000000", "00000001"],
        allQuestions: ["00000000", "00000001", "00000010", "00000011"],
        transcriptID: "551137c2f9e1fac808a5f572",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Invalid Input Field");
  });

  test("Invalid Starting Questions", async () => {
    const res = await request(app)
      .post("/flow/add")
      .send({
        name: "Testing",
        questions: [1234],
        allQuestions: ["00000000", "00000001", "00000010", "00000011"],
        transcriptID: "551137c2f9e1fac808a5f572",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Invalid Input Field");
  });

  test("Invalid Questions List", async () => {
    const res = await request(app)
      .post("/flow/add")
      .send({
        name: "Testing",
        questions: ["00000000", "00000001"],
        allQuestions: [1234],
        transcriptID: "551137c2f9e1fac808a5f572",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Invalid Input Field");
  });

  test("Invalid TranscriptID", async () => {
    const res = await request(app)
      .post("/flow/add")
      .send({
        name: "Testing",
        questions: ["00000000", "00000001"],
        allQuestions: ["00000000", "00000001", "00000010", "00000011"],
        transcriptID: 1234,
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Invalid Input Field");
  });

  test("Existing Flow", async () => {
    await request(app).post("/flow/add").send(flow);

    const res = await request(app).post("/flow/add").send(flow);

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Flow Exists");
  });

  test("No Flow Exists", async () => {
    const res = await request(app).get("/flow/testing");

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("No Flow Exists");
  });

  test("Get by ID", async () => {
    const response = await request(app).post("/flow/add").send(flow);

    const res = await request(app).get(`/flow/${response.body._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(response.body._id);
  });

  test("Updating Flow", async () => {
    const response = await request(app).post("/flow/add").send(flow);

    const res = await request(app)
      .put(`/flow/update/${response.body._id}`)
      .send({
        name: "Testing",
        questions: ["00000000", "00000001"],
        current_question: "00000000",
        allQuestions: ["00000000", "00000001", "00000010", "00000011"],
        transcriptID: "551137c2f9e1fac808a5f572",
        speechList: [{ test: "testing" }],
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(response.body._id);
    expect(res.body.name).toBe(flow.name);
  });

  test("Invalid Update Missing Name", async () => {
    const response = await request(app).post("/flow/add").send(flow);
    const res = await request(app)
      .put(`/flow/update/${response.body._id}`)
      .send({
        questions: ["00000000", "00000001"],
        allQuestions: ["00000000", "00000001", "00000010", "00000011"],
        transcriptID: "551137c2f9e1fac808a5f572",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Missing Input Field");
  });

  test("Invalid Update Missing Starting Questions", async () => {
    const response = await request(app).post("/flow/add").send(flow);
    const res = await request(app)
      .put(`/flow/update/${response.body._id}`)
      .send({
        name: "Testing",
        allQuestions: ["00000000", "00000001", "00000010", "00000011"],
        transcriptID: "551137c2f9e1fac808a5f572",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Missing Input Field");
  });

  test("Invalid Update Missing All Questions", async () => {
    const response = await request(app).post("/flow/add").send(flow);
    const res = await request(app)
      .put(`/flow/update/${response.body._id}`)
      .send({
        name: "Testing",
        questions: ["00000000", "00000001"],
        transcriptID: "551137c2f9e1fac808a5f572",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Missing Input Field");
  });

  test("Invalid Update Missing TranscriptID", async () => {
    const response = await request(app).post("/flow/add").send(flow);
    const res = await request(app)
      .put(`/flow/update/${response.body._id}`)
      .send({
        name: "Testing",
        questions: ["00000000", "00000001"],
        allQuestions: ["00000000", "00000001", "00000010", "00000011"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Missing Input Field");
  });

  afterEach(async () => {
    Flow.find();
    await Flow.deleteOne({ name: flow.name });
  });
});
