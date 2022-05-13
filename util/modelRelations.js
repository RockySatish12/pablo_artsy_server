const Models = require('./models')

exports.defineRelation = () =>{

    Models.Address.belongsTo(Models.User, {constraints: true, onDelete: 'CASCADE'});
    Models.User.hasOne(Models.Address);
    Models.Collector.belongsTo(Models.User, {constraints: true, onDelete: 'CASCADE'});
    Models.User.hasOne(Models.Collector);
    Models.Artist.belongsTo(Models.User, {constraints: true, onDelete: 'CASCADE'});
    Models.User.hasOne(Models.Artist);
    Models.Art.belongsTo(Models.Artist, {constraints: true, onDelete: 'CASCADE'});
    Models.ArtCategory.hasMany(Models.Art);
    Models.Art.belongsTo(Models.ArtCategory, {constraints: true, onDelete: 'CASCADE'});
    Models.Artist.hasMany(Models.Art)
    Models.Collector.hasOne(Models.RecentViews);
    Models.RecentViews.belongsTo(Models.Collector);
    Models.RecentViews.belongsToMany(Models.Art, {through: Models.ViewedItems})
    Models.Art.belongsToMany(Models.RecentViews, {through: Models.ViewedItems})
    Models.Collector.hasMany(Models.Orders);
    Models.Orders.belongsTo(Models.Collector, {constraints: true, onDelete: 'CASCADE'});
    Models.Artist.hasMany(Models.Orders);
    Models.Orders.belongsTo(Models.Artist, {constraints: true, onDelete: 'CASCADE'});
    Models.Art.hasMany(Models.Orders, {constraints: true, onDelete: 'CASCADE'});
    Models.Orders.belongsTo(Models.Art, {constraints: true, onDelete: 'CASCADE'});
    Models.User.hasMany(Models.Notification);
    Models.Notification.belongsTo(Models.User, {constraints: true, onDelete: 'CASCADE'});
    Models.Bank.belongsTo(Models.Artist, {constraints: true, onDelete: 'CASCADE'});
    Models.Artist.hasOne(Models.Bank);
    Models.Artist.hasOne(Models.Payment);
    Models.Payment.belongsTo(Models.Artist, {constraints: true, onDelete: 'CASCADE'});
}