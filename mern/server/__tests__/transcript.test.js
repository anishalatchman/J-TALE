import Transcript from "../models/transcript.model";
import request from "supertest";
import app from "../server";

// This is a smaller version of the transcript that we will be using for testing
const transcript = {
  name: "test",
  data: [
    [
      {
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
      },
      {
        id: "00000001",
        question: "What size of pizza do you want?",
        question_included: false,
        intents: [
          {
            value: "small",
            included: false,
            children: ["00000111", "00001000", "00011001"],
          },
          {
            value: "medium",
            included: false,
            children: ["00001001", "00001010", "00011010"],
          },
          {
            value: "large",
            included: false,
            children: ["00001011", "00001100", "00011011"],
          },
        ],
      },
    ],
  ],
};

describe("Transcript Tests", () => {
  // Tests to see if uploading a valid transcript gives you correct status and response variables

  test("Valid Transcript Status", async () => {
    const res = await request(app).post("/transcript/add").send(transcript);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(transcript.name);
  });

  test("Transcript Missing Name", async () => {
    const res = await request(app)
      .post("/transcript/add")
      .send({ data: ["testing"] });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual("Missing transcript data");
  });

  test("Transcript Missing Data", async () => {
    const res = await request(app)
      .post("/transcript/add")
      .send({ name: "testing" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual("Missing transcript data");
  });

  test("Invalid Name", async () => {
    const res = await request(app)
      .post("/transcript/add")
      .send({ name: ["test"], data: ["testing"] });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual("Invalid transcript Data");
  });

  test("Existing Transcript", async () => {
    await request(app).post("/transcript/add").send(transcript);

    const res = await request(app).post("/transcript/add").send(transcript);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual("Transcript Exists");
  });

  test("No Transcript Exists", async () => {
    const res = await request(app).get("/transcript/testing");

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual("Transcript Not Found");
  });

  test("Get by ID", async () => {
    const response = await request(app)
      .post("/transcript/add")
      .send(transcript);

    const res = await request(app).get(`/transcript/${response.body.id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body._id).toEqual(response.body.id);
  });

  test("Updating Transcript", async () => {
    const response = await request(app)
      .post("/transcript/add")
      .send(transcript);

    const res = await request(app)
      .put(`/transcript/update/${response.body.id}`)
      .send(transcript);

    expect(res.statusCode).toBe(200);
    expect(res.id).toEqual(response.id);
  });

  test("Invalid Update Missing Name", async () => {
    const response = await request(app)
      .post("/transcript/add")
      .send(transcript);

    const res = await request(app)
      .put(`/transcript/update/${response.body.id}`)
      .send({ data: ["testing"] });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual("Missing transcript data");
  });

  test("Invalid Update Missing Data", async () => {
    const response = await request(app)
      .post("/transcript/add")
      .send(transcript);

    const res = await request(app)
      .put(`/transcript/update/${response.body.id}`)
      .send({ name: "testing" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual("Missing transcript data");
  });

  afterEach(async () => {
    Transcript.find();
    await Transcript.deleteOne({ name: transcript.name });
  });
});
