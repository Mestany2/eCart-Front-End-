/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import { getAllOrders, getUserOrder } from '../api/OrderApi';
import { useAuth } from '../utils/context/authContext';
import { checkUser } from '../utils/auth';

export default function ListOfOrders() {
  const [orders, setOrders] = useState();
  const [userOrders, setUserOrders] = useState();
  const [revenue, setRevenue] = useState();
  const { user } = useAuth();
  const [myUser, setMyUser] = useState();

  const RevenueTotal = () => {
    const orderTotals = orders && orders?.filter((order) => order.orderTotal);
    const totalRevenue = orderTotals?.reduce((a, b) => a + b.orderTotal, 0);
    const totalValue = totalRevenue?.toFixed(2);
    setRevenue(totalValue);
  };
  useEffect(() => {
    getAllOrders().then(setOrders);
    checkUser(user?.uid).then((data) => setMyUser(data[0]));
  }, []);

  useEffect(() => {
    if (orders) {
      RevenueTotal();
    }
  }, [orders]);

  useEffect(() => {
    if (myUser) {
      getUserOrder(myUser?.id).then(setUserOrders);
    }
  }, [myUser]);

  return (
    <>
      <NavBar />
      <h1 className="list-orders">List of Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Payment</th>
            <th>Order Total</th>
            <th>Status</th>
          </tr>
        </thead>
        {myUser?.isSeller ? (
          <>
            {orders?.map((order) => (
              <tbody>
                <tr>
                  <Link passHref href={`/SingleOrder/${order.id}`}>
                    <td><strong>{order.id}</strong></td>
                  </Link>
                  <td>{order.paymentId === 1 ? 'Credit Card'
                    : order.paymentId === 2 ? 'Cash'
                      : 'No Payment'}
                  </td>
                  <td>{order.orderTotal}</td>
                  <td>{order.statusId === 1 ? 'Open'
                    : order.statusId === 2 ? 'Processing'
                      : order.statusId === 3 ? 'Shipped'
                        : order.statusId === 4 ? 'Complete'
                          : 'Status is not set'}
                  </td>

                </tr>
              </tbody>
            ))}
            <td>Total Revenue</td>
            <td> </td>
            <td>${revenue}</td>
            <td />
          </>
        ) : (
          <>
            {userOrders?.map((order) => (
              <tbody>
                <tr>
                  <Link passHref href={`/SingleOrder/${order.id}`}>
                    <td><strong>{order.id}</strong></td>
                  </Link>
                  <td>{order.paymentId === 1 ? 'Credit Card'
                    : order.paymentId === 2 ? 'Cash'
                      : 'No Payment'}
                  </td>
                  <td>{order.orderTotal}</td>
                  <td>{order.statusId === 1 ? 'Open'
                    : order.statusId === 2 ? 'Processing'
                      : order.statusId === 3 ? 'Shipped'
                        : order.statusId === 4 ? 'Complete'
                          : 'Status is not set'}
                  </td>

                </tr>
              </tbody>
            ))}
          </>
        )}

      </table>
    </>
  );
}
