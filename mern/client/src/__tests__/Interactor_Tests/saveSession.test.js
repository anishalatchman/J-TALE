import saveSessionInteractor from "../../utils/Interactor/saveSessionInteractor";

var mockSaveFlow = jest
  .fn()
  .mockReturnValueOnce(
    new Promise((resolve, reject) => resolve({ status: 200, data: "test" }))
  )
  .mockReturnValueOnce(
    new Promise((resolve, reject) => resolve({ status: 400, data: "test" }))
  );

jest.mock("../../utils/DAO/saveSessionDAO", () => {
  return jest.fn().mockImplementation(() => {
    return {
      saveFlow: mockSaveFlow,
    };
  });
});

describe("Save Session Interactor Tests", () => {
  test("Test Save Flow", async () => {
    const Interactor = new saveSessionInteractor();
    const res = await Interactor.saveFlow({ name: "test" }, "1234556");

    expect(res).toEqual(true);
    expect(mockSaveFlow).toHaveBeenCalled();
    expect(mockSaveFlow).toHaveBeenCalledWith({ name: "test" }, "1234556");
  });

  test("Test Save Flow Fail", async () => {
    const Interactor = new saveSessionInteractor();
    const res = await Interactor.saveFlow({ name: "test" }, "1234556");

    expect(res).toEqual(false);
    expect(mockSaveFlow).toHaveBeenCalled();
    expect(mockSaveFlow).toHaveBeenCalledWith({ name: "test" }, "1234556");
  });

  test("Update Current Question", () => {
    const Interactor = new saveSessionInteractor();
    const res = Interactor.updateCurrQuestion(
      { name: "test", current_question: "" },
      { id: "00000000", question: "How are you doing?" }
    );

    expect(res).toEqual({
      name: "test",
      current_question: "00000000",
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
