import TableProduct from "../components/tables/TableProduct";
import TableSalesOutlet from "../components/tables/TableSalesOutlet";
import TableReceipts from "../components/tables/TableSalesReceipts";
import TableSalesTargets from "../components/tables/TableSalesTargets";
import TablePastryInventory from "../components/tables/TablePastryInventory";
import TableStaff from "../components/tables/TableStaff";
import TableCustomer from "../components/tables/TableCustomer";
import TableGenerations from "../components/tables/TableGenerations";
import TableDates from "../components/tables/TableDates";
import { useTheme } from "../contexts/ThemeContext";

const Tables = () => {
  const { theme } = useTheme();
  return (
    <div className={theme} style={{ padding: '15px', margin: '15px' }}>
      <h5 style={{ color: theme === 'dark' ? 'white' : 'black', fontWeight: 'bold' }}>Products</h5>
      <TableProduct />
      <h5 style={{ color: theme === 'dark' ? 'white' : 'black', fontWeight: 'bold', marginTop: '15px' }}>Sales Outlets</h5>
      <TableSalesOutlet />
      <h5 style={{ color: theme === 'dark' ? 'white' : 'black', fontWeight: 'bold', marginTop: '15px' }}>Sales Targets</h5>
      <TableSalesTargets />
      <h5 style={{ color: theme === 'dark' ? 'white' : 'black', fontWeight: 'bold', marginTop: '15px' }}>Pastry Inventory</h5>
      <TablePastryInventory />
      <h5 style={{ color: theme === 'dark' ? 'white' : 'black', fontWeight: 'bold', marginTop: '15px' }}>Staff</h5>
      <TableStaff />
      <h5 style={{ color: theme === 'dark' ? 'white' : 'black', fontWeight: 'bold', marginTop: '15px' }}>Customers</h5>
      <TableCustomer />
      <h5 style={{ color: theme === 'dark' ? 'white' : 'black', fontWeight: 'bold', marginTop: '15px' }}>Sales Receipts</h5>
      <TableReceipts />
      <h5 style={{ color: theme === 'dark' ? 'white' : 'black', fontWeight: 'bold', marginTop: '15px' }}>Generations</h5>
      <TableGenerations />
      <h5 style={{ color: theme === 'dark' ? 'white' : 'black', fontWeight: 'bold', marginTop: '15px' }}>Dates</h5>
      <TableDates />
      <h6 style={{ color: theme === 'dark' ? 'white' : 'black', fontWeight: 'bold', marginTop: '20px' }}>*All tables are limited to 100 rows due to backend limitation.</h6>
    </div>
  );
};

export default Tables;
