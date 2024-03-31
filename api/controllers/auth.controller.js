import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';

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
    if(!email || !password || email === '' || password === '') {
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