const cloudinary = require("cloudinary");
const fileUpload = async function (file){
    try {
        console.log(file);
        const fileBase64 = await file.data.toString("base64");
        const response = await cloudinary.v2.uploader.upload(`data:${file.mimetype};base64,${fileBase64}`,{resource_type:"auto",folder:"studyNotion"});
        console.log(response);
        return (response);
    } catch (error) {
        console.error(error);
        return error;
    }
}
module.exports = fileUpload;