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

  createTable();

});

function createTable() {
  
  var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      console.log("Item ID: " + res[i].item_id + "\nProduct Name: " + res[i].product_name + "\nDepartment Name: " + res[i].department_name + "\nPrice: " + res[i].price + "\nStock Quantity: " + res[i].stock_quantity);
      console.log("-------------------------------------------------------");
    }

    start(res);
  });
}

function start(res) {

  inquirer
  .prompt(
  {
    name: "id",
    type: "input",
    message: "What is the ID of the product you would like to buy?",
    validate: function (value) {
      if (isNaN (value) == false) {
          return true;
      } else {
          return false;
      }
    }
  })
  .then(function(answer) {

    if (answer.id > res.length) {
      console.log("Thats not a valid ID");
      start(res);
    }

    for (var i=0; i < res.length; i++) {
      if (res[i].item_id == answer.id) {
        var id = i;

        console.log(id);

      inquirer
      .prompt(
      {
        name: "units",
        type: "input",
        message: "How many units of this product?",
        validate: function (value) {
          if (isNaN (value) == false) {
              return true;
          } else {
              return false;
          }
        }
      })
        .then(function(answer) {

        console.log(res[id]);
        
        if (answer.units > res[id].stock_quantity) {
          console.log("Store does have that much in stock");
          start(res);
        }

        var query = "UPDATE products SET stock_quantity='" + (res[id].stock_quantity - answer.units) + "' WHERE item_id='" + res[id].item_id +"'";

        connection.query(query, function(err, res) {
          if (err) throw err;

          // console.log(res[id]);
          // var cost = (answer.units * res[id].price)

          // console.log("You bought " + answer.units + " " + res[id].item_id + " for " + cost);

          console.log("product bought");
          createTable();;
        });
      })
    }}
  });
}