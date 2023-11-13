import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import Link from 'next/link';
import NavBar from '../../components/NavBar';
import ItemCard from '../../components/ItemCard';
import { checkOutOrder, getOrderById, getOrderItems } from '../../api/OrderApi';
import getAllStatuses from '../../api/StatusApi';

export default function OrderItems() {
  const router = useRouter();
  const { id } = router.query;
  const [items, setItems] = useState();
  const [formData, setFormData] = useState({ });
  const [statuses, setStatuses] = useState();
  const [order, setOrder] = useState();

  const updateStatus = () => {
    const payload = {
      ...formData, UserId: order.userId, OrderTotal: order.orderTotal, OrderDate: order.orderDate, PaymentId: order.paymentId,
    };
    checkOutOrder(id, payload);
    window.alert('Status Updated');
    router.push('/ListOfOrders');
  };

  useEffect(() => {
    getOrderItems(id).then((data) => setItems(data));
    getAllStatuses().then(setStatuses);
    getOrderById(id).then(setOrder);
  }, []);

  return (
    <>
      <NavBar />
      <div>
        <h3>Order : {id}</h3>
      </div>
      <Link passHref href="/ListOfOrders">
        <Button variant="primary"> Back to my orders </Button>
      </Link>
      <div className="products-container">
        {items?.map((item) => <ItemCard itemObj={item} />)}
      </div>
      <div className="Status-container">
        <Form>
          <Form.Group className="mb-30" controlId="formBasicEmail">
            <br />
            <h1 id="welcome-title"> Update Status </h1>
            <br />
            <FloatingLabel controlId="floatingSelect" label="Status">
              <Form.Select
                aria-label="Status"
                name="statusId"
                onChange={(e) => setFormData(({ ...formData, statusId: e.target.value }))}
                className="mb-3"
                value={formData?.statusId} // FIXME: modify code to remove error
                required
              >
                <option value="">Set Status To: </option>
                {
            statuses?.map((status) => (
              <option
                key={status.id}
                value={status.id}
              >
                {status.statusName}
              </option>
            ))
          }
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
        </Form>
        <Button variant="alert" onClick={updateStatus}>Submit</Button>
      </div>
    </>
  );
}
