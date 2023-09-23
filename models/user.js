const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'Please enter valid email address'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        lowercase: true,
        minlength: [6, 'Minimum password length is 6 characters']
    },
    name: {
        type: String,
        required:true,
    },
    phone: {
        type: String,
        required:true,
    },
    role: {
        type: String,
        required: true,
        lowercase: true
    }
});

/*userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    console.log(salt);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});*/

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = (password==user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };

const User = mongoose.model('user', userSchema);

module.exports = User;