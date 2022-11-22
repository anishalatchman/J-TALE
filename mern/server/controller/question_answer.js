import QA from "../models/question_answer.js";
import asyncHandler from "express-async-handler";

export const getQA = asyncHandler(async (req, res) => {
  val = QA.getQA(req);
  res.status(val[0]).json(val[1]);
});

export const createQA = asyncHandler(async (req, res) => {
  val = QA.createQA(req);
  res.status(val[0]).json(val[1]);
});

export const updateQA = asyncHandler(async (req, res) => {
  val = QA.updateQA(req);
  res.status(val[0]).json(val[1]);
});

export const deleteQA = asyncHandler(async (req, res) => {
  val = QA.deleteQA(req);
  res.status(val[0]).json(val[1]);
});
