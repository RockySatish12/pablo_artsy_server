const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

//Controllers
const loginController = require('../controllers/api/login');
const signupController = require('../controllers/api/signup');
const artsController = require('../controllers/api/arts');
const artistController = require('../controllers/api/artist');
const collectorController = require('../controllers/api/collector');
const orderController = require('../controllers/api/orders');
const editDetails = require('../controllers/api/editDetails');
const { postForgetPassword } = require('../controllers/api/forgetPasword');
const notificationController = require("../controllers/api/notification");
const searchController = require('../controllers/api/search');
const artCategoryController = require('../controllers/api/artCaregory');

//Lgoin route
router.post('/login', loginController.postLogin);

//Forget Password
router.post('/forgetPassword', postForgetPassword);
router.post('/changePassword', editDetails.postChangePassword);

//signUp route
router.post('/signup-collector', signupController.postSignupCollector);//collector
router.post('/signup-artist', signupController.postSignupArtist);//artist
router.get('/checkUsername/:username', signupController.getUerName);

//Arts
router.get('/recently-added-Art/:limitValue', artsController.getRecentlyAdded);
router.get('/All-Art-OnSale', artsController.getAllArtOnSale);
router.post('/Art-details/:artId', artsController.getArtDetail);
router.post('/add-art', artsController.postAddArt);
router.get('/get-art-details/', artsController.getArtDetailsWithOrders);
router.get('/get-top/orders/', artsController.getTopOrders);

//arists
router.get('/top-ten-Artists', artistController.getTopTenArtist);
router.get('/artist-details/:username', artistController.getAtistDeails);
router.get('/recent-works/:username', artistController.getRecentWorks);

//Collector
router.get('/recentViews/:username&:limitValue', collectorController.getRecentViews);
router.post('/make-order', collectorController.postOrderArt);

//OrderRoutes
router.get('/orders-for-artist/:username', orderController.getOrdersForArtist);
router.get('/orders-for-collector/:username', orderController.getOrdersForCollector);
router.get('/order-details/:orderId', orderController.getOrderDetails);
router.post('/accept-order/', orderController.postOrderAccept);
router.post('/reject-order/', orderController.postOrderDecline);
router.post('/cancel-order/', orderController.postOrderCancel);
router.get('/check-availability/:orderId', orderController.checkOrderAvailability);
router.post('/order-complete/', orderController.postPayment);

router.post('/update/details', editDetails.postUpdateDetails);

router.get('/search-art/:query', searchController.searchArts);
router.get('/search-artist/:query', searchController.searchArtist);

router.get("/top-orders-for-art/:artId", orderController.getTopOrdersForArt);
router.get("/order-for-art/:artId&:collectorId", orderController.getOrdersForArt);

router.get("/art-categories", artCategoryController.getArtCategory);

//notification
router.get('/notifications/:username', notificationController.getNotification);

router.post('/get-bank/:username', artistController.getBankDetails);
router.post('/edit-bank', artistController.postBankDetails);
router.get('/get-payment-details/:username', artistController.getPaymentDetails);
router.post('/deleteArt/',artistController.deleteArt);

module.exports = router;
