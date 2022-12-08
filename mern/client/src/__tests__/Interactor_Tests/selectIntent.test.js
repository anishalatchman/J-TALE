import selectIntentInteractor from "../../utils/Interactor/selectIntentInteractor";

var mockUpdateQA = jest
  .fn()
  .mockResolvedValueOnce({ id: "00000000", question_included: true });

jest.mock("../../utils/DAO/selectIntentDAO", () => {
  return jest.fn().mockImplementation(() => {
    return {
      updateQA: mockUpdateQA,
    };
  });
});

describe("Select Intent Interactor Tests", () => {
  test("Test update QA", async () => {
    const Interactor = new selectIntentInteractor();
    const res = await Interactor.updateQA({ id: " 00000000" });

    expect(res).toEqual({ id: "00000000", question_included: true });
    expect(mockUpdateQA).toHaveBeenCalled();
    expect(mockUpdateQA).toHaveBeenCalledWith({ id: " 00000000" });
  });
});
