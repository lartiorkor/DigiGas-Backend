const GasData = require("../models/GasData.js");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const addGasData = async (req, res) => {
  const auth_token = req.headers.authorization.split("Bearer ")[1];

  const { gasConcentration, fireValue, createdAt } = req.body;

  const jwt_user_payload = jwt.verify(auth_token, "jwt_secret");

  const user = await User.findOne({
    id: jwt_user_payload.id,
    email: jwt_user_payload.email,
  });

  if (!user) {
    res.status(404).send({
      message: "User not found",
    });
    return;
  }

  const new_gas = new GasData({
    gasConcentration,
    fireValue,
    owner: user,
    createdAt,
  });

  user.gasData.push(new_gas);

  const gas_data = await new_gas.save();
  await user.save();

  res.status(200).send({
    message: "New Gas Added",
    data: {
      ...gas_data._doc,
    },
  });
};

const getAllGasData = async (req, res) => {
  const auth_token = req.headers.authorization.split("Bearer ")[1];

  const jwt_user_payload = jwt.verify(auth_token, "jwt_secret");

  const user = await User.findOne({
    id: jwt_user_payload.id,
    email: jwt_user_payload.email,
  });

  if (!user) {
    res.status(404).send({
      message: "User not found",
    });
    return;
  }

  const allGas = await GasData.find();

  const ownerGasList = allGas.filter((gas) => gas.owner.equals(user._id));
  console.log(ownerGasList);

  res.status(200).send({
    message: "All Gas Data",
    data: ownerGasList,
  });
};

exports.addGasData = addGasData;
exports.getAllGasData = getAllGasData;
