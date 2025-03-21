const UserModel = require("../../models/User.model");
const { jwtSign } = require("../../utils/authMiddleware");
const {
  responseSender,
  hashPassword,
  comparePassword,
} = require("../../utils/common");
const { userFind, saveUser } = require("./User.service");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isEmailExist = await userFind({ email });

    if (isEmailExist)
      return responseSender(400, "error", "Email already exist", null, res);

    const HashPassword = await hashPassword(password);
    const user = await saveUser({ username, email, password: HashPassword });
    responseSender(200, "success", "User registered successfully", user, res);
  } catch (e) {
    console.log("Error on register", e);
    responseSender(400, "error", "Error on register", null, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userFind({ email });

    if (!user || !(await comparePassword(password, user.password))) {
      return responseSender(400, "error", "Invalid credentials", null, res);
    }
    const token = jwtSign({ userId: user._id });
    responseSender(200, "success", "Loged in successfully", { token, user: user?.username }, res);
  } catch (e) {
    console.log("errro on login", e);
  }
};

module.exports = {
  register,
  login,
};
