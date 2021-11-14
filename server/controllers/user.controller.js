const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { singleFileUpload } = require('../utils/imageUpload');
const errorHandler = require('../utils/errorHandler');
const formatFilterData = require('../utils/formatFilterData');
const generateAndHashPass = require('../utils/passGenerator');

function generateToken(id) {
    return token = jwt.sign({
        _id: id
    }, process.env.JWT_SECRET,
        { expiresIn: '10d' })
}



const saveUser = async (req, res) => {
    const { email, username, firstname, lastname } = req.body;
    if (!email || !username || !firstname || !lastname)
        return res.status(400).json({ msg: "Fields missing !" })
    const existinguser = await User.findOne({ email: email });
    if (existinguser)
        return res.status(400).json({ msg: "An account with this email already exists !" })
    if (!username)
        username = email

    
    const user = new User();
    user.email = email;
    user.password = await generateAndHashPass(12);
    user.username = username;
    const role = await Role.findOne({ label: 'USER' });
    user.roles = [role._id];
    if (firstname)
        user.firstname = firstname;
    if (lastname)
        user.lastname = lastname;
    const result = await user.save();
    return result;
}

function userResponse(data) {
    const {
        _id,
        username,
        firstname,
        lastname,
        email,
        phone,
        city,
        roles,
        createdAt,
        imagePath
    } = data;
    const userResp = {
        _id,
        username,
        firstname,
        lastname,
        email,
        phone,
        city,
        role: roles[0]._id,
        isAdmin: roles[0].label == "ADMIN" ? true : false,
        createdAt,
        imagePath
    }
    return userResp;
}

module.exports.register = async (req, res) => {
    try {
        await saveUser(req, res);
        res.status(201).json(true);
    } catch (err) {
        const { status, message } = errorHandler(err)
        res.status(status).json(message)
    }
}
module.exports.add = async (req, res) => {
    try {
        const result = await saveUser(req, res);
        const newUser = await User.findById(result._id)
            .select('_id username createdAt')
            .populate({ path: 'roles', model: 'Role', select: 'label' }).exec();
        res.status(201).json(newUser);
    } catch (err) {
        const { status, message } = errorHandler(err)
        res.status(status).json(message)
    }
}

module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ msg: "Fields missing !" })

        const userQuery = {
            $or: [{
                "email": username
            }, {
                "username": username
            }]
        }

        const user = await User.findOne(userQuery)
            .populate({ path: 'roles', model: 'Role', select: 'label' }).exec();
        if (!user)
            return res.status(404).json({ msg: "Account does not exist !" })
        if (!user.enabled)
            return res.status(400).json({ msg: "Account disabled !" })


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(404).json({ msg: "Invalid Credentials !" })

        const token = generateToken(user._id);
        const response = userResponse(user)
        response.token = token;
        res.status(200).json(response);
    } catch (err) {
        const { status, message } = errorHandler(err)
        res.status(status).json(message)
    }
}

module.exports.refresh = async (req, res) => {
    try {
        const verifUser = jwt.verify(req.header("x-auth-token"), process.env.JWT_SECRET, {
            ignoreExpiration: true
        });
        const user = await User.findById(verifUser._id);
        const token = generateToken(user._id);
        res.status(200).json({ token });
    } catch (err) {
        const { status, message } = errorHandler(err)
        res.status(status).json(message)
    }
}

module.exports.uploadImage = async (req, res) => {
    try {
        await singleFileUpload(req, res, 'user', 'images/users', async (filename) => {
            const user = await User.findOne({ _id: req.user });
            user.imagePath = filename;
            await user.save();
            return res.status(200).send(req.file)
        })
    } catch (err) {
        const { status, message } = errorHandler(err)
        res.status(status).json(message)
    }
}

module.exports.update = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.user });
        if (!user) {
            res.status(404).send('User no found !')
        } else {
            user = await User.findOneAndUpdate({ _id: req.user }, req.body, { new: true });
            user.password = undefined;
            user.mails = undefined;
            user.accounts = undefined;
            const response = userResponse(user)
            res.status(200).json(response);
        }
    } catch (e) {
        console.log('ERROR', e);
        res.status(400).send('Error adding a User')
    }
}

module.exports.edit = async (req, res) => {
    try {
        const userDetails = req.body;
        let user = await User.findOne({ _id: userDetails._id });
        if (!user) {
            res.status(404).send('User no found !')
        } else {
            user = await User.findOneAndUpdate({ _id: userDetails._id }, userDetails, { new: true })
            const response = await User.findById(user._id).select('_id username createdAt')
                .populate({ path: 'roles', model: 'Role', select: 'label' }).exec();
            res.status(200).json(response);
        }
    } catch (err) {
        const { status, message } = errorHandler(err)
        res.status(status).json(message)
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        const { password, newPassword, newPasswordCheck } = req.body;
        let user = await User.findOne({ _id: req.user });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(404).json({ msg: "Invalid Password !" })

        if (newPassword != newPasswordCheck)
            return res.status(400).json({ msg: "Password and Password Check do not match!" })

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json(true);
    } catch (err) {
        const { status, message } = errorHandler(err)
        res.status(status).json(message)
    }
}

module.exports.findAll = async (req, res) => {
    try {
        const users = await User.find().select('_id username createdAt')
            .populate({ path: 'roles', model: 'Role', select: 'label' }).exec();
        res.status(200).json(users);
    } catch (err) {
        const { status, message } = errorHandler(err)
        res.status(status).json(message)
    }
}

module.exports.findAllGrid = async (req, res) => {
    const { page = 1, limit = 20, filterData, sortField, sortDir } = req.body;
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        select: 'username createdAt',
        lean: true,
        sort: {},
        populate: { path: 'roles', model: 'Role', select: 'label' }

    };
    const query = {
        enabled: true,
        ...formatFilterData(filterData)
    };

    if (sortField && sortDir) {
        options.sort = {
            [sortField]: sortDir
        }
    }
    try {
        const productsList = await User.paginate(query, options);
        res.status(200).json(productsList);
    } catch (err) {
        const { status, message } = errorHandler(err)
        res.status(status).json(message)
    }
}

module.exports.findOne = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password -mails -accounts -createdAt -updatedAt -__v');
        res.status(200).json(user);
    } catch (err) {
        const { status, message } = errorHandler(err)
        res.status(status).json(message)
    }
}

module.exports.remove = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch)
            return res.status(400).json({ msg: "Wrong password !" })
        await User.deleteOne({ _id: req.params.id });
        res.status(200).json(true);
    } catch (err) {
        const { status, message } = errorHandler(err)
        res.status(status).json(message)
    }
}

module.exports.removeUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id });
        res.status(200).json(true);
    } catch (err) {
        const { status, message } = errorHandler(err)
        res.status(status).json(message)
    }
}
