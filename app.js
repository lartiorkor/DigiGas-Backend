const express = require("express");
const mongoose = require("mongoose");

const db =
    "mongodb://127.0.0.1:27017/jess?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4";

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
        app.listen(4000, () => {
            console.log("🚀 server running at localhost port 4000");
        });
    })
    .catch((err) => console.log("mongoose err: ", err));
