const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(); //bydefault 10 no of times
    return bcrypt.hashSync(password, salt)
}

const confirmPassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashPassword,
    confirmPassword
}