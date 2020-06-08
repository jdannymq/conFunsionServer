const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaderSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        default: ''
    },
    abbr: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        require: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

var leaders = mongoose.model('Leaders', leaderSchema);

module.exports = leaders;