const express = require('express')
const route = express.Router();
// #region Region ImportRouterController
const {     
    GetAllAdmin,
    GetAdmin,
    InsertAdmin,
    UpdateAdmin,
    DeleteAdmin,
    VerifyAdmin,
} = require('../controllers/Admin/AdminController');

const {
    AdminLogin,
    currentToken
} = require("../controllers/Admin/SignAdmin")

const {
    validateToken
} = require("../middleware/validateTokenAdmin")

const {
    GetPosts,
    GetPost,
    InsertPost,
    UpdatePost,
    DeletePost
} = require('../controllers/Admin/PostController');

const {
    InsertProduct,
    GetProducts,
    GetProduct,
    UpdateProduct,
    DeleteProduct,
  
    GetColors,
    GetColor,
    InsertColor,
    UpdateColor,
    DeleteColor,

} = require('../controllers/Admin/ProductController');
// #endregion

const {
    GetUsers,
    UpdateUser,
    DeleteUser
} = require('../controllers/Admin/UserController');

const {GetAll, ChangeStatus, GetOrderUser} = require('../controllers/Admin/OrderController')



// #region Region AdminController
route.route('/admin').get(GetAllAdmin);
route.route('/admin/:id').get(GetAdmin);
route.route('/admin').post(InsertAdmin);
route.route('/admin/:id').put(UpdateAdmin);
route.route('/admin/:id').delete(DeleteAdmin);
route.route('/admin/verify/:adminId/:uniqueString').get(VerifyAdmin);


route.route('/admin/controller/login').post(AdminLogin);
route.route('/admin/controller/currentToken').get(validateToken, currentToken);

// #endregion

// #region Region PostController
route.route('/posts').get(GetPosts);
route.route('/post/:id').get(GetPost);
route.route('/post').post(InsertPost);
route.route('/post').put(UpdatePost);
route.route('/post/:id').delete(DeletePost);
// #endregion

// #region Region ProductController
route.route('/products').get(GetProducts);
route.route('/product/:id').get(GetProduct);
route.route('/product').post(InsertProduct);
route.route('/product').put(UpdateProduct);
route.route('/product/:id').delete(DeleteProduct);
// #endregion

// #region Region ColorProductController
route.route('/products/colors/:product').get(GetColors);
route.route('/product/color/:product/:id').get(GetColor);
route.route('/product/color/:product').post(InsertColor);
route.route('/product/color/:product/:id').put(UpdateColor);
route.route('/product/color/:product/:id').delete(DeleteColor);
// #endregion

route.route('/user').get(GetUsers);
route.route('/user').put(UpdateUser);
route.route('/user/:id').delete(DeleteUser);


route.route('/order').get(GetAll);
route.route('/order/:userId/:orderId').put(ChangeStatus);
route.route('/get_order/:userId').get(GetOrderUser)

module.exports = route