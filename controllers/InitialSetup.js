const Role = require('../models/Role')

const createRoles = async () => {
    // apenas carge la app, crea en la db
    try {
      const count = await Role.estimatedDocumentCount(); // se fija si ya existen roles (documentos) en la db,
  
      if (count > 0) return; // si es mayor a 0, significa que hay roles.
  
      const values = await Promise.all([
        // sino hay ningun rol, los crea.
        new Role({ name: "user" }).save(),
        new Role({ name: "admin" }).save(),
      
       
      ]);
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  }


module.exports = createRoles