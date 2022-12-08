import recoverSessionInteractor from "../../utils/Interactor/recoverSessionInteractor";

var mockGetFlow = jest
  .fn()
  .mockReturnValueOnce(
    new Promise((resolve, reject) => {
      resolve({ status: 200, data: { id: "00000000", name: "test" } });
    })
  )
  .mockReturnValueOnce(
    new Promise((resolve, reject) => {
      resolve({ status: 400, data: { id: "00000000", name: "test" } });
    })
  );
var mockGetQA = jest
  .fn()
  .mockReturnValueOnce(
    new Promise((resolve, reject) => {
      resolve({
        status: 200,
        data: { id: "00000000", question: "How are you doing?" },
      });
    })
  )
  .mockReturnValueOnce(
    new Promise((resolve, reject) => {
      resolve({
        status: 400,
        data: { id: "00000000", question: "How are you doing?" },
      });
    })
  );

jest.mock("../../utils/DAO/recoverSessionDAO", () => {
  return jest.fn().mockImplementation(() => {
    return {
      getFlowBySessionID: mockGetFlow,
      getQAFromID: mockGetQA,
    };
  });
});

describe("Recover Session Interactor Tests", () => {
  test("Test Get Flow", async () => {
    const Interactor = new recoverSessionInteractor();
    const res = await Interactor.getFlow("00000000");

    expect(res).toEqual({ id: "00000000", name: "test" });
    expect(mockGetFlow).toHaveBeenCalled();
    expect(mockGetFlow).toHaveBeenCalledWith("00000000");
  });

  test("Test Get Flow Fail", async () => {
    const Interactor = new recoverSessionInteractor();
    const res = await Interactor.getFlow("00000000");

    expect(res).toEqual(false);
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

  test("Test Get QA", async () => {
    const Interactor = new recoverSessionInteractor();
    const res = await Interactor.getQA({
      name: "test",
      current_question: "00000000",
    });

    expect(res).toEqual({ id: "00000000", question: "How are you doing?" });
    expect(mockGetQA).toHaveBeenCalled();
    expect(mockGetQA).toHaveBeenCalledWith("00000000");
  });

  test("Test Get QA Fail", async () => {
    const Interactor = new recoverSessionInteractor();
    const res = await Interactor.getQA({
      name: "test",
      current_question: "00000000",
    });

    expect(res).toEqual(false);
    expect(mockGetQA).toHaveBeenCalled();
    expect(mockGetQA).toHaveBeenCalledWith("00000000");
  });

  test("Test Get QA No Session ID", async () => {
    const Interactor = new recoverSessionInteractor();
    const res = await Interactor.getQA({
      name: "test",
    });

    expect(res).toEqual(false);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
