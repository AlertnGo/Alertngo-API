const db = require("../db");

exports.getAllUsers = async () => {
  return await db.execute(`SELECT * FROM user`);
};
