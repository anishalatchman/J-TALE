import axios from "axios";
import deleteSessionDAO from "../../utils/DAO/deleteSessionDAO";

jest.mock("axios");

describe("DAO Tests Delete Session", () => {
  const DAO = new deleteSessionDAO();

  test("Remove Flow", async () => {
    const resVal = { name: "Test" };
    axios.delete.mockResolvedValueOnce(resVal);

    const res = await DAO.removeFlow("123456");

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/flow/delete/123456`
    );
    expect(res).toEqual(resVal);
  });

  test("Remove Transcript", async () => {
    const resVal = { name: "Test" };
    axios.delete.mockResolvedValueOnce(resVal);

    const res = await DAO.removeTranscript("123456");

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/transcript/delete/123456`
    );
    expect(res).toEqual(resVal);
  });

  test("Delete QA", async () => {
    axios.delete.mockResolvedValueOnce("00000000");

    const res = await DAO.deleteqa("00000000");

    expect(axios.delete).toHaveBeenCalledTimes(1);
    expect(axios.delete).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/qa/delete`,
      { data: { id: "00000000" } }
    );
    expect(res).toEqual("00000000");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
});
