const User = require("../../models/user");


async function updatedProfileById(req, res, next) {
  try {
    const {  description, profilePic, email} = req.body;
    const { token } = req.params;
    let profileUser = await User.find({token})
    profileUser.description = description;
    profileUser.profilePic = profilePic;
    profileUser.email= email;
    await profileUser.save();
    res.json(profileUser);
    
  } catch (error) {
    
   return res.status(404).json(error);
  }
}


async function getProfile(req, res) {
  try {
      const { email } = req.params;
        const profile = await User.findOne({email})

        return res.json(profile)

    } catch(error) {
        console.log("No se pudo traer el perfil", error)
        return res.json(error)
    }
}


module.exports = {
    getProfile,
    updatedProfileById,
};