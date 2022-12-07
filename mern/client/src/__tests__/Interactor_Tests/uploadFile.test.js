import uploadFileInteractor from "../../utils/Interactor/uploadFileInteractor";

var mockDeleteFile = jest.fn().mockResolvedValueOnce(true);

var mockUploadFile = jest
  .fn()
  .mockResolvedValueOnce({ data: { id: "00000000" } });

var mockDeleteQA = jest
  .fn()
  .mockResolvedValueOnce("00000000")
  .mockReturnValueOnce(new Promise((resolve, reject) => resolve(true)));

var mockGetQAByID = jest
  .fn()
  .mockReturnValueOnce(
    new Promise((resolve, reject) => resolve({ status: 200, data: "test" }))
  );

var mockCreateQA = jest
  .fn()
  .mockReturnValueOnce({ id: "00000000" })
  .mockResolvedValueOnce({ id: "00000001" })
  .mockResolvedValueOnce({ id: "00000010" });

jest.mock("../../utils/DAO/uploadFileDAO", () => {
  return jest.fn().mockImplementation(() => {
    return {
      uploadFile: mockUploadFile,
      deleteqa: mockDeleteQA,
      deleteFile: mockDeleteFile,
      qaDeleted: mockDeleteFile,
      getQAByID: mockGetQAByID,
      createQA: mockCreateQA,
    };
  });
});

describe("Upload File Interactor Tests", () => {
  test("Test Upload File", async () => {
    const Interactor = new uploadFileInteractor();
    const res = await Interactor.uploadFile({ name: "test" });

    expect(res).toEqual({ data: { id: "00000000" } });
    expect(mockUploadFile).toHaveBeenCalled();
    expect(mockUploadFile).toHaveBeenCalledWith({ name: "test" });
  });

  test("Test Delete File", async () => {
    const Interactor = new uploadFileInteractor();
    const res = await Interactor.deleteFile("00000000");

    expect(res).toEqual(true);
    expect(mockDeleteFile).toHaveBeenCalled();
    expect(mockDeleteFile).toHaveBeenCalledWith("00000000");
  });

  test("Test Remove QAs", async () => {
    const Interactor = new uploadFileInteractor();
    const res = await Interactor.removeQAs(["00000000"]);

    expect(res).toEqual(true);
    expect(mockDeleteQA).toHaveBeenCalled();
    expect(mockDeleteQA).toHaveBeenCalledWith("00000000");
  });

  test("Test QA Deleted", async () => {
    const Interactor = new uploadFileInteractor();
    const res = await Interactor.qaDeleted(["00000000"]);

    expect(res).toEqual(true);
    expect(mockDeleteQA).toHaveBeenCalled();
    expect(mockDeleteQA).toHaveBeenCalledWith("00000000");
  });

  test("Test Get QA List", async () => {
    const Interactor = new uploadFileInteractor();
    const res = await Interactor.getQAList(["00000000"]);

    expect(res).toEqual(["test"]);
    expect(mockGetQAByID).toHaveBeenCalled();
    expect(mockGetQAByID).toHaveBeenCalledWith("00000000");
  });

  test("Reset All Questions ", () => {
    const Interactor = new uploadFileInteractor();
    Interactor.resetAllQuestions(["00000000"]);

    expect(Interactor.allQuestionList).toEqual([]);
  });

  test("Test Initial QA ID Empty", () => {
    const Interactor = new uploadFileInteractor();
    const res = Interactor.initialQAID([]);

    expect(res).toEqual(null);
  });

  test("Test Initial QA ID Non-Empty", () => {
    const Interactor = new uploadFileInteractor();
    const res = Interactor.initialQAID([
      { id: "00000000" },
      { id: "00000001" },
    ]);

    expect(res).toEqual("00000000");
  });

  test("Question Loop", async () => {
    const Interactor = new uploadFileInteractor();
    await Interactor.questionLoop([
      { id: "00000000", question: "How are you doing?" },
    ]);

    expect(mockCreateQA).toHaveBeenCalled();
    expect(mockCreateQA).toHaveBeenCalledWith({
      id: "00000000",
      question: "How are you doing?",
    });
    expect(Interactor.allQuestionList).toEqual(["00000000"]);

    mockCreateQA.mockClear();
  });

  test("Parse", async () => {
    const Interactor = new uploadFileInteractor();
    const res = await Interactor.parse([
      [{ id: "00000001", question: "How are you doing?" }],
      [{ id: "00000010", question: "Why are you still awake?" }],
    ]);

    expect(res).toEqual({
      startingList: ["00000001", "00000010"],
      allQuestionList: ["00000001", "00000010"],
    });
    expect(mockCreateQA).toHaveBeenCalled();
    expect(mockCreateQA).toHaveBeenCalledTimes(2);
    expect(mockCreateQA).toHaveBeenCalledWith({
      id: "00000001",
      question: "How are you doing?",
    });
    expect(mockCreateQA).toHaveBeenCalledWith({
      id: "00000010",
      question: "Why are you still awake?",
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
