import axios from "axios";
import createFlowDAO from "../../utils/DAO/createFlowDAO";

jest.mock("axios");

describe("DAO Test Create Flow", () => {
  const DAO = new createFlowDAO();

  test("uploadFlow", async () => {
    const resVal = { name: "test" };
    axios.post.mockResolvedValueOnce(resVal);

    const res = await DAO.uploadFlow({ test: "test" });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/flow/add`,
      {
        test: "test",
      }
    );
    expect(res).toEqual({ status: true, res: resVal });
  });
});
