const Models = require('../../util/models');

exports.getArtCategory = (req, res, next) => {

    Models.ArtCategory.findAll()
    .then(artCategory => {
        res.send({
            status: true,
            data: artCategory,
        })
    })
    .catch(error => {
        res.send({
            status: false,
            errorMessage: "Error occured while fetching"
        })
        console.log("Art category=======> " + error);
    })
    

}