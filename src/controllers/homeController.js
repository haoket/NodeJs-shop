import connection from "../config/connectDB"
import res from 'express/lib/response';
import db from '../models/index';
import CRUDservice from "../services/CRUDservice";
// Backend - Đường dẫn chung (URL) để xem JSON hoặc trang EJS
let getHomePage = async (req, res) => {

    return res.render('homepage.ejs');

};
let createNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message);
}

let getAllUser = async (req, res) => {
    let rows = await CRUDservice.getAllUser();


    try {
        const isAPICall = req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1);

        if (isAPICall) {
            // Xử lý khi là API call (trả về dữ liệu JSON)

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(rows));
        } else {
            // Xử lý khi là truy cập từ trình duyệt (hiển thị trang EJS)

            return res.render('homepage.ejs', {
                data: JSON.stringify(rows)
            });
        }
    } catch (e) {
        console.log(e);
    }
};



let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();

    return res.render('displayCRUD.ejs', {
        dataTable: data
    })

}


let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body)
    console.log(message)
    return res.send('create user success!!');
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDservice.getUserInforById(userId);
        //check user data not found


        //let userData

        return res.render('editCRUD.ejs', {
            user: userData
        });
    } else {
        return res.send('user not found ');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })

}
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDservice.deleteUserById(id);
        return res.send('delete user success')
    } else {
        return res.send('user not found')
    }


}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
    getAllUser: getAllUser,
    createNewUser: createNewUser,
}