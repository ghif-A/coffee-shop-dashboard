require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express');
const cors = require('cors');
const pool = require(__dirname + "/config/db.config.js");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 9000;

const getProducts =  (req, res) => {
  pool.query('SELECT * FROM product', 
    (error, values) => {
    if (error) {
      throw error
    }
    res.status(200).json(values.rows)
  })
}

const getSalesOutlets =  (req, res) => {
  pool.query('SELECT * FROM sales_outlet', 
    (error, values) => {
    if (error) {
      throw error
    }
    res.status(200).json(values.rows)
  })
}

const getSalesReceipts =  (req, res) => {
  pool.query('SELECT * FROM sales_receipts LIMIT 100', 
    (error, values) => {
    if (error) {
      throw error
    }
    res.status(200).json(values.rows)
  })
}

const getSalesTargets =  (req, res) => {
  pool.query('SELECT * FROM sales_targets', 
    (error, values) => {
    if (error) {
      throw error
    }
    res.status(200).json(values.rows)
  })
}

const getPastryInventory =  (req, res) => {
  pool.query('SELECT * FROM pastry_inventory', 
    (error, values) => {
    if (error) {
      throw error
    }
    res.status(200).json(values.rows)
  })
}

const getStaff =  (req, res) => {
  pool.query('SELECT * FROM staff', 
    (error, values) => {
    if (error) {
      throw error
    }
    res.status(200).json(values.rows)
  })
}

const getCustomers =  (req, res) => {
  pool.query('SELECT * FROM customer', 
    (error, values) => {
    if (error) {
      throw error
    }
    res.status(200).json(values.rows)
  })
}

const getGenerations =  (req, res) => {
  pool.query('SELECT * FROM generations', 
    (error, values) => {
    if (error) {
      throw error
    }
    res.status(200).json(values.rows)
  })
}

const getDates =  (req, res) => {
  pool.query('SELECT * FROM dates', 
    (error, values) => {
    if (error) {
      throw error
    }
    res.status(200).json(values.rows)
  })
}

const getDailySalesByStore = (req, res) => {
  pool.query(
    'SELECT so.store_address, TO_CHAR(sr.transaction_date, \'YYYY-MM-DD\') AS transaction_date, SUM(sr.line_item_amount) AS total_sales FROM sales_outlet so JOIN sales_receipts sr ON so.sales_outlet_id = sr.sales_outlet_id GROUP BY so.store_address, TO_CHAR(sr.transaction_date, \'YYYY-MM-DD\') ORDER BY TO_CHAR(sr.transaction_date, \'YYYY-MM-DD\'), so.store_address',
    (error, values) => {
      if (error) {
        throw error;
      }
      res.status(200).json(values.rows);
    }
  );
};

const getDailySpoilageByProduct = (req, res) => {
  pool.query(
    'SELECT TO_CHAR(d.transaction_date, \'YYYY-MM-DD\') AS transaction_date, p.product, SUM(pi.waste) as waste FROM pastry_inventory pi JOIN dates d ON pi.transaction_date = d.transaction_date JOIN product p ON pi.product_id = p.product_id GROUP BY TO_CHAR(d.transaction_date, \'YYYY-MM-DD\'), p.product ORDER BY TO_CHAR(d.transaction_date, \'YYYY-MM-DD\'), p.product',
    (error, values) => {
      if (error) {
        throw error;
      }
      res.status(200).json(values.rows);
    }
  );
};

const getSalesByProductCategory = (req, res) => {
  pool.query(
    'SELECT p.product_category, SUM(sr.line_item_amount) AS sales FROM sales_receipts sr JOIN product p ON sr.product_id = p.product_id GROUP BY p.product_category ORDER BY sales DESC',
    (error, values) => {
      if (error) {
        throw error;
      }
      res.status(200).json(values.rows);
    }
  );
};

const getSumTotalSales = (req, res) => {
  pool.query(
    'SELECT SUM(line_item_amount) AS sum_total_sales FROM sales_receipts',
    (error, values) => {
      if (error) {
        throw error;
      }
      res.status(200).json(values.rows);
    }
  );
};

const getSalesTargetsDifference = (req, res) => {
  pool.query(
    'SELECT (SELECT SUM(line_item_amount) FROM sales_receipts) - (SELECT SUM(total_goal) FROM sales_targets WHERE sales_targets.sales_outlet_id IN (SELECT sales_outlet_id FROM sales_receipts)) AS sales_targets_difference',
    (error, values) => {
      if (error) {
        throw error;
      }
      res.status(200).json(values.rows);
    }
  );
};

const getItemsSold = (req, res) => {
  pool.query(
    'SELECT SUM(quantity) AS items_sold FROM sales_receipts',
    (error, values) => {
      if (error) {
        throw error;
      }
      res.status(200).json(values.rows);
    }
  );
};

const getTotalSpoilageLoss = (req, res) => {
  pool.query(
    'SELECT SUM(p.current_wholesale_price * pi.waste) AS total_spoilage_loss FROM pastry_inventory pi JOIN product p ON pi.product_id = p.product_id',
    (error, values) => {
      if (error) {
        throw error;
      }
      res.status(200).json(values.rows);
    }
  );
};

app.get('/products', getProducts)

app.get('/salesoutlets', getSalesOutlets)

app.get('/salesreceipts', getSalesReceipts)

app.get('/salestargets', getSalesTargets)

app.get('/pastryinventory', getPastryInventory)

app.get('/staff', getStaff)

app.get('/customers', getCustomers)

app.get('/generations', getGenerations)

app.get('/dates', getDates)

app.get('/dailysales', getDailySalesByStore)

app.get('/dailyspoilage', getDailySpoilageByProduct)

app.get('/productcategorysales', getSalesByProductCategory)

app.get('/sumtotalsales', getSumTotalSales)

app.get('/salestargetsdifference', getSalesTargetsDifference)

app.get('/itemssold', getItemsSold)

app.get('/totalspoilageloss', getTotalSpoilageLoss)

function formatUptime(uptime) {
  const days = Math.floor(uptime / 86400);
  const hours = Math.floor((uptime % 86400) / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

app.get('/healthcheck', (req, res) => {
  const healthcheck = {
    uptime: formatUptime(process.uptime()),
    message: 'OK',
    timestamp: new Date().toLocaleString()
  };
  try {
    res.send(healthcheck);
  } catch (e) {
    healthcheck.message = e;
    res.status(503).send();
  }
});

app.listen(PORT, () => {
    console.log(`Server listening on the port  ${PORT}`);
})