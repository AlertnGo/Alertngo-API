const db = require('../db');

exports.getAllVoitures = async () => {
    return await db.execute(`SELECT * FROM voiture`);
}

