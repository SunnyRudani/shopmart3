"use strict";
var mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const { string } = require("joi");
const SALT_WORK_FACTOR = 10;
var productSchema = new mongoose.Schema(
    {
      shopName:{
        type: String,
            required: true,
            trim: true,
      },
price:{
    type: Number,
            required: true,
            // unique: true,
            trim: true,

},
        offerPrice: {
            type: Number,
            // required: true,
            // unique: true,
            trim: true
            // lowercase: true,
            // match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        },
productImage:{
type:String,
trim:true,
default:""
},
        discount: {
            type: Number,
            // required: true,
            trim: true,
        },
        key: {
            type: String,
            default: "",
            trim: true,
          },
        productName: {
          type: String,
          required: true,
          trim: true,
      },
        rating: {
            type: Number,
            // default: false,
          trim: true,

        },

        category:{
            type:String,
            required:true,
            trim:true
        },
        forgetPasswordOtpExpireTime: {
            type: Date,
        },
        accountActivationCode: {
          type: String,
      },
        createdBy: {
            type: String,
            default: false,
        },

    },
    {
        timestamps: true,
    }
);

var product = mongoose.model("products", productSchema);
module.exports = product;
