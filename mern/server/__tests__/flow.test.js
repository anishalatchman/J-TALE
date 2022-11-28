import Flow from "../models/flow.model";
import request from "supertest";
import app from "../server";

const flow = {
  name: "Testing",
  questions: ["00000000", "00000001"],
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
        questions: ["Testing"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Missing Input Field");
  });

  test("Invalid Name", async () => {
    const res = await request(app)
      .post("/flow/add")
      .send({
        name: 1234,
        questions: ["testing"],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Invalid Input Field");
  });

  test("Invalid Questions", async () => {
    const res = await request(app)
      .post("/flow/add")
      .send({
        name: "test",
        questions: [1234],
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
        current_question: "00000000",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Missing Input Field");
  });

  test("Invalid Update Missing Questions", async () => {
    const response = await request(app).post("/flow/add").send(flow);
    const res = await request(app)
      .put(`/flow/update/${response.body._id}`)
      .send({
        name: "test",
        current_question: "00000000",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toBe("Missing Input Field");
  });

  afterEach(async () => {
    Flow.find();
    await Flow.deleteOne({ name: flow.name });
  });
});
