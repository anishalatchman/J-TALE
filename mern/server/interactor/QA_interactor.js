import QA from "../DAO/QA_dao.js";

export function getQA(req) {
  return QA.getQA(req);
}

export function createQA(req) {
  return QA.createQA(req);
}

export function updateQA(req) {
  return QA.updateQA(req);
}

export function deleteQA(req) {
  return QA.deleteQA(req);
}
