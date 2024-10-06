const express = require("express")
const app = express()
const session = require("express-session")
const cookieParser = require("cookie-parser")
const cors = require('cors')


// Middleware setup

app.use(cors());
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "secret"
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/", (req,res)=>{})



app.use("/", require("./routes/userRoutes"))
app.use("/dashboard/", require("./routes/postRoutes"))

app.use("/", require("./auth/userAuth"))

app.use("/dashboard/user", require("./controllers/userControllers"))
app.use("/dashboard/post", require("./controllers/postControllers"))

app.listen(3000, ()=> console.log("server running on port 3000"))