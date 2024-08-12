const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: String,
    default: "false",
  },
  isActive: {
    type: String,
    default: "true"
  },
  emailNotifications: {
    type: String,
    default: "true"
  },
  gender: {
    type : String,
    enum : ['M','F','O']
  },
  skills : {
    type :String,
    default : "newbie",
  },

  locationCoord : {
    type : [String]
  },
  locationAdd:{
    type: String
  },
  expectedwage: {
    type : Number,
    default : 0
  },
  image:{
    type: String,
    default : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  },
  PANimage:{
    type: String
  },
  DOB : {
    type: Date
  },
  rating:{
    type: Number,
    default : 1
  },

  savedProfiles:{
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
    index: true,
    sparse: true
  }

},{ timestamps: true });




userSchema.pre("save", async function (next) {
  // console.log("pre method", this);
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});



// json web token
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// define the model or the collection name
const User = new mongoose.model("User", userSchema);
module.exports = User;

