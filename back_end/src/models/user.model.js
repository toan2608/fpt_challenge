
const TABLE_NAME = 'user'
const CommonModel = require('./common.model');

class UserModel extends CommonModel{
    getTableName() {
        return 'user'
    }

    getAllData() {
        return `SELECT * FROM user WHERE delete_flag = 0`;
    }

    getDataById(userId) {
        return `SELECT * FROM user WHERE id = ${userId}`;
    }

    searchPerson(email) {
        return `SELECT * FROM user WHERE email = '${email}'`;
    }

    getFieldToAdd() {
        
    }
    update(req, res) {

    }

    delete() {

    }

}

module.exports = UserModel;