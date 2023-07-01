const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        maxlength: 50,
        minlength: 4,
        trim: true,
        unique: true,
      },
      email: {
        type: String,
        required: [true, "Please provide email"],
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Please provide a valid email",
        ],
        unique: true,
      },
      password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 6,
        trim: true,
      },
      mission: {
        type: String,
        required: [true, "Please provide mission"],
      },
      logo: {
        type: String,
        required: [true, "Please provide logo"],
      },
      feedback: [{
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          required: true
        },
        rating: {
          type: Number,
          required: true,
          enum: [0.5,1,2,3,4,5]
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now
        }
      }],
      paymentMethod: {
        type: String,
        default: '', //the organization's Payment account information
      },
      description: String,
      website: String,
      phone: String,
      adress: String,
      images: [String],
      causes: [String], // such as "Education", "Environment", "Healthcare"
      donationsReceived: {
        type: Number,
        default: 0,
      },
})

OrganizationSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

OrganizationSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id, name: this.name },process.env.JWT_SECRET,{ expiresIn: "30 days", }
  );
};

OrganizationSchema.methods.comparePassword = async function(candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};


module.exports = mongoose.model("Organization", OrganizationSchema);