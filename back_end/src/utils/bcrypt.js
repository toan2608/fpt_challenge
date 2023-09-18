const bcrypt = require("bcrypt");

let hashPassword = async(password) => {
    const salt = bcrypt.genSaltSync(10);
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword);
        }
        catch (e){
            reject(e);
        }
    })
}

let comparePassword = async(password, dbPassword) => {
    let check = await bcrypt.compareSync(password, dbPassword);
    return check;
}

module.exports = {
    hashPassword: hashPassword,
    comparePassword: comparePassword
}