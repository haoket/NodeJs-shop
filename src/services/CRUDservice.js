import bcrypt from 'bcryptjs';
import { promiseImpl } from 'ejs';
import db from '../models/index';
import connection from "../config/connectDB"



const salt = bcrypt.genSaltSync(10);

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const [rows, fields] = await connection.query('SELECT * FROM `tbl_user`');
            if (rows) {
                resolve(rows)
            } else {
                resolve([])
            }

        } catch (e) {
            reject(e)
        }
    })
}

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashedPassword = await hasUserPassword(data.password);

            const sqlQuery = `INSERT INTO tbl_user (user_id, password, email, fullname) 
              VALUES (?, ?, ?,?)`;

            const values = [
                data.id,
                hashedPassword,
                data.email,
                data.fullname
            ];

            await connection.query(sqlQuery, values);
            resolve('create a new user success');
        } catch (e) {
            reject(e);
        }
    })

}

let hasUserPassword = (password) => {


    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWord = await bcrypt.hashSync(password, salt);
            resolve(hashPassWord);
        } catch (e) {
            reject(e);
        }


    })
}



let getUserInforById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true
            })


            if (user) {
                resolve(user)
            } else {
                resolve([])
            }


        } catch (e) {
            reject(e);
        }
    })
}


let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;

                await user.save();
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            } else {
                resolve();
            }

        } catch (e) {
            console.log(e)

        }
    })
}

let deleteUserById = (userId) => {
    return new promiseImpl(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e)

        }
    })
}


module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInforById: getUserInforById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}