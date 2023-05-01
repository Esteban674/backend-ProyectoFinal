import local from 'passport-local';
import passport from 'passport';
import jwt from 'passport-jwt';
import GitHubStrategy from 'passport-github2';
import { managerUser } from '../services/user.services.js';
import { managerCarts } from '../services/cart.services.js';
import { createHash, validatePassword } from '../utils/bcrypt.js';
import { generateToken } from "../utils/jwt.js";

//Passport se va a trabajar como un middleware
const LocalStrategy = local.Strategy; //Defino mi estrategia

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {

    const cookieExtractor = req => {
        const token = req.cookies ? req.cookies.jwtCookie : {}
        return token
    }

    //Definir donde se aplican mis estrategias    
    
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), //Extrae el token desde las cookies
        secretOrKey: process.env.PRIVATE_KEY_JWT 
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }

    }));

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body
            try {
                const user = await managerUser.getElementByEmail(username)
                if (user) {
                    return done(null, false)
                }
                const passwordHash = createHash(password)
                //crear el carrito 
                const cart = await managerCarts.addElement({ products: [] });

                const userCreated = await managerUser.addElement({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    age: age,
                    password: passwordHash,
                    id_cart: cart._id
                })
                const accessToken = generateToken(userCreated)
                console.log(accessToken)
                return done(null, userCreated)
            } catch (error) {
                return done(error)
            }
        }))

    //Inicializar la session del user
    passport.serializeUser((user, done) => {
        done(null, user._id );
    })

    //Eliminar la session del user
    passport.deserializeUser(async (id, done) => {
        const user = await managerUser.getElementById(id)
        done(null, user)
    })

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {

        try {
            const user = await managerUser.getElementByEmail(username)

            if (!user) { //Usuario no encontrado
                return done(null, false)
            }
            if (validatePassword(password, user.password)) { //Usuario y contraseña validos
                const accessToken = generateToken(user)
                console.log(accessToken)
                return done(null, user);
            }

            return done(null, false) //Contraseña no valida

        } catch (error) {
            return done(error)
        }
    }))

    passport.use('github', new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
            const user = await managerUser.getElementByEmail(profile._json.email);
            if(user){
                done(null, user)
            }else{
                const userCreated = await managerUser.addElement({
                    first_name: profile._json.name,
                    last_name: '',
                    email: profile._json.email,
                    age: 20,
                    password: ''
                })
                done(null, userCreated)
            }
        } catch (error) {
            return done(error)
        }
    }))

}

export default initializePassport