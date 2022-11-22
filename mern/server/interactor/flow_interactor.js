import Flow from "../DAO/flow_dao.js";
import parse from "../utils/parse.js";

export function getFlow(req) {
  return Flow.getFlow(req);
}

export function createFlow(req) {
  const transcript = req.body.transcript;

  const name = req.body.name;
  const questions = parse(transcript);

  const request = { name: name, questions: questions };
  return Flow.createFlow(request);
}

export function updateFlow(req) {
  return Flow.updateFlow(req);
}

export function deleteFlow(req) {
  return Flow.deleteFlow(req);
}
