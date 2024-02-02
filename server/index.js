const express = require("express");
const app = express();

app.use(express.json());

const cors = require("cors");
app.use(
	cors({origin:["http://localhost:5173", "http://localhost:4002"],credentials:true})
);
app.options("*", cors())

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;

const { cloudinaryConnect } = require("./config/cloudinary");
cloudinaryConnect();

const database = require("./config/database");
database.connect();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const fileUpload = require("express-fileupload");
app.use(fileUpload());

const authRouter = require("./routes/authRouter");
app.use("/api/auth",authRouter);

// this will not run in all the authentication routes as all the auth routes will have already been handled by
// app.use("/api/auth",authRouter); and returned to client
const openRoutes = require("./routes/openRouter"); 
app.use("/api/open",openRoutes);

const {authTokenCheck} = require("./controllers/authControllers");
app.use("/api/*",authTokenCheck);

const adminRoutes = require("./routes/adminRouter");
app.use("/api/admin",adminRoutes);

const userRoutes = require("./routes/userRouter");
app.use("/api/user",userRoutes);

const studentRoutes = require("./routes/studentRouter");
app.use("/api/student",studentRoutes);

const instructorRoutes = require("./routes/instructorRouter");
app.use("/api/instructor",instructorRoutes);

const schedule = require('node-schedule')
const {ratingCalc} = require("./utilityFunctions/scheduledFunctions/ratingCalculator");
// ratingCalc();
schedule.scheduleJob("0 0 * * *",ratingCalc)
app.listen(PORT,()=>{
    console.log("backend is listening at port = ",PORT);
})