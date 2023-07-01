const {StatusCodes } = require("http-status-codes")
const Organization = require("../models/Organization")
const User = require("../models/User")
const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors")
const mongoose = require("mongoose")

const register = async (req,res) => {
    const organization = await Organization.create({ ...req.body });
    const token = organization.createJWT();
    res.status(StatusCodes.CREATED).json({
        organization: {
        name: organization.name,
        email: organization.email,
        phone: organization.phone,
        token
        }
    })
};

const login = async (req,res) => {
    const { email, password} = req.body;
    if(!email || !password) {
        throw new BadRequestError("Please provide email and password")
    }
    const organization = await Organization.findOne({ email })
    if(!organization) {
        throw new UnauthenticatedError("Invalid Credential");
    }
    const isPasswordCorrect = await organization.comparePassword(password);
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError("Invalid Credential"); 
    }
    const token = organization.createJWT();
    res.status(StatusCodes.CREATED).json({
        organization: {
            name: organization.name,
            email: organization.email,
            phone: organization.phone,
            token
        }
    })
};

const getProfile = async (req, res) => {
    const {id} = req.params;
    const organization = await Organization.findOne({ _id: id })
    if(!id) {
        throw new NotFoundError(`No organization with name: ${id}`)
    }
    res.status(StatusCodes.OK).json({organization: {
      name: organization.name,
      email: organization.email,
      mission: organization.mission,
      logo: organization.logo,
      paymentMethod: organization.paymentMethod,
      phone: organization.phone,
      images: organization.images,
      causes: organization.causes,
      donationsReceived: organization.donationsReceived,
      feedback: organization.feedback,
      adress: organization.adress,
    }});
};

const updateProfile = async (req, res) => {
    const {
    user: { userId },
    params: { id: OrganizationId }
  } = req;
  if(userId !== OrganizationId) {
    throw new UnauthenticatedError("You do not have permission to perform this action.");
  }
    const { email, name, mission, logo, description} = req.body;
    if (!email || !name || !mission || !logo || !description) {
      throw new BadRequestError("Please provide all values");
    }
    const organization = await Organization.findOneAndUpdate({ _id: req.user.userId }, req.body, { new: true, runValidators: true });
  
    const token = organization.createJWT();
    res.status(StatusCodes.OK).json({organization: {
      name: organization.name,
      email: organization.email,
      mission: organization.mission,
      logo: organization.logo,
      paymentMethod: organization.paymentMethod,
      phone: organization.phone,
      images: organization.images,
      causes: organization.causes,
      donationsReceived: organization.donationsReceived,
      feedback: organization.feedback,
      adress: organization.adress,
    }, token});
  };


const removeProfile = async (req, res) => {
    const {
        user: { userId },
        params: { id: OrganizationId }
      } = req;
      if(userId !== OrganizationId) {
        throw new UnauthenticatedError("You do not have permission to perform this action.");
      }
      const organization = await Organization.findOneAndDelete({ _id: userId})
      if (!organization) {
        throw new NotFoundError(`No organization with id ${userId}`);
      }
      res.status(StatusCodes.OK).send();

}

const getOrganizations = async (req,res) => {
    const { search, causes, sort } = req.query;
    const queryObject = {};
  
    if (search) {
      queryObject.name = { $regex: search, $options: "i" };
    }
  
    if (causes && causes !== "all") {
      queryObject.causes = causes;
    }
  
    let result = Organization.find(queryObject);

    if (sort === "a-z") {
      result = result.sort("name");
    }
    if (sort === "z-a") {
        result = result.sort("-name");
    }

      const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 14;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const organizations = await result;

  const totalOrgs = await Organization.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalOrgs / limit);

  res.status(StatusCodes.OK).json({ organizations, totalOrgs, numOfPages });
};



const getFeedbacks = async (req,res) => {
const { id } = req.params;

    const organization = await Organization.findOne({ _id: id }).populate('feedback.user', "name lastName");
    const feedbacks = organization.feedback.map((feedback) => ({
      _id: feedback._id,
      name: feedback.user.name,
      lastName: feedback.user.lastName,
      rating: feedback.rating,
      comment: feedback.comment,
      createdAt: feedback.createdAt,
    }));

    res.status(StatusCodes.OK).json({ feedbacks });
};


const addFeedback = async (req, res) => {
    const {
        user: {userId},
        params: { id: OrganizationId},
        body: { rating, comment}
    } = req;
    const organization = await Organization.findOne({ _id: OrganizationId});

    organization.feedback.push({
        user: userId,
        rating: rating,
        comment: comment,
        _id: new mongoose.Types.ObjectId()
    })
    await organization.save();
    res.status(StatusCodes.OK).json({organization})
};

const removeFeedback = async (req,res) => {
    const {
        user: {userId},
        params: {id: OrganizationId, feedbackId}
    } = req;
    if(userId !== OrganizationId) {
        throw new UnauthenticatedError("You do not have permission to perform this action.")
    }
    const organization = await Organization.findOneAndUpdate(
        { _id: OrganizationId },
        { $pull: { feedback: { _id: feedbackId } } },
        { new: true }
      );
  
      res.status(StatusCodes.OK).json({});
}
 
module.exports = {register,
                  login,
                  getProfile,
                  updateProfile,
                  removeProfile,
                  getOrganizations,
                  getFeedbacks,
                  addFeedback,
                  removeFeedback
                }
