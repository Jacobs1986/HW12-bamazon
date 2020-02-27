const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hnc13rt!*",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`)
    showTable();
    itemSearch(3, 102);
    connection.end()
});

// functions
showTable = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        console.table(res);
    });
};

itemSearch = (productID, requestedQuantity) => {
    connection.query("SELECT * FROM products WHERE item_id=?", [productID], (err, res) => {
        if (err) throw err;
       console.log(res[0].product_name, res[0].stock_quantity);
       if (requestedQuantity > res[0].stock_quantity) {
           console.log("There are not enough items to complete this order.")
       } else {
           console.log("We will fill this order.")
       }
    })
}