import recoverSessionInteractor from "../../utils/Interactor/recoverSessionInteractor";

var mockGetFlow = jest
  .fn()
  .mockReturnValueOnce({ id: "00000000", name: "test" });
var mockGetQA = jest
  .fn()
  .mockReturnValueOnce({ id: "00000000", question: "How are you doing?" });

jest.mock("../../utils/DAO/recoverSessionDAO", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getFlowBySessionID: mockGetFlow,
      getQAFromID: mockGetQA,
    };
  });
});

describe("Recover Session Interactor Tests", () => {
  test("Test Send Flow", async () => {
    const Interactor = new recoverSessionInteractor();
    const res = await Interactor.getFlow({
      name: "test",
      current_question: "00000000",
    });

    expect(res).toEqual({ id: "00000000", name: "test" });
    expect(mockGetFlow).toHaveBeenCalled();
    expect(mockGetFlow).toHaveBeenCalledWith("00000000");
  });

  test("Test Get QA ID", () => {
    const Interactor = new recoverSessionInteractor();
    const res = Interactor.getQAIDFromFlow({
      name: "test",
      current_question: "00000000",
    });

    expect(res).toEqual("00000000");
  });

  test("Test SendQA", async () => {
    const Interactor = new recoverSessionInteractor();
    const res = await Interactor.getQA("00000000");

    expect(res).toEqual({ id: "00000000", question: "How are you doing?" });
    expect(mockGetQA).toHaveBeenCalled();
    expect(mockGetQA).toHaveBeenCalledWith("00000000");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
