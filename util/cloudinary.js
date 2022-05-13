const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'du7pn6pke', 
    api_key: '212483515435431', 
    api_secret: 'UTBUwwu5f_ZA_XsYb-wur4Awi7s',
    secure: true 
  });

module.exports = cloudinary;