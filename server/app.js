require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");
const organizationRoute = require("./routes/organization");
const userRoute = require("./routes/user");
const donationRoute = require("./routes/donation");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-hanlder");

app.use(express.json());


app.use("/api/v1/organizations", organizationRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/donations", donationRoute);

app.use(notFound);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 3001;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`server listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start()