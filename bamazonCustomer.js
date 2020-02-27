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
    connection.end()
});

// functions
showTable = () => {
    connection.query("SELECT * FROM products", (err, res) => {
        if (err) throw res;
        console.table(res);
    });
};