const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

const database = require("./config/database");
database.connect();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.json());

const authRouter = require("./routes/authRouter");
app.use("/api/auth",authRouter);

// this will not run in all the authentication routes as all the auth routes will have already been handled by
// app.use("/api/auth",authRouter); and returned to client
const {authTokenCheck} = require("./controllers/authControllers");
app.use("/api/*",authTokenCheck);

const studentRoutes = require("./routes/studentRouter");
app.use("/api/student",studentRoutes)

app.listen(PORT,()=>{
    console.log("backend is listening at port = ",PORT);
})