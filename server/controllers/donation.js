const {StatusCodes } = require("http-status-codes");

const getDonation = (req, res) => {
    res.status(StatusCodes.OK).json({test: "donation number 1"})
};

const addDonation = (req, res) => {
    res.status(StatusCodes.OK).json({test: "donation added successfully"})
};

module.exports = {getDonation, addDonation}