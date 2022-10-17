const router = require("express").Router();
let Transcript = require("../collections/transcript.model");
const axios = require("axios");
const fetch = require("fetch");
const { request } = require("express");
require("dotenv").config();

router.route("/").get((req, res) => {
  Transcript.find()
    .then((transcripts) => res.json(transcripts))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const VOICEFLOW_API_KEY = process.env.VOICEFLOW_API_KEY;
  const VERSION_ID = process.env.VERSION_ID;
  const url = `https://api-dm-test.voiceflow.fr/exportraw/${VOICEFLOW_API_KEY}?versionID=${VERSION_ID}`;
  let vf_transcript;
  console.log();
  vf_transcript = fetch.fetchUrl(url, function (error, meta, body) {
    console.log(vf_transcript, 1);
    new Transcript({ transcript: body.toString() })
      .save()
      .then(() => res.json("Transcript added!"))
      .catch((err) => {
        res.status(400).json("Error: " + err);
        if (err) {
          console.log("Error Inserting New Data");
          if (err.name == "ValidationError") {
            for (field in err.errors) {
              console.log(err.errors[field].message);
            }
          }
        }
      });
  });
});

module.exports = router;
