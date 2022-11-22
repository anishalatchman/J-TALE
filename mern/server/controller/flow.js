import FlowInteractor from "../interactor/flow_interactor.js";
import asyncHandler from "express-async-handler";

//Controllers for REST APIs for the Flow entity

//Controller for get request
export const getFlow = asyncHandler(async (req, res) => {
  FlowInteractor.getFlow(req, res);
});

//Controller for create request
export const createFlow = asyncHandler(async (req, res) => {
  FlowInteractor.createFlow(req, res);
});

//Controller for update request
export const updateFlow = asyncHandler(async (req, res) => {
  FlowInteractor.updateFlow(req, res);
});

//Controller for delete request
export const deleteFlow = asyncHandler(async (req, res) => {
  FlowInteractor.deleteFlow(req, res);
});
