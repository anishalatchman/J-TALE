import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("server"));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

import qaRouter from "./routes/question_answer.js";
import transcriptRouter from "./routes/transcript.js";
import flowRouter from './routes/flow.js'

app.use("/qa", qaRouter);
app.use("/transcript", transcriptRouter);
app.use("/flow", flowRouter)

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// get driver connection
// const dbo = require("./db/conn");

// perform a database connection when server starts
// dbo.connectToServer(function (err) {
//   if (err) console.error(err);
// });
