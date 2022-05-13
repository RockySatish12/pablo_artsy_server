const Models = require('../../util/models');
const { Op } = require("sequelize");

exports.searchArts = (req, res, next) => {

    const query = req.params.query;

    Models.Art.findAll({
        where: {
            [Op.or]: [
                {
                    name: {
                        [Op.like]: '%' + query + '%'
                    }
                },
                {
                    '$art_category.name$': {[Op.like]: '%' + query + '%'}
                }
            ]
        },
        include: [{model: Models.ArtCategory, as:'art_category'}],
        order:[['price', 'ASC']]
    })
    .then(arts => {
        res.send({status: true, data: arts, errroMessage: null})
    })
    .catch(error => {
        res.send({status:false, data:[], errroMessage: error});
        console.log("Search Art =====> " + error);
    })

}

exports.searchArtist = (req, res, next) => {

    const query = req.params.query;
    Models.Artist.findAll({
        where: {
            userId: {
                [Op.like]: `%${query}%`
            }
        },
        include: [
            {
                model: Models.User, 
                attributes: {exclude: ['password']},
                include: [Models.Address]
            }
        ]
    })
    .then(arts => {
        res.send({status: true, data: arts, errroMessage: null})
    })
    .catch(error => {
        res.send({status:false, data:[], errroMessage: error});
        console.log("Search Art =====> " + error);
    })

}