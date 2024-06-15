const mongoose = require('mongoose')
const express = require('express')

const Schema = new mongoose.Schema({
   name : {
      type: String, 
      require: true,
   },
   email:{
      type: String, 
      require: true,
      unique : true
   },
   password: {
       type: String,
       require: true,
      
   },
   role:{
       type: String,
       require: true,
       default: "user",
   }
});

const UserModel = mongoose.model('User', Schema);

module.exports = UserModel;