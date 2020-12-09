const express = require("express")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express()
const auth = require("~/express-tools/middlewares/auth");
const User = require("~/models/User")
const bodyParser = require('body-parser')

import dbConnect from '~/utils/dbConnect';

dbConnect()

const EXPRESS_JWT_MAXAGE_IN_DAYS = !!process.env.EXPRESS_JWT_MAXAGE_IN_DAYS ? parseInt(process.env.EXPRESS_JWT_MAXAGE_IN_DAYS) : 1

console.log('--- EXPRESS_JWT_MAXAGE_IN_DAYS')
console.log(EXPRESS_JWT_MAXAGE_IN_DAYS)

// Create application/json parser
const jsonParser = bodyParser.json()

/**
 * @method - POST
 * @param - /users/signup
 * @description - User SignUp
 */

router.post(
    "/signup",
    jsonParser,
    [
        body("username", "Please Enter a Valid Username")
            .not()
            .isEmpty(),
        body("email", "Please enter a valid email").isEmail(),
        body("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            email,
            password
        } = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                username,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: EXPRESS_JWT_MAXAGE_IN_DAYS * 24 * 60 * 60,
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

/**
 * @method - POST
 * @param - /users/login
 * @description - User SignIn
 */

router.post(
    "/login",
    jsonParser,
    [
        body("email", "Please enter a valid email").isEmail(),
        body("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
        }

        const { email, password } = req.body;
        try {
        let user = await User.findOne({
            email
        });
        if (!user)
            return res.status(400).json({
            message: "User Not Exist"
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
            message: "Incorrect Password !"
            });

        const payload = {
            user: {
            id: user.id
            }
        };

        jwt.sign(
            payload,
            "randomString",
            {
                expiresIn: EXPRESS_JWT_MAXAGE_IN_DAYS * 24 * 60 * 60,
            },
            (err, token) => {
            if (err) throw err;
            res.status(200).json({ token });
            }
        );
        } catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
        }
    }
);

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /users/me
 */


router.get("/me", auth, async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await User.findById(req.user.id);
      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
});

router.get("/counter", async (req, res) => {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const usersCount = await User.countDocuments();
      res.json({ counter: usersCount });
    } catch (e) {
      res.send({ message: "Error in Fetching users" });
    }
});  

module.exports = router;