const mongoose = require("mongoose");

const { model, Schema } = mongoose;

const GasDataSchema = new Schema({
    gasConcentration: String,
    fireValue: Boolean,
    owner: {
        ref: "user",
        type: Schema.Types.ObjectId,
    },
});

module.exports = model("gasdata", GasDataSchema);
