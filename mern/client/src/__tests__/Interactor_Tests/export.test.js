import exportInteractor from "../../utils/Interactor/exportInteractor";

describe("Export Interactor Test", () => {
  test("Test Get Flow Data Included", () => {
    const Interactor = new exportInteractor();
    const res = Interactor.getFlowData([
      {
        id: "00000000",
        question_included: true,
        intents: [{ id: "test", included: true }],
      },
    ]);

    expect(res).toEqual([
      {
        id: "00000000",
        question_included: true,
        intents: [{ id: "test", included: true }],
      },
    ]);
  });

  test("Test Get Flow Data Excluded", () => {
    const Interactor = new exportInteractor();
    const res = Interactor.getFlowData([
      { id: "00000000", question_included: false },
    ]);

    expect(res).toEqual([]);
  });

  test("Test Sort QA", () => {
    const Interactor = new exportInteractor();
    const res = Interactor.sortQA({
      id: "00000000",
      intents: [
        { id: "test", included: true },
        { id: "test1", included: false },
      ],
    });

    expect(res).toEqual({
      id: "00000000",
      intents: [{ id: "test", included: true }],
    });
  });
});
