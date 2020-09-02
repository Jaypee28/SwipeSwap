const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const auth = require('../../middleware/auth')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')

const User = require('../../models/User')

// @route   GET api/auth
// @des     Test route
// @access  public
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id)
        res.json(user)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// @route   POST api/auth
// @des     Authenticate user & get token
// @access  Public
router.post('/', async (req, res) => {
  const { email, password } = req.body
        
        try {
            let user = await User.findOne({ email })

            if(!user){
                return res.send(false)
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                {expiresIn: 360000},
                (err, token) => {
                    if(err) throw err
                    res.json({ token })
                }
            )
            
        } catch(err) {
            console.error(err.message)
            res.status(500).send('Server error') 
        }
        
    }
)

module.exports = router