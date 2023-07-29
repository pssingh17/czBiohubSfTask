const mysql = require('mysql2')

var database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'czBiohubSF'
}).promise();
// After making a pool of connection, I am using async/await for querying to ensure that I receive data when querying Db
async function fibonacci(number) {
    if (number <= 1) { return number }
    // This step will check for our number if already present in database
    let existFibKeySql = `SELECT * FROM Fibonacci WHERE fibonaccikey=${number}`;
    let resultDb = await database.query(existFibKeySql);
    // console.log("result db", resultDb);

    if (resultDb[0] && resultDb[0].length > 0) {
        // console.log({ "Result from Db in Fibo function": resultDb[0][0].fibonacciValue });
        // Returning the value when found in database
        return resultDb[0][0].fibonacciValue
        // Else we will use calculate using fibnacci using recursion and then storing values in Db
        // Ensuring that no calculation is to be done if it is done once
    } else {
        console.log("Result does not exist in Db");
        let newResult= await fibonacci(number - 1) + await fibonacci(number - 2)
        let insertSql = `INSERT INTO Fibonacci(fibonacciKey, fibonacciValue) VALUES (${number}, ${newResult})`;
        try {
          const insertResult = await database.query(insertSql);
        //   console.log("Insertion result:", insertResult);
        } catch (insertErr) {
          console.error("Error while inserting:", insertErr);
        }
        return newResult
    }
    }
   
module.exports = fibonacci