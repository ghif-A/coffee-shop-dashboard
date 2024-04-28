require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express');
const pool = require(__dirname + "/config/db.config.js");

const app = express();

const PORT = process.env.PORT || 9000;

const getProducts =  (req, res) => {
  pool.query('SELECT * FROM product', (error, products) => {
    if (error) {
      throw error
    }
    res.status(200).json(products.rows)
  })
}

const getDailySalesByStore = (req, res) => {
  pool.query(
    'SELECT so.store_address, TO_CHAR(sr.transaction_date, \'YYYY-MM-DD\') AS transaction_date, SUM(sr.line_item_amount) AS total_sales FROM sales_outlet so JOIN sales_receipts sr ON so.sales_outlet_id = sr.sales_outlet_id GROUP BY so.store_address, TO_CHAR(sr.transaction_date, \'YYYY-MM-DD\') ORDER BY TO_CHAR(sr.transaction_date, \'YYYY-MM-DD\'), so.store_address',
    (error, dailysales) => {
      if (error) {
        throw error;
      }
      res.status(200).json(dailysales.rows);
    }
  );
};

const getDailySpoilageByProduct = (req, res) => {
  pool.query(
    'SELECT TO_CHAR(d.transaction_date, \'YYYY-MM-DD\') AS transaction_date, p.product, SUM(pi.waste) as waste FROM pastry_inventory pi JOIN dates d ON pi.transaction_date = d.transaction_date JOIN product p ON pi.product_id = p.product_id GROUP BY TO_CHAR(d.transaction_date, \'YYYY-MM-DD\'), p.product ORDER BY TO_CHAR(d.transaction_date, \'YYYY-MM-DD\'), p.product',
    (error, dailyspoilage) => {
      if (error) {
        throw error;
      }
      res.status(200).json(dailyspoilage.rows);
    }
  );
};

/*
app.get("/", (req, res) => {
    res.send("Hello World!");
  });
*/

app.get('/products', getProducts)

app.get('/dailysales', getDailySalesByStore)

app.get('/dailyspoilage', getDailySpoilageByProduct)


app.listen(PORT, () => {
    console.log(`Server listening on the port  ${PORT}`);
})