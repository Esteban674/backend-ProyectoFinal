import dotenv from 'dotenv'

const enviroment = "DEVELOPMENT"

dotenv.config({
    path: enviroment === "PRODUCTION" ? './.env.production' : './.env.development'
})

export default {
    port: process.env.PORT,
    mongoURL: process.env.MONGODBURL,
    selectedDB: process.env.SELECTEDDB,
    signedCookie: process.env.SIGNED_COOKIE,
    sessionSecret: process.env.SESSION_SECRET,
    salt: process.env.SALT,
    appId: process.env.APP_ID,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callBackUrl: process.env.CALLBACK_URL,
}


