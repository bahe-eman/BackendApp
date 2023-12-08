const {
  findAllUser,
  findAllFloor,
  findAllRoomByCat,
  findAllRoom,
  findAllRoomByFlor,
  findAllRoomByPar
} = require("./option.repository");

const allUsers = async () => {
  const users = await findAllUser();
  return users;
};
const allFloor = async () => {
  const users = await findAllFloor();
  return users;
};
const allRoom = async (categ,flor) => {
  let users = []
  if(categ==0 && flor==0){
     users = await findAllRoom();
  }else if(categ!=0 && flor==0){
     users = await findAllRoomByCat(categ);
  }else if(categ==0 && flor!=0){
     users = await findAllRoomByFlor(flor);
  }else{
     users = await findAllRoomByPar(categ,flor);
  }
  
  return users;
};


module.exports = {
  allUsers,
  allFloor,
  allRoom
};
