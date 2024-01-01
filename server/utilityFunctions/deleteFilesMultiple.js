const cloudinary = require("cloudinary");
const deleteFilesMultiple = async function (publicIds,fileType){
    try {
        if(!fileType)
        fileType="image";
        const response = await cloudinary.v2.api.delete_resources(publicIds,{resource_type:fileType});
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
        return null;
    }
}
module.exports = deleteFilesMultiple;