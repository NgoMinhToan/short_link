const mongoose = require('mongoose')
const linkSchema = mongoose.Schema({
    url: {type: String, required: true},
    short: {type: String, unique: true, required: true},
    timeStamp: {type: Date, default: Date.now()}
})

const isValidHttpUrl = (string) => {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;  
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

linkSchema.pre('save', function (next) {
    let link = this
    if(!isValidHttpUrl(link.url)) {
        return next(new Error('Invalid url'))
    }
    next()
})

const linkModel = mongoose.model(process.env.MONGO_COLLECTION, linkSchema)
module.exports = linkModel