const db = require("../db");

exports.getAllVoitures = async () => {
  return await db.execute(`SELECT * FROM voiture`);
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
