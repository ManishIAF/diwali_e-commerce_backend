const mongoose = require('mongoose')
const express = require('express')
const userInfo = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    addresses: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "registations",
    },
    userRole: {
        type: String,
        ref: 'registations'
    },
    cart : {
        type : Array
    },
    wishtList : {
        type : Array
    },
    buyorderIds: [{
        type: mongoose.Schema.ObjectId,
        ref: 'OrderTrack' 
    }],
    sellorderIds : [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'OrderTrack' 
        }
    ]
});

const UserInfo = mongoose.model("userInfo", userInfo)

module.exports = UserInfo;