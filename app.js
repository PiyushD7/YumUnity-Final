const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const bcrypt = require("bcrypt") // Importing bcrypt package
const passport = require("passport")
const initializePassport = require("./server/passport-config.js")
const session = require("express-session")
const methodOverride = require("method-override")
const mongoose = require("mongoose"); // Importing mongoose
// const User = require("./models/User");
// const User = require("./models/User");






const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
    secret: 'CookingBlogSecretSession',
    saveUninitialized: true,
    resave: true
}));
app.use(flash());
app.use(fileUpload());

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

const routes = require('./server/routes/recipeRoutes.js');
const mongo = require('./server/models/database.js');
const error = require('mongoose/lib/error/index.js');
app.use('/', routes);

// /---------
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

// Importing all Libraries that we installed using npm


initializePassport(
    passport,
    async(email) => {
        // Find user in MongoDB
        return await User.findOne({ email: email });
    },
    async(id) => {
        // Find user in MongoDB
        return await User.findById(id);
    }
)


// Connect to MongoDB
// mongoose.connect("mongodb+srv://cultgreekgods:InRpMCLGEQP0iP7l@cluster0.1uwekrl.mongodb.net/Recipes?retryWrites=true&w=majority")
//     .then(() => {
//         console.log("Mongodb connected")
//     }).catch((e) => {
//         console.log(e)
//     })
mongoose.set('strictQuery', false);
mongo();

// Define user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// Create User model
const User = mongoose.model("User", userSchema);

app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride("_method"))

// Configuring the login post functionality
// app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
//     successRedirect: "/index",
//     failureRedirect: "/login",
//     failureFlash: true
// }))



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false
}))


// Configuring the login post functionality
app.post("/login", checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/login",
    failureFlash: true
}), (req, res) => {
    // Set isLoggedIn session variable to true after successful login
    req.session.isLoggedIn = true;
});





// Configuring the register post functionality
app.post("/register", checkNotAuthenticated, async(req, res) => {

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
            // Create a new user in MongoDB
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
        await user.save()
            .then((rees) => {
                console.log(`New user created!`, rees)
                res.redirect("/login");
            }).catch((error) => {
                console.log("error aya hai", error)
            });

        // console.log("User registered:", user);
        // res.redirect("/login");

    } catch (e) {
        console.error("Error registering user:", e);
        res.redirect("/register");
    }
})

// Routes
app.get('/', checkAuthenticated, (req, res) => {
    res.render("index1.ejs", { name: req.user.name })
})



app.get('/login', (req, res) => {
    res.render("login.ejs", { isLoggedIn: req.session.isLoggedIn });
});


app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render("login.ejs")
})

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render("register.ejs")
})

// app.delete("/logout", (req, res) => {
//     req.logout(req.user, err => {
//         if (err) return next(err)
//         res.redirect("/")
//     })
// })


app.delete("/logout", (req, res) => {
    req.logout(req.user, err => {
        if (err) return next(err);
        // Unset isLoggedIn session variable and redirect to home page
        req.session.isLoggedIn = false;
        res.redirect("/");
    });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect("/login")
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/")
    }
    next()
}


app.listen(port, () => console.log(`Listening to port ${port}`));






// const mongoose = require('mongoose');
// require('dotenv').config(); // Load environment variables from .env file

// const MONGODB_URI = process.env.MONGODB_URI;

// mongoose.connect(MONGODB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch((error) => {
//         console.error('Error connecting to MongoDB:', error);
//     });





// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// });

// // Create User model
// const User = mongoose.model("User", userSchema); // This line causes OverwriteModelError

// // Rest of the code...