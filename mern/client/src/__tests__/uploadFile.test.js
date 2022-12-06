// These set of tests apply to the upload transcript use case
import axios from "axios";
import uploadFile from "../utils/DAO/uploadFileDAO";

jest.mock("axios");

describe("DAO Tests", () => {
  const DAO = new uploadFile();

  test("Upload File", async () => {
    const returnFile = { data: { id: "00000000" } };
    axios.post.mockResolvedValueOnce(returnFile);
    const res = await DAO.uploadFile({ name: "test", data: "test" });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/transcript/add`,
      { name: "test", data: "test" }
    );
    expect(res).toEqual(returnFile.data.id);
  });

  test("Delete File", async () => {
    const fileReturn = {
      data: { id: "00000000", name: "Testing" },
      status: 200,
    };

    axios.delete.mockResolvedValueOnce(fileReturn);
    const res = await DAO.deleteFile("00000000");

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/transcript/delete/` + "00000000"
    );
    expect(res).toEqual(true);
  });

  test("Create QA", async () => {
    const question = "How are you doing?";

    axios.post.mockResolvedValueOnce("00000000");

    const res = await DAO.createQA(question);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/qa/add`,
      question
    );
    expect(res).toEqual("00000000");
  });

  test("Get QA by ID Success", async () => {
    const QA = {
      data: {
        id: "00000000",
        question: "How are you doing?",
        question_included: false,
        intents: [{ value: "test1", included: false, children: ["00000001"] }],
      },
      status: "200",
    };

    axios.get.mockResolvedValueOnce(QA);
    const res = await DAO.getQAByID("00000000");

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/qa/`,
      { params: { id: "00000000" } }
    );
    expect(res).toEqual(QA);
  });

  test("Delete QA", async () => {
    axios.delete.mockResolvedValueOnce("00000000");
    const res = await DAO.deleteqa("00000000");

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/qa/delete`,
      {
        data: { id: "00000000" },
      }
    );
    expect(res).toEqual("00000000");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});

describe("Interactor Tests", () => {});
