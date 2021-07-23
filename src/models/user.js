const db = require("../db");

exports.getAllUsers = async () => {
  return await db.execute(`SELECT * FROM user`);
};

exports.getById = async (id) => {
  return await db.execute(`SELECT name,lastname,telephone , theme FROM user where id = ? ;` ,[id]);
};

exports.setThemeOption = async (id) => {
  return await db.execute(`UPDATE user SET theme = ? where id = ? ;` ,[true , id]);
};

exports.getByEmail = async (email) => {
    return await db.execute(`SELECT * FROM user Where email = ?;`, [email]);
}

exports.enregistrer = async (user) => {
    const {id , email, password, nom, prenom, telephone } = user;
    return await db.execute(`INSERT INTO user (id , email, password, name, lastname, telephone) VALUES (?, ?, ?, ?, ?, ?);`, [id,email, password, nom, prenom, telephone])
}

exports.getMines = async (id) => {
  return await db.execute(`SELECT user.id as user_id , voiture.user_id as voitureuserid , voiture.id as id , name ,ndp  FROM user INNER JOIN voiture
  ON user.id = voiture.user_id  where user.id = ?;`, [id]);
};



