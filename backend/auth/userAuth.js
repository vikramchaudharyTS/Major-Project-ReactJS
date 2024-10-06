
const userModel = require("../models/userModel")
const router = require("express").Router()
const bcrypt = require("bcrypt")


//register
router.post("/register", async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        let user = await userModel.findOne({ username });
        if (!user) {
            const hash = bcrypt.hashSync(password, 10);
            await userModel.create({
                username,
                name,
                email,
                password: hash,
            });
            return res.json({ message: "Registration successful. Please login." });
        }
        return res.status(409).json({ message: "User already exists. Please login." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error. Please try again." });
    }
});


//login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        let user = await userModel.findOne({ username });
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.userId = user._id;
            return res.json({ message: "Welcome to dashboard!" });
        }
        return res.status(401).json({ message: "Invalid username or password." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error. Please try again." });
    }
});


//logout
router.get("/logout", (req,res)=>{
    if(req.session && req.session.userId){
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Failed to logout. Please try again.");
            }
            res.clearCookie('connect.sid', { path: '/' })
            return res.redirect("/login")
        });
    }else{
        return res.redirect("/login")
    }
})

module.exports = router