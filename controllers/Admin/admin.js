const Users = require('../../models/user')


async function getUsersDb(_req, res, next) {
    try {
      const users = await Users.find({ roles: "62ce61008a8cf0b94f5c327d" });   
      return res.send(users);
    } catch (err) {
      console.log(err,'no sos usuario admin');
    }
  }

  async function getUserById(req, res) {
    const { id } = req.params;
    try {
      let names = await Users.findById({ _id: id });
      return res.json(names);
    } catch (error) {
      return res.json(error);
    }
  }

  async function updateAdminById(req, res, next) {
    try {
      const {id} = req.params;
      const update = await Users.findOneAndUpdate({ _id: id }, {'roles':""},{new:true});
      return res.send(update);
    } catch (error) {
      next("error");
      res.send("Error al editar el usuario");
    }
  }


  const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
      const mail = await Users.findByIdAndDelete({ _id: id });
      if (!mail) {
        res.send("No se encontro el usuario");
      } else {
        res.send("Usuario eliminado");
      }
    } catch (error) {
      console.log(error);
    }
  };



  module.exports = {getUsersDb,deleteUser,getUserById,updateAdminById}