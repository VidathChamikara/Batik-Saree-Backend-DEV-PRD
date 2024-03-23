const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'doyl52jeg', 
    api_key: '872221696833266', 
    api_secret: '5ygsUjoWmTiTLkBqkVeUnQadSjo' 
  })

module.exports = cloudinary;