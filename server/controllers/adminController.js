const CATEGORIES = require("../models/categories");
exports.createCategory = async (req,res)=>{
    try {
        const {email,userType}=req.locals;
        // console.log(email,userType)
        const {category} = req.body;
        if(email&&userType==="admin"&&category){
            const response = await CATEGORIES.create({
                categoryName:category
            });
            if(response){
                return res.status(200).json({
                    message:"New category created"
                })
            }
            else
                throw ("There has been some error in creating category");
        }
        else
            return res.status(400).json({
                message:"All fields required"
            })
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}