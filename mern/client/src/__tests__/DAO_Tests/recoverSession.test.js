import recoverSessionDAO from "../../utils/DAO/recoverSessionDAO";
import axios from "axios";

jest.mock("axios");

describe("Recover Session DAO Test", () => {
  const DAO = new recoverSessionDAO();

  test("Get Flow By Session ID", async () => {
    axios.get.mockResolvedValueOnce({
      id: "00000000",
      name: "test",
    });

    const res = await DAO.getFlowBySessionID("00000000");

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/flow/00000000`
    );
    expect(res).toEqual({
      id: "00000000",
      name: "test",
    });
  });

  test("Recover Flow", async () => {
    const QA = {
      id: "00000000",
      question: "How are you doing?",
      question_included: false,
      intents: [{ value: "test1", included: false, children: ["00000001"] }],
    };

    axios.get.mockResolvedValueOnce(QA);
    const res = await DAO.getQAFromID("00000000");

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/qa/`,
      {
        params: { id: "00000000" },
      }
    );
    expect(res).toEqual(QA);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
