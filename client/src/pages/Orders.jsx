import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import OrderItem from "components/OrderItem";
import { useOrders } from "context/OrderContext";
import Layout from "layout/Layout";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import orderService from "services/order.service";

const Orders = () => {
  const { orders, setOrders } = useOrders();

  const history = useHistory();
  const goToDetails = (order) => {
    history.push({
      pathname: `orders/${order.order_id}`,
      state: { order },
    });
  };
  useEffect(() => {
    orderService.getAllOrders().then((res) => setOrders(res.data));
  }, [setOrders]);

  if(!orders){
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  if(orders.length === 0 ){
    return (
      <Layout>
        <h1 className="my-10 text-center text-4xl font-semibold">
        Orders
      </h1>
        <p>You are yet to place an order</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1 className="my-10 text-center text-4xl font-semibold">
        Orders
      </h1>
      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>No. of items</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => (
              <TableRow className="cursor-pointer" onClick={() => goToDetails(order)} key={order.order_id}>
                <OrderItem order={order} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
        <Pagination totalResults={10} resultsPerPage={10} onChange={() => {}} label="Table navigation" />
        </TableFooter>
      </TableContainer>
    </Layout>
  );
};

export default Orders;