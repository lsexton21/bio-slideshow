//access to .env file when in development mode ONLY
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
//Importing the goods
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const ejsMate = require("ejs-mate");
const dbUrl = process.env.DB_URL;
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const AppError = require("./public/utilities/AppError");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

//Setting up mongo through mongoose
mongoose.connect(dbUrl, {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

//Setting up the router
const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.use(flash());

//Setting up Session Store
const secret = process.env.SECRET || "BioLab101";

const store = MongoStore.create({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60,
});

store.on("error", function (e) {
  console.log("Session Store Error", e);
});

const sessionConfig = {
  store,
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
};
app.use(session(sessionConfig));

//Setting up passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//importing routes from other files
const userRoutes = require("./routes/users");
const studentRoutes = require("./routes/students");
const instafeed = require("./routes/instafeed");
const { isLoggedIn } = require("./routes/isLoggedInMiddleware");

//flash and currentUser middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", userRoutes);
app.use("/students", studentRoutes);
app.use("/instafeed", instafeed);

//Other routes, not imported
app.get("/", (req, res) => {
  res.render("pages/welcome");
});

app.get("/admin", isLoggedIn, (req, res, next) => {
  res.render("admin/adminHomepage");
});

//Catch all 404s
app.all("*", (req, res, next) => {
  throw new AppError("Page Not Found", 404);
});

//Catch all errors and upload on ejs template page
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message)
    err.message = "Oh No! Something Went Wrong. Try refreshing the page.";
  res.status(statusCode).render("appErrorTemplate", { err });
});

//listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
