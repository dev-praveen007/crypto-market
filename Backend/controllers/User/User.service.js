const UserModel = require("../../models/User.model");

const userFind = async (data, projection) => {
  try {
    const getData = await UserModel.findOne(data, projection);
    return getData;
  } catch (e) {
    console.log("Error on userind", e);
  }
};

const saveUser = async (data)=>{
    try {
        const user = new UserModel(data);
        await user.save();
        return user;
      } catch (e) {
        console.log("Error on userind", e);
      }
}

module.exports = {
  userFind,
  saveUser
};
