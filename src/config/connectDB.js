// const { Sequelize } = require('sequelize');
import mysql from "mysql2"



// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'shop'
// });

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shop',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
// simple query
// connection.query(
//     'SELECT * FROM `tbl_user` ',
//     function (err, results, fields) {
//         console.log('====================================');
//         console.log(">> check mysql");
//         console.log('====================================');
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     }
// );


// module.exports = connectDB;


export default connection.promise();