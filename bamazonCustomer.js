const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Hnc13rt!*",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`)
    showTable();
    // itemSearch(3, 50);
    // updateProduct();
});

// questions for user to select product for purchase
let questionsSelect = [
    {
        type: "number",
        name: "productID",
        message: "Select the product you want to purchase by its ID number: "
    },
    {
        type: "number",
        name: "productQuantity",
        message: "How much of this product do you need: "
    }
];

// functions
// show the current table
showTable = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        console.table(res);
        userSelect();
    });
};

// user selects product they want
userSelect = () => {
    inquirer.prompt(questionsSelect).then(answers => {
        // console.log(answers);
        itemSearch(answers.productID, answers.productQuantity);
    });
};

// search for product
itemSearch = (productID, requestedQuantity) => {
    connection.query("SELECT * FROM products WHERE item_id=?", [productID], (err, res) => {
        if (err) throw err;
        let productName = res[0].product_name;
        let currentStock = res[0].stock_quantity;
        let price = res[0].price;
        if (requestedQuantity > currentStock) {
            console.log("There are not enough items to complete this order.")
        } else {
            console.log("We will fill this order.")
            updateProduct(productName, productID, requestedQuantity, currentStock, price)
        }
    })
}

// update product quantity
updateProduct = (productName, productID, requestedQuantity, currentStock, price) => {
    // console.log(productID, requestedQuantity, currentStock);
    let newStock = currentStock - requestedQuantity;
    let totalPrice = requestedQuantity * price;
    // console.log(newStock)
    connection.query("UPDATE products SET ? WHERE ?", [
        {
            stock_quantity: newStock
        },
        {
            item_id: productID
        }
    ],
        function (err, res) {
            if (err) throw err;
            console.log(`We have recieved your order for ${productName}.\nYour total comes to: $${totalPrice}`)
            // showTable();
            connection.end()
        });
};