var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "poop",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});

function start() {

    var query = "SELECT * FROM products";
    connection.query(query, function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      console.log(res);
    });

    inquirer
    .prompt([
    {
      name: "id",
      type: "input",
      message: "What is the ID of the product you would like to buy?"
    },
    {
        name: "units",
        type: "input",
        message: "How many units of this product?"
    }])
    .then(function(answer) {


    });
}