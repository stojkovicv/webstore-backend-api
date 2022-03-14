const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Add a name!']
   },

    email: {
    type: String,
    require: [true, 'Add an e-mail'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },

  role:{
      type:String,
      enum: ['user', 'publisher'],
      default: 'user'
  },

  password:{
      type: String,
      required: [true, 'Add a password'],
      minlength: 6,
      select: false
  },
  
  resetPasswordToken: String,
  resetPasswordExpire: Date,

  createdAt: {
      type: Date,
      default: Date.now
  },

});

//Enkripcija sifre
UserSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


module.exports = mongoose.model('User', UserSchema);
