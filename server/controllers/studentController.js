const STUDENT = require("../models/student");
exports.getCart = async (req,res)=>{
    try {
        const {email,userType} = req.locals;
        if(email&&userType==="student"){
            const student = await STUDENT.findOne({email:email});
            return res.status(200).json({
                cart:student.cart,
            });
        }
        else if(userType==="instructor"){
            throw("You are an instructor you cant buy a course");
        }
        else{
            throw("There was some error please log in again ");
        }
        
    } catch (error) {
        return res.status(500).json({
            error:error
        })
    }
}
exports.setCart = async (req,res)=>{
    try {
        const {course} = req.body;
        const {email,userType} = req.locals;
        if(email&&userType==="student"&&course){
            const student = await STUDENT.findOne({email:email});
            if(student){
                if(!student.cart.includes(course)){
                    student.cart.unshift(course);
                    const studentUpdated = await STUDENT.findOneAndUpdate({email:email},{cart:student.cart});
                    console.log(studentUpdated);
                    return res.status(200).json({
                        cart:studentUpdated.cart,
                    });
                }
                else{
                    res.status(400).json({
                        message:"Course already added to cart"
                    })
                }
            }
        }
        else if(userType==="instructor"){
            throw("An instructor can't buy a course");
        }
        else{
            throw(`${email?course?"":"There has been some error please try again ":"There has been some error please log in again"}`);
        }
    } catch (error) {
        res.status(500).json({
            error:error
        })
    }
}