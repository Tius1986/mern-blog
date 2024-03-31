import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
    
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
    if(!username || !email || 
        !password || username === '' || 
        email === '' || password === ''
    ) {
        return res.status(400).json({ messagge: 'Tutti i sono campi sono obbligatori' })
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
        
    } catch(err) {
        res.status(500).json({ message: err.message })
    }

    res.json('Signup successful')
}