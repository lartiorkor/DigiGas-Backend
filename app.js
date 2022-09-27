require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT || 6000;

const db =
  "mongodb+srv://digigas:test1234@cluster0.rthkjnq.mongodb.net/digigas?retryWrites=true&w=majority";

const authRouter = require("./src/routes/auth.routes.js");
const gdRouter = require("./src/routes/gasdata.routes.js");

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/gas", gdRouter);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("⚡ connected to mongodb");
    app.listen(port, () => {
      console.log(`🚀 server running at localhost port ${port}`);
    });
  })
  .catch((err) => console.log("mongoose err: ", err));
