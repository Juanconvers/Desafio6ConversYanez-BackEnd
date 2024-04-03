import local from 'passport-local'
import passport from 'passport'
import { userModel } from '../../../models/user'
import { createHash, validatePassword } from '../../../utils/bcrypt'

const localStrategy = local.Strategy

const initializePassport = () => {
    
    passport.use('register', new locaStrategy({ passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) => {
        try {
            const { first_name, last_name, email, password, age } = req.body
            const findUser = await userModel.findOne({ email: email })
            if (findUser) {
                return done(null, false)
            } else {
                const user = await userModel.create({ first_name: first_name, last_name: last_name, email: email, age: age, password: createHash(password) })
                return done(null, user)
            }
        } catch (e) {
            return done(e)
        } 
    }))
}