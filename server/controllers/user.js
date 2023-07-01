const {StatusCodes } = require("http-status-codes")
const User = require("../models/User")
const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors")

const register = async (req,res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user: {
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        token
        }
    })
};

const login = async (req,res) => {
    const { email, password} = req.body;
    if(!email || !password) {
        throw new BadRequestError("Please provide email and password")
    }
    const user = await User.findOne({ email })
    if(!user) {
        throw new UnauthenticatedError("Invalid Credential");
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid Credential"); 
    }
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            token
        }
    })
};

const getProfile = async (req, res) => {
    const { userId } = req.user;
    const profile = await User.findOne({ _id: userId});
    if(!profile) {
        throw new UnauthenticatedError("Invalid Credential")
    };
    res.status(StatusCodes.OK).json({profile: {
        name: profile.name,
        lastName: profile.lastName,
        email: profile.email
    }})
};

const updateProfile = async (req, res) => {
    const {
        user:{userId},
        body: {email, name, lastName}
    } = req
    if (!email || !name || !lastName ) {
        throw new BadRequestError("Please provide all values");
      }
    const profile = await User.findOne({ _id: userId});

    profile.email = email;
    profile.name = name;
    profile.lastName = lastName;
  
    await profile.save();
    const token = profile.createJWT();
    res.status(StatusCodes.OK).json({
      profile: {
        email: profile.email,
        lastName: profile.lastName,
        name: profile.name,
        token,
      },
    });

}

module.exports = {register,
                  login,
                  getProfile,
                  updateProfile
                }
