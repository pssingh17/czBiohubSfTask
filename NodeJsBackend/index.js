const express = require("express");
const cors = require("cors");
const fibonacci = require('./fibonacci')
const mysql = require('mysql2')

var database = mysql.createPool({
  // Could have used .env file as well but for simplicity I have used directly but I never follow this in production
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'czBiohubSF'
}).promise();

const app = express();

// These below are used to make sure that I dont get cors error, getting client data in json and using url encoded format respectively
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;



    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
   



app.get("/", (req,res)=>{
  console.log("Working Endpoint")
  res.send("Success")
})


// Here when we receive request, I use fibonacci function which is explained in fibonacci.js file
// Result= which will Nth element of our result.
// Then I am making a query request again to Database and get all the N elements in array and sent to frontend
app.post("/getResult", async (req, res) => {
  const number = parseInt(req.body.number);
    // console.log("FrontendData", number)
    const result = await fibonacci(number);
    let getElemsSql = `SELECT * FROM Fibonacci WHERE fibonaccikey<${number}`;
    let allElem = await database.query(getElemsSql);
    // console.log("all elements", allElem)
    let finalArray = await allElem[0].map(elem=>{
      return elem.fibonacciValue
    })
    res.json({ "Result": finalArray !== undefined ? finalArray : "Invalid number provided" });
  
});





