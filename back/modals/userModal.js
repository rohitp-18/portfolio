const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please provide your name"],
    },

    email: {
      type: String,
      unique: true,
      require: [true, "Please provide your email"],
    },

    password: {
      type: String,
      require: [true, "Please Enter any password"],
    },

    avatar: {
      public_id: {
        type: String,
        require: true,
      },
      url: {
        type: String,
        require: true,
      },
    },

    role: {
      type: String,
      default: "user",
    },

    createdAt: {
      type: Date,
      default: new Date(Date.now()),
    },

    updatedAt: [
      {
        date: {
          type: Date,
          default: new Date(Date.now()),
        },
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 9);
  }
  return;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("uses", userSchema);

module.exports = User;
