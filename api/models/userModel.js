const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userModel = new Schema({

/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         email:
 *           type: string
 *         mobile:
 *           type: integer
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         password:
 *           type: string
 *         status:
 *           type: integer
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         __v:
 *           type: integer
 *         refreshToken:
 *           type: string
 *         refreshTokenExp:
 *           type: string
 *           format: date-time
 */


    email: {
        type: String,
        trim: true
    },
    mobile:{
        type: Number
    },
    firstName: {
        type: String,
        required: true,
        text: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        text: true,
        trim: true,
    },
    password:{
        type:String
    },
   
    status: {
        type: Number,
        enum: [0,1,2],//0-inactive,1-active,2-deleted
        required: true,     
    },
    refreshToken: {
        type: String,
    },
      refreshTokenExp: {
        type: Date,  
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }
});

// Export the model
module.exports =  userModel;
