const mongoose = require('mongoose');

const { model, Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    gasData: [{
        ref: "gasdata",
        type: Schema.Types.ObjectId 
    }]
});

module.exports = model("User", UserSchema);
