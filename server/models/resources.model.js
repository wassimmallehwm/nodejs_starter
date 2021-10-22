const mongoose = require('mongoose');


const ResourceSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
        unique: true
    },
    enabled : {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Resource', ResourceSchema);