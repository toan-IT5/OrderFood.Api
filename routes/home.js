const express = require('express');
const db = require('../Db/db_conection');
const util = require('util')
const verifyToken = require('./../middlewares/verifyToken');
// const { resolve } = require('path');
const router = express.Router();

async function getListSaler(id){
    return new Promise(async (resolve,reject) => {
        let sql = "SELECT saler.* FROM saler, program_saler WHERE saler.id_saler = program_saler.id_saler AND program_saler.id_program = ? GROUP BY saler.id_saler Limit 5";
            db.query(sql, id,async (req, res) => {
                resolve(res);
            })
    })
}

router.get("/", (req, res) => {
    var sql = "SELECT * FROM program"
    db.query(sql,async (req, res_program) => {
        const promises = res_program.map(async program => {
            const numFruit = await getListSaler(program.id_program);
            program.saler = numFruit;
            console.log(program)
            return program
          })
        
          const data = await Promise.all(promises)
        res.json({
            "status" : true,
            "message" :"Lấy dữ liệu thành công",
            "data" : data
        });
    })
});
module.exports = router;