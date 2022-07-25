const Usuario = require('../models/user')
const Nft = require('../models/Nft')
const jwt = require('jsonwebtoken')
const likeNft = async (req, res) => {
    const { email } = req.params;
    try {
      const nft = await Nft.findOne(email).populate("userLikes");
      const nftOwner = nft.ownerId;
      const likeUser = nft.userLikes.find(
        (user) => user.nombre === req.usuario.nombre
      );
  
      const propietario = await Usuario.findOne({ nombre: nftOwner }).populate(
        "nftLikes"
      );
  
      //usuario que le da like
      const userL = await Usuario.findOne({
        nombre: req.usuario.nombre,
      }).populate("nftLikes");
  
      if (likeUser) {
        //si el usuario ya le dio like puede quitarselo
        nft.ranking = nft.ranking - 1;
        const userFiltrados = nft.userLikes.filter(
          (user) => user.nombre !== req.usuario.nombre
        );
        nft.userLikes = userFiltrados;
        await nft.save();
  
        //sacar like de usuario // si es un nft propio lo pasa a propietario para realizar el update
        if (userL.nombre === propietario.nombre) {
          const likesFiltrados = propietario.nftLikes.filter(
            (NFT) => NFT.id !== nft.id 
          );
          propietario.nftLikes = likesFiltrados;
        } else {
          const likesFiltrados = userL.nftLikes.filter(
            (NFT) => NFT.id !== nft.id 
          );
          userL.nftLikes = likesFiltrados;
          await userL.save();
        }
  
        //actualizar el nft en propietario
        const actualizado = propietario.nfts.map((n) => {
          if (n.id === nft.id ) {
            n.ranking = nft.ranking;
            n.userLikes = nft.userLikes;
            return n;
          } else {
            return n;
          }
        });
        propietario.nfts = actualizado;
  
        await Usuario.findOneAndUpdate({ nombre: nftOwner }, propietario);
  
        return res.json({ alert: `You don't like ${nft.id} anymore` });
      } else if (!likeUser) {
        //si el usuario no esta en la lista de likes, puede darle su like
        nft.ranking = nft.ranking + 1;
        nft.userLikes.push(req.usuario);
        await nft.save();
  
        //agregar like al usuario // si es un nft propio lo pasa a propietario para realizar el update
        if (userL.nombre === propietario.nombre) {
          propietario.nftLikes.push(nft);
        } else {
          userL.nftLikes.push(nft);
          await userL.save();
        }
  
        //actualizar el nft en propietario
        const actualizado = propietario.nfts.map((NFT) => {
          if (NFT.id === nft.id ) {
            NFT.ranking = nft.ranking;
            NFT.userLikes = nft.userLikes;
  
            return NFT;
          } else {
            return NFT;
          }
        });
        propietario.nfts = actualizado;
  
        await Usuario.findOneAndUpdate({ nombre: nftOwner }, propietario);
  
        res.json({ msg: `You like ${nft.id}` });
      }
    } catch (error) {
      console.log(error);
    }
  };

//custom middleware para proteger las rutas
const checkOut = async (req, res, next) => {
  let token;
  //se envian por headers los token de autorizacion
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //bearer paoque asi se recibe el token
    try {
      //entra el JWT en este token
      token = req.headers.authorization.split(" ")[1]; //para sacar Bearer uy dejar solo el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); //se usa la variable de entornno que s eunso para verificar

      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v"
      ); //saca del modleo tood loq eu esta en el parentesis


      return next();
    } catch (error) {
      return res.status(404).json({ msg: error.message });
    }
  }
  if (!token) {
    const error = new Error("Token No Válido");
    return res.status(404).json({ msg: error.message });
  }

  next();
};



  module.exports ={ likeNft,checkOut}