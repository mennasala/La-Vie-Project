const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userScema = mongoose.Schema(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Role",
    },
    fName: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    lName: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    age: {
      type: Number,
      min: 21,
      max: 60,
      default: 21,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
      vaidate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid Email");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      //match: "",
    },

    facebookEmail: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      vaidate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid facebook Email");
        }
      },
    },
    facebookPassword: {
      type: String,
      trim: true,
      //match: "",
    },

    Gmail: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      vaidate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid Gmail");
        }
      },
    },

    googlePassword: {
      type: String,
      trim: true,
      //match: "",
    },

    remember_me: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      trim: true,
      lowercase: true,
      enum: ["male", "female"],
    },
    dOfBirth: {
      type: Date,
    },
    image: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      vaidate(value) {
        if (!validator.isMobilePhone(value, "ar-EG")) {
          throw new Error("invalid phone Numbers");
        }
      },
    },
    adresses: [
      {
        adressType: {
          type: String,
          trim: true,
          required: true,
        },
        details: {},
      },
    ],
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],

    bookMarks: [],
    historyBought: [],
    points: {
      type: Number,
    },
    notifications: [
      {
        notification: {
          type: String,
        },
        read: {
          type: Boolean,
        },
      },
    ],
    education: {
      type: String,
    },
    qualification: {
      type: String,
      enum: ["Beginner", "Advanced", "Professional"],
    },
  },
  { timestamps: true }
);
userScema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcryptjs.hash(this.password, 8); 
}
if((this.facebookEmail==undefined && this.facebookPassword) ||  (this.facebookEmail && this.facebookPassword==undefined)){
    throw new Error("you must enter both facebook email and password")
}
if((this.Gmail==undefined && this.googlePassword) ||  (this.Gmail && this.googlePassword==undefined)){
    throw new Error("you must enter both Gmail and password")
}
if (this.isModified("facebookPassword")) {
    this.facebookPassword = await bcryptjs.hash(this.facebookPassword, 8);
}
if (this.isModified("googlePassword")) {
    this.googlePassword = await bcryptjs.hash(this.googlePassword, 8);
}
});
userScema.statics.loginUser = async (email, password, account) => {
  let userData, validatePassword; 
  if (account == "facebook") {
    userData = await User.findOne({ facebookEmail: email });
    validatePassword = await bcryptjs.compare(
      password,
      userData.facebookPassword
    );
  } else if (account == "gmail") {
    userData = await User.findOne({ Gmail: email });
    validatePassword = await bcryptjs.compare(password, userData.googlePassword);
  } else {
    userData = await User.findOne({ email });
    validatePassword = await bcryptjs.compare(password, userData.password);
  }
  if (!userData) throw new Error("invalid Email");
  if (!validatePassword) throw new Error("invalid password");
  return userData;
};
userScema.methods.generateToken = async function () {
  const userData = this;
  const token = jwt.sign({ _id: userData._id }, process.env.tokenPass);
  userData.tokens = userData.tokens.concat({ token });
  await userData.save();
  return token;
};
userScema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  delete data.password;
  delete data.tokens;
  return data;
};
const User = mongoose.model("User", userScema);

module.exports = User;
