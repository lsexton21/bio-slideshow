//access to .env file when in development mode ONLY
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const AppError = require("../public/utilities/AppError");
const catchAsync = require("../public/utilities/catchAsyncErrors");
const { isLoggedIn } = require("./isLoggedInMiddleware");

//Setting up User routes

router.get("/register", isLoggedIn, (req, res, next) => {
  res.render("users/register");
});

router.post(
  "/register",
  catchAsync(async (req, res, next) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Registration Complete");
        res.redirect("/admin");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/register");
    }
  })
);

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/admin");
  }
  res.render("users/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  catchAsync(async (req, res, next) => {
    req.flash("success", "Welcome Back!");
    const redirectUrl = req.session.returnTo || "/admin";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success", "You have successfully logged out.");
  res.redirect("/login");
});

router.get(
  "/users",
  isLoggedIn,
  catchAsync(async (req, res, next) => {
    const users = await User.find({});
    res.render("users/listusers", { users });
  })
);

router.get(
  "/users/:id/delete",
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await User.findByIdAndDelete(id);
    res.redirect("/users");
  })
);

module.exports = router;
