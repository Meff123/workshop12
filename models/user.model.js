const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    username: { type: String},
    email: { type: String},
    password: { type: String },
    role: { type: String },
    access: { type: Boolean }
},{
    timestamps: true
})

module.exports = mongoose.model('users',userSchema)