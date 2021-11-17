const bcrypt = require('bcryptjs');

const bcryptService = async function  hashPassword (password) {
    try {
        const salt = await bcrypt.genSalt(10,);
        return await bcrypt.hash(password, salt);
    } catch(err) {
        console.log(err);
        //throw new Error('Ошибка хеширования', err);
    }
};

module.exports = bcryptService;