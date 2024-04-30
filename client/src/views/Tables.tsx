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
      <h4 style={{ color: theme === 'dark' ? 'white' : 'black' }}>Products</h4>
      <TableProduct />
      <h4 style={{ color: theme === 'dark' ? 'white' : 'black', marginTop: '15px' }}>Sales Outlets</h4>
      <TableSalesOutlet />
      <h4 style={{ color: theme === 'dark' ? 'white' : 'black', marginTop: '15px' }}>Sales Targets</h4>
      <TableSalesTargets />
      <h4 style={{ color: theme === 'dark' ? 'white' : 'black', marginTop: '15px' }}>Pastry Inventory</h4>
      <TablePastryInventory />
      <h4 style={{ color: theme === 'dark' ? 'white' : 'black', marginTop: '15px' }}>Staff</h4>
      <TableStaff />
      <h4 style={{ color: theme === 'dark' ? 'white' : 'black', marginTop: '15px' }}>Customers</h4>
      <TableCustomer />
      <h4 style={{ color: theme === 'dark' ? 'white' : 'black', marginTop: '15px' }}>Sales Receipts*</h4>
      <TableReceipts />
      <h6 style={{ color: theme === 'dark' ? 'white' : 'black', marginTop: '5px' }}>*Data are limited due to backend limitation</h6>
      <h4 style={{ color: theme === 'dark' ? 'white' : 'black', marginTop: '15px' }}>Generations</h4>
      <TableGenerations />
      <h4 style={{ color: theme === 'dark' ? 'white' : 'black', marginTop: '15px' }}>Dates</h4>
      <TableDates />
    </div>
  );
};

export default Tables;
