import createFlowInteractor from "../../utils/Interactor/createFlowInteractor";

var mockUploadFlow = jest.fn().mockResolvedValueOnce({ id: "test" });

jest.mock("../../utils/DAO/createFlowDAO", () => {
  return jest.fn().mockImplementation(() => {
    return {
      uploadFlow: mockUploadFlow,
    };
  });
});

describe("Create Flow Interactor Test", () => {
  test("Test Flow Upload", async () => {
    const Interactor = new createFlowInteractor();
    const res = await Interactor.flowUploader({ name: "test" });

    expect(res).toEqual({ id: "test" });
    expect(mockUploadFlow).toHaveBeenCalled();
    expect(mockUploadFlow).toHaveBeenCalledWith({ name: "test" });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
