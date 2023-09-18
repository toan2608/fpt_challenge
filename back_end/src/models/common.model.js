// const TableView= require('./TableView.js');
// const TypeModel= require('./TypeModel.js');
// var squel = require("squel");
// const TableManifest= require('./TableManifest.js');
const knex = require('../configs/knex');
// const CustomerAcess= require('./CustomerAcess.js');

class CommonModel {
    // Query Database
    async queryDatabase(sql){
        try
        {
            let data = await knex.raw(sql);
            if (data==null) return false;
            return data[0];
        }
        catch(e){
            console.log(e);
            return false;
        }
    }

    // Insert data to database
    async insertDataToDb(dataInsert, table){
        try
        {
            if(dataInsert && table) {
                await knex(table)
                    .insert(dataInsert);
                return true;
            }
            else {
                return false;
            }
        }
        catch(e){
            console.log(e);
            return false;
        }
    }

    // Update Data by Id
    async updateDataById(dataInsert, table, updateId){
        console.log(dataInsert);
        try
        {
            if(dataInsert && table && updateId) {
                await knex(table)
                .where({ id: updateId })
                .update(
                  dataInsert
                );
                return true;
            }
            else {
                return false;
            }
        }
        catch(e){
            console.log(e);
            return false;
        }
    }

   
}

module.exports =  CommonModel;