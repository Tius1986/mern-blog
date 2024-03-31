import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
// import { restart } from 'nodemon';

export const signup = async (req, res, next) => {
    
    // Destructuring
    // username, email e password sono ottenuti
    // mediante req.body
    const { username, email, password } = req.body

    /**
     * Ritorna un file json tutti i 
     * messaggi sono obbligatori se
     * i campi username, email e password 
     * non sono true o siano una stringa vuota.
     * Come compilare campi nel form.
     * */
    if(!username ||
        !email ||
        !password ||
        username === '' ||
        email === '' ||
        password === '') {
        next(errorHandler(400, 'Tutti i campi sono obbligatori'))
    }

    // Crypta la password.
    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    try {
        // Salva nuovo utente
        await newUser.save()
        res.json('Signup successful')
        
    } catch(err) {
        next(err)
    }
}

export const signin = async (req, res, next) => {

    const { email, password } = req.body

    if(!email || !password || email === '' || password === '') {
        next(errorHandler(400, 'Tutti i campi sono obbligatori'))
    }

    try {

        const validUser = await User.findOne({ email })

        if(!validUser) {
            return next(errorHandler(404, 'User not found'))
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password)

        if(!validPassword) {
            return next(errorHandler(400, 'Invalid password'))
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)

        // Ritorna validUser senza password
        const { password: pass, ...rest } = validUser._doc

        // Invia Cookie al Client
        res.status(200).cookie('access_token', token, {
            httpOnly: true}).json(rest)

    } catch(error) {
        next(error)
    }
}