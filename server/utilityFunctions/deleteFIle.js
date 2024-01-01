const cloudinary = require("cloudinary");
const deleteFile = async function (publicId,fileType){
    try {
        console.log(publicId);
        if(!fileType)
        fileType="image";
        const response = await cloudinary.v2.uploader.destroy(publicId,{resource_type:fileType});
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}
module.exports = deleteFile;