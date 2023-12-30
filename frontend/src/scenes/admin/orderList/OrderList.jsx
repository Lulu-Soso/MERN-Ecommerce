import { Link } from 'react-router-dom';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Message from '../../../components/Message';
import Loader from '../../../components/Loader';
import { useGetOrdersQuery } from '../../../slices/ordersApiSlice';

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <Box width="80%" m="80px auto">
      <h1>Commandes</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">UTILISATEUR</TableCell>
                <TableCell align="right">DATE</TableCell>
                <TableCell align="right">TOTAL</TableCell>
                <TableCell align="right">PAYÉ</TableCell>
                <TableCell align="right">LIVRÉ</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id}>
                  <TableCell component="th" scope="row">
                    {order._id}
                  </TableCell>
                  <TableCell align="right">{order.user && order.user.name}</TableCell>
                  <TableCell align="right">{order.createdAt.substring(0, 10)}</TableCell>
                  <TableCell align="right">${order.totalPrice}</TableCell>
                  <TableCell align="right">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <CloseIcon style={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <CloseIcon style={{ color: 'red' }} />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Link to={`/order/${order._id}`}>
                      <Button variant='outlined'>
                        Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default OrderList