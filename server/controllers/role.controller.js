const mongoose = require('mongoose');
const Role = require('../models/role.model');
const errorHandler = require('../utils/errorHandler');

module.exports.create = async (req, res) => {
    try{
        const role = new Role(req.body);
        const result = await role.save();
        const {_id, label} = result;
        res.status(201).json({_id, label});
    } catch (err) {
        const {status, message} = errorHandler(err)
        res.status(status).json(message)
    }
}

module.exports.update = async (req, res) => {
    try{
        const role = await Role.findOneAndUpdate(
            { _id: req.body._id },
            req.body,
            { new: true }
        )
        res.status(200).json(role);
    } catch (err) {
        const {status, message} = errorHandler(err)
        res.status(status).json(message)
    }
}

module.exports.findAll = async (req, res) => {
    try{
        const rolesList = await Role.find();
        res.status(200).json(rolesList);
    } catch (err) {
        const {status, message} = errorHandler(err)
        res.status(status).json(message)
    }
}

module.exports.findOne = async (req, res) => {
    try{
        const role = await Role.findById(req.params.id);
        res.status(200).json(role);
    } catch (err) {
        const {status, message} = errorHandler(err)
        res.status(status).json(message)
    }
}

module.exports.remove = async (req, res) => {
    try{
        await Role.deleteOne({ _id: req.params.id });
        res.status(200).json(true);
    } catch (err) {
        const {status, message} = errorHandler(err)
        res.status(status).json(message)
    }
}