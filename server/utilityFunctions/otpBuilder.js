const otpBuilder = function(length,flags){
    let otpString="";
    while(otpString.length!==length)
    {
        const random = Math.random();
        otpString = Math.floor(random * Math.pow(10,length)).toString();
    }
    const otp = Number(otpString);
    return otp;
}
module.exports = otpBuilder;