const db = require("../db");

exports.getAllVoitures = async () => {
  return await db.execute(`SELECT * FROM voiture`);
};


exports.getByNdp = async (ndp) => {
  return await db.execute(`SELECT * FROM voiture where ndp = ?; `,[ndp]);
};

exports.postMyCar = async (id, ndp, userid) => {
  return await db.execute(
    `INSERT INTO voiture (id , ndp , user_id  ) VALUES (?,?,?);`,
    [id, ndp, userid]
  );
};

exports.deleteMYCar = async (id) => {
  return await db.execute(`Delete from voiture  WHERE voiture.id = ?;`, [id]);
};

exports.changeMYCar = async (ndp,id) => {
  return await db.execute(
    `UPDATE voiture SET ndp = ? WHERE voiture.id = ? ;`,
    [ndp, id]
  );
};

exports.getUserInfo = async (ndp) => {
  return await db.execute(`SELECT user.id , voiture.user_id , name , lastname , ndp , telephone FROM user INNER JOIN voiture
  ON user.id = voiture.user_id  where ndp = ?;`, [ndp]);
};
