const mongoose = require('mongoose');
const User = require('../model/user_db');
const bcrypt = require("bcryptjs");



exports.login_get = (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render("login", { err: error });
};

exports.signup_get = (req, res) => {
    const error = req.session.error;
    delete req.session.error;
    res.render("register", { err: error });
};


exports.signup_post = async (req,res) => {
    const {userName,email,password} = req.body;
    let userNameCheck = await User.findOne({userName});
    

    if(userNameCheck){
        req.session.error=("User Name already exist, Try another..");
        return res.redirect ("/signup");
    }

    let emailCheck = await User.findOne({email});

    if(emailCheck){
        req.session.error=("Email already registered... Try login");
        return res.redirect ("/signup");
    }
    
  const hashedPass = await bcrypt.hash(password, 12);
  
    

    let user = new User({
        userName,
        email,
        password:hashedPass
    })
    await user.save();
    res.redirect("/login")
};

exports.login_post = async (req,res) => {
    const{userName,password} = req.body;
    let userNameCheck = await User.findOne({userName});

    if(userNameCheck){

        const isMatch = await bcrypt.compare(password, userNameCheck.password);

        if(isMatch){
            req.session.userName=userNameCheck.userName;
            req.session.isLoggedIn = true;
            return res.redirect("/dashboard")
        }else{
            req.session.error = "Incorrect password"
            return res.redirect("/login");
        }
    }
    req.session.error = " User Not found"
    res.redirect("/login")
  
};

exports.logout_post = (req, res) => {
    req.session.destroy((err) => {
      if (err) throw err;
    });
    res.redirect("/login");

};
