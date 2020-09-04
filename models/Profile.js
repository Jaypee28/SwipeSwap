const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProfileSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    dateofbirth: {
        type: String
    },
    location: {
        type: String
    },
    subscriptionlevel: {
        type: String,
    },
    totalswaps: {
        type: String
    },
    totalswipes: {
        type: String
    },
    averagetimeofuse: {
        type: String
    },
    avatar: {
        type: String
    },
    coins:{
        type: String
    },
    rating: {
        type: String
    },
    badges: [
        {
            badgename: {
                type: String
            }
        }
    ],
    social: {
        google: {
            type: String
        },
        facebook: {
            type: String
        },
        instagram: {
            type: String
        }
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)