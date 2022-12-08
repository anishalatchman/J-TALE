import deleteSessionInteractor from "../../utils/Interactor/deleteSessionInteractor";

var mockDeleteQA = jest
  .fn()
  .mockResolvedValueOnce(new Promise((resolve, reject) => resolve(true)))
  .mockRejectedValueOnce(new Error("Fail"))
  .mockResolvedValueOnce(new Promise((resolve, reject) => resolve(true)))
  .mockRejectedValueOnce(new Error("Fail"));

var mockRemoveFlow = jest
  .fn()
  .mockReturnValueOnce(
    new Promise((resolve, reject) => resolve({ status: 200, id: "test" }))
  )
  .mockReturnValueOnce(
    new Promise((resolve, reject) => resolve({ status: 400, id: "test" }))
  );

var mockRemoveTranscript = jest
  .fn()
  .mockReturnValueOnce(
    new Promise((resolve, reject) => resolve({ status: 200, id: "test" }))
  )
  .mockReturnValueOnce(
    new Promise((resolve, reject) => resolve({ status: 400, id: "test" }))
  );

jest.mock("../../utils/DAO/deleteSessionDAO", () => {
  return jest.fn().mockImplementation(() => {
    return {
      deleteqa: mockDeleteQA,
      removeFlow: mockRemoveFlow,
      removeTranscript: mockRemoveTranscript,
    };
  });
});

describe("Delete Session Interactor Tests", () => {
  test("Test Remove QA", async () => {
    const Interactor = new deleteSessionInteractor();
    const res = await Interactor.removeQAs({ allQuestions: ["00000000"] });

    expect(res).toEqual(true);
    expect(mockDeleteQA).toHaveBeenCalled();
    expect(mockDeleteQA).toHaveBeenCalledWith("00000000");
  });

  test("Test Remove QA Fail", async () => {
    const Interactor = new deleteSessionInteractor();
    const res = await Interactor.removeQAs({ allQuestions: ["00000000"] });

    expect(res).toEqual(false);
  });

  test("Test QA Deleted", async () => {
    const Interactor = new deleteSessionInteractor();
    const res = await Interactor.qaDeleted({ allQuestions: ["00000000"] });

    expect(res).toEqual(true);
    expect(mockDeleteQA).toHaveBeenCalled();
    expect(mockDeleteQA).toHaveBeenCalledWith("00000000");
  });

  test("Test QA Deleted", async () => {
    const Interactor = new deleteSessionInteractor();
    const res = await Interactor.qaDeleted({ allQuestions: ["00000000"] });

    expect(res).toEqual(false);
    expect(mockDeleteQA).toHaveBeenCalled();
    expect(mockDeleteQA).toHaveBeenCalledWith("00000000");
  });

  test("Test Flow Deleted", async () => {
    const Interactor = new deleteSessionInteractor();
    const res = await Interactor.flowDeleted("test");

    expect(res).toEqual(true);
    expect(mockRemoveFlow).toHaveBeenCalled();
    expect(mockRemoveFlow).toHaveBeenCalledWith("test");
  });

  test("Test Flow Deleted Fail", async () => {
    const Interactor = new deleteSessionInteractor();
    const res = await Interactor.flowDeleted("test");

    expect(res).toEqual(false);
    expect(mockRemoveFlow).toHaveBeenCalled();
    expect(mockRemoveFlow).toHaveBeenCalledWith("test");
  });

  test("Test Transcript Deleted", async () => {
    const Interactor = new deleteSessionInteractor();
    const res = await Interactor.transcriptDeleted("test");

    expect(res).toEqual(true);
    expect(mockRemoveTranscript).toHaveBeenCalled();
    expect(mockRemoveTranscript).toHaveBeenCalledWith("test");
  });

  test("Test Transcript Deleted Fail", async () => {
    const Interactor = new deleteSessionInteractor();
    const res = await Interactor.transcriptDeleted("test");

    expect(res).toEqual(false);
    expect(mockRemoveTranscript).toHaveBeenCalled();
    expect(mockRemoveTranscript).toHaveBeenCalledWith("test");
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
