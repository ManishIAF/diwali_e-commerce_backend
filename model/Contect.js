const mongoose = require('mongoose')
const express = require('express')

const Schema = new mongoose.Schema({
    name : {
        type : String
    },
    email: {
        type : String
    },
    phone : {
        type : Number
    },
    message : {
        type : String
    }
});

const ContactModel = mongoose.model('Contact', Schema);

module.exports = ContactModel;