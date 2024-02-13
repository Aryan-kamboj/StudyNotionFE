const contactUsEmail = (fname,lname,email,phoneNo,countryCode,message)=>{
    console.log("Tu chal rha hai kya");
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Somone reached out to team StudyNotion</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
            
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href="https://studynotion-edtech-project.vercel.app"><img class="logo"
                    src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
            <div class="message">Someone has reached out form the website contact us form </div>
            <div class="body">
                <p>Hey team StudyNotion,</p>
                <p>${fname} ${lname} with email and contact <span class="highlight">${email+", "+countryCode+" "+phoneNo}</span> has reached out to us with a message .....
                </p>
                <p>${message}</p>
            </div>
        </div>
    </body>
    
    </html>`
}
module.exports = contactUsEmail;
