import axios from "axios";
import selectIntentDAO from "../../utils/DAO/selectIntentDAO";

jest.mock("axios");

describe("DAO Tests", () => {
  const DAO = new selectIntentDAO();

  test("Upload File", async () => {
    const QA = {
      id: "00000000",
      question: "How are you doing?",
      question_included: false,
      intents: [{ value: "test1", included: false, children: ["00000001"] }],
    };

    const returnFile = "00000000";
    axios.put.mockResolvedValueOnce(returnFile);

    const res = await DAO.updateQA(QA);

    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/qa/update`,
      QA
    );
    expect(res).toEqual(returnFile);
  });
});
