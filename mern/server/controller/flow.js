import Flow from "../interactor/flow_interactor.js";
import asyncHandler from "express-async-handler";

export const getFlow = asyncHandler(async (req, res) => {
  val = Flow.getFlow(req);
  res.status(val[0]).json(val[1]);
});

export const createFlow = asyncHandler(async (req, res) => {
  val = Flow.createFlow(req);
  res.status(val[0]).json(val[1]);
});

export const updateFlow = asyncHandler(async (req, res) => {
  val = Flow.updateFlow(req);
  res.status(val[0]).json(val[1]);
});

export const deleteFlow = asyncHandler(async (req, res) => {
  val = Flow.deleteFlow(req);
  res.status(val[0]).json(val[1]);
});
