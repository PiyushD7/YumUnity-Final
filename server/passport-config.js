// const LocalStrategy = require("passport-local").Strategy
// const bcrypt = require("bcrypt")

// function initialize(passport, getUserByEmail, getUserById) {
//     // Function to authenticate users
//     const authenticateUsers = async(email, password, done) => {
//         console.log("Email:", email);
//         console.log("Password:", password);

//         const user = await getUserByEmail(email);
//         console.log("User retrieved from DB:", user);


//         if (user == null) {
//             return done(null, false, { message: "No user found with that email" })
//         }
//         try {
//             // Compare hashed password
//             const match = await bcrypt.compare(password, user.password)
//             if (match) {
//                 return done(null, user)
//             } else {
//                 return done(null, false, { message: "Password Incorrect" })
//             }
//         } catch (e) {
//             console.log(e);
//             return done(e)
//         }
//     }

//     passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUsers))
//     passport.serializeUser((user, done) => done(null, user.id))
//     passport.deserializeUser(async(id, done) => {
//         try {
//             const user = await getUserById(id)
//             return done(null, user)
//         } catch (e) {
//             return done(e)
//         }
//     })
// }

// module.exports = initialize






// passport-config.js

// const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");

// Import User model
// const User = require("./models/User");

// function initialize(passport) {
//     // Function to authenticate users
//     const authenticateUser = async(email, password, done) => {
//         try {
//             const user = await User.findOne({ email: email });
//             if (!user) {
//                 return done(null, false, { message: "No user found with that email" });
//             }

//             const match = await bcrypt.compare(password, user.password);
//             if (match) {
//                 return done(null, user);
//             } else {
//                 return done(null, false, { message: "Password incorrect" });
//             }
//         } catch (error) {
//             return done(error);
//         }
//     };

//     passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
//     passport.serializeUser((user, done) => done(null, user.id));
//     passport.deserializeUser(async(id, done) => {
//         try {
//             const user = await User.findById(id);
//             return done(null, user);
//         } catch (error) {
//             return done(error);
//         }
//     });
// }

// module.exports = initialize;






// passport-config.js

// const LocalStrategy = require("passport-local").Strategy;
// const bcrypt = require("bcrypt");
// const User = require("./models/User"); // Import the User model

// function initialize(passport) {
//     // Function to authenticate users
//     const authenticateUser = async(email, password, done) => {
//         try {
//             const user = await User.findOne({ email: email });
//             if (!user) {
//                 return done(null, false, { message: "No user found with that email" });
//             }

//             const match = await bcrypt.compare(password, user.password);
//             if (match) {
//                 return done(null, user);
//             } else {
//                 return done(null, false, { message: "Password incorrect" });
//             }
//         } catch (error) {
//             return done(error);
//         }
//     };

//     passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
//     passport.serializeUser((user, done) => done(null, user.id));
//     passport.deserializeUser(async(id, done) => {
//         try {
//             const user = await User.findById(id);
//             return done(null, user);
//         } catch (error) {
//             return done(error);
//         }
//     });
// }

// module.exports = initialize;



const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

function initialize(passport, getUserByEmail, getUserById) {
    // Function to authenticate users
    const authenticateUsers = async(email, password, done) => {
        console.log("Email:", email);
        console.log("Password:", password);

        const user = await getUserByEmail(email);
        console.log("User retrieved from DB:", user);


        if (user == null) {
            return done(null, false, { message: "No user found with that email" })
        }
        try {
            // Compare hashed password
            const match = await bcrypt.compare(password, user.password)
            if (match) {
                return done(null, user)
            } else {
                return done(null, false, { message: "Password Incorrect" })
            }
        } catch (e) {
            console.log(e);
            return done(e)
        }
    }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUsers))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async(id, done) => {
        try {
            const user = await getUserById(id)
            return done(null, user)
        } catch (e) {
            return done(e)
        }
    })
}

module.exports = initialize