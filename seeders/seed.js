const mongoose = require ("mongoose");
const db =require ("../models");

mongoose.connect(process.env.MONGOD_URI || "mongob:// localhost/budget", { 
    usenewUrlParser:true, 
    usefindandmodify: false
});

const budgetseed= 
{
    date: new Date (new Date(). setDate (new Date(). getDate() -1)),
    name: "open balance",
    value: 20000, 

}

db.budget.deleteMany({})
.then(() => db.budget.collection.insertMany(budgetseed ))
.then(data => {
    console.log(data.result.n + "records inserted!");
    process.exit (0);
})
.catch(err => {
    console.error(err);
    process.exit (1);
});