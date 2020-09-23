const express = require ("express");
const logger = require ("morgan");
const mongoose = require ("mongoose");
const compression = require ("compression");

const PORT = process.env.PORT || 3005; 

const app = express (); 

app.use (logger("dev"));

app.use( compression());
app.use( express.urlencoded({ extended: true}));
app.use (express.json());

app.use (express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/budget", {
    userNewURLParser: true,
    useUnfiedToplogy: true,
    useCreateIndex: true, 
    useFindandModify:false
});

// routes
app.use(require("./routes/api.js"));
app.listen(PORT, () => {
    console.log (`app running on port ${PORT}!`);
});