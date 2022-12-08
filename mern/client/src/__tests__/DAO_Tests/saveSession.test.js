import axios from "axios";
import saveSessionDAO from "../../utils/DAO/saveSessionDAO";

jest.mock("axios");

describe("DAO Tests", () => {
  const DAO = new saveSessionDAO();

  test("Save Flow", async () => {
    const returnVal = { id: "test", name: "test" };
    axios.put.mockResolvedValueOnce(returnVal);

    const res = await DAO.saveFlow({ flow: "flow" }, "123456");

    expect(axios.put).toHaveBeenCalledTimes(1);
    expect(axios.put).toHaveBeenCalledWith(
      `${process.env.REACT_APP_BACKEND_URL}/flow/update/123456`,
      { flow: "flow" }
    );
    expect(res).toEqual(returnVal);
  });
});
