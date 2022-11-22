import QA_Interactor from "../interactor/QA_interactor";
import asyncHandler from "express-async-handler";

//Controllers for REST APIs for the QA entity

//Gets QA by ID
export const getQA = asyncHandler(async (req, res) => {
  QA_Interactor.getQA(req, res);
});

//Creates a new QA from a QA object
export const createQA = asyncHandler(async (req, res) => {
  QA_Interactor.createQA(req, res);
});

//Updates an existing QA with a new QA object
export const updateQA = asyncHandler(async (req, res) => {
  QA_Interactor.updateQA(req, res);
});

//Deletes QA by ID
export const deleteQA = asyncHandler(async (req, res) => {
  QA_Interactor.deleteQA(req, res);
});
