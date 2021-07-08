const db = require("../db");

exports.getAllMessages = async () => {
  return await db.execute(`SELECT * FROM messages`);
};