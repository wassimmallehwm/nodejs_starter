const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    phone: {
        type: String
    },
    city: {
        type: String
    },
    birthdate: {
        type: Date
    },
    roles: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Role'
    },
    imagePath : {
        type: String,
        default: 'user_default'
    },
    enabled : {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', UserSchema);