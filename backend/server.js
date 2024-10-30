require('dotenv').config()
const express = require("express")
const app = express()
const session = require("express-session")
const cookieParser = require("cookie-parser")
const cors = require('cors')

// Middleware setup

app.use(cors({
    origin: '*', // Change this to your frontend URL
    credentials: true, // Allow credentials to be sent
}));
// app.use(session({
//     resave: false,
//     saveUninitialized: false,
//     secret: "secret"
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", (req,res)=>{})


//routes
app.use("/", require('./routes/userRoutes'))
// app.use("/dashboard/", require("./routes/postRoutes"))
//auth
app.use("/", require("./auth/userAuth"))
//controllers
// app.use('/user', require('./controllers/userControllers'))
app.use("/dashboard/post", require("./controllers/postControllers"))


//Centralized error handling
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
});



app.listen(3000, ()=> (
    console.log("server running on port 3000")
))