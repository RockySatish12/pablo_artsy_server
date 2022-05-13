const path = require('path');
const express = require('express');
const Crypto = require('./util/crypto');
const PanelDetails = require('./util/adminjsDetails');
const Models = require('./util/models');
const ModelsRelation = require('./util/modelRelations')
const sequelize = require('./util/database');

const app = express();
const port = process.env.PORT || 5000;


//Routes
const apiRoutes = require('./routes/api')

const AdminJs = require('adminjs')
const AdminJsExpress = require('@adminjs/express')
const AdminJsSequelize = require('@adminjs/sequelize');
AdminJs.registerAdapter(AdminJsSequelize);

const updateOrCReateAdmin = () => {

    Models.User.findByPk("superAdmin")
    .then(user => {
        if(!user){
            const passwordHash = Crypto.encrypt("12345678");
            const password = JSON.stringify(passwordHash);

            return Models.User.create({
                id: "superAdmin",
                name: "Super Admin",
                password: password,
                email: "superAdmin@pabloartsy.com",
                gender:"Male",
                dob: "2000-02-19",
                phoneNumber: "9825135568",
                imageUrl: "https://res.cloudinary.com/du7pn6pke/image/upload/v1648446702/Screenshot_2022-03-28_at_11-35-23_Super_Admin_-_Super_Admin_updated_their_profile_picture_kveyb3.png",
                userType: "Admin"
            });

        }else{
            return user;
            console.log("Super Admin already exists ===========>")
        }
    })
    .then(user => {
        console.log("Super Admin created ===========>")
    })
    .catch(error => {
        console.log("super admin error ========>" + error);
    })

}

const resources = [
    { 
        resource: Models.User,
        options: {
            actions: {
                new: {
                    isVisible: false
                },
                delete: {
                    isVisible: false
                }
            },
            properties:{
                imageUrl:{
                    components:{
                        list: AdminJs.bundle('./react_components/image_view'),
                        show: AdminJs.bundle('./react_components/profile_image')
                    } 
                }
            } 
        }
    },
    { 
        resource: Models.Artist,
    },
    { 
        resource: Models.Collector,
    },
    { 
        resource: Models.Address,
    },
    { 
        resource: Models.Bank,
    },
    { 
        resource: Models.ArtCategory,
    },
    { 
        resource: Models.Art,
        options: {
            actions: {
                new: {
                    isVisible: false
                },
            },
            properties:{
                imageUrl:{
                    components:{
                        list: AdminJs.bundle('./react_components/image_view'),
                        show: AdminJs.bundle('./react_components/profile_image')
                    } 
                }
            } 
        }
    },
    { 
        resource: Models.Orders,
    },
    { 
        resource: Models.Payment,
    },
    { 
        resource: Models.RecentViews,
        options: {
            actions: {
                new: {
                    isVisible: false
                },
                delete: {
                    isVisible: false
                }
            },
        }
    },
    { 
        resource: Models.ViewedItems,
        options: {
            actions: {
                new: {
                    isVisible: false
                },
                delete: {
                    isVisible: false
                }
            },
        }
    },
    { 
        resource: Models.Notification,
    },
];


const run = async () => {

    //Relations
    ModelsRelation.defineRelation();

    try{
        await sequelize.authenticate()
        console.log("Connection has been established successfully.");
    }catch(error){
        console.error('Unable to connect to the database:', error);
    }

    //syncing database
    await sequelize
    .sync()
    // .sync({force: true})
    .then(result => {
        updateOrCReateAdmin();
        console.log("Database synced successfully.");
    })
    .catch(err => {
        //Logging errors if occured

        console.log(err)
    });

    

    const label = PanelDetails.label
    const brandring = PanelDetails.branding;

    const adminJs = new AdminJs({
        databae: [sequelize],
        rootpath: '/admin',
        resources:resources,
        locale: label,
        branding: brandring,
    })

    adminJs.watch();

    const adminRouter = AdminJsExpress
    .buildAuthenticatedRouter(adminJs,{
        authenticate: async(email, password) => {
            const user = await Models.User.findOne({where: {
                userType: "Admin",
                email: email
            }})
            if(user){
                const passwordDecrypted = Crypto.decrypt(JSON.parse(user.password));
                if(password === passwordDecrypted){
                    return user
                }
            }
            return false;
        },
        cookiePassword: 'session Key',
    });

    //listening admin routes
    app.use(adminJs.options.rootpath, adminRouter);
    //definations for app
    app.use(express.urlencoded({limit:'50mb',extended:true}));
    app.use(express.json({limit:'50mb'}));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'images')));
    //listening to routes
    app.use('/api', apiRoutes);
    app.use('/privacy-policy', (req,res,next) => {
        res.render('../views/privacy_policy')
    });
    app.get('/', (req, res, next) => {res.render('../views/index')})
    app.use((req, res, next) =>{
        res.status(404);
        res.type('txt').send('Page Not found');
    })
    //setting views
    app.set('view engine', 'ejs');
    app.set('views', 'views');

    console.log(`Listening to Port: ${port}`)
    app.listen(port);

};

run();



