import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { registerUser } from '../../utils/auth';

export default function UserForm() {
  const [formData, setFormData] = useState();
  const router = useRouter();
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData, UID: user.uid, isSeller: false,
    };
    registerUser(payload);
    router.push('/AllItems');
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-30" controlId="formBasicEmail">
          <br />
          <h1 id="welcome-title"> Sign Up </h1>
          <br />
          <Form.Label>Name</Form.Label>
          <Form.Control as="textarea" name="Name" required placeholder=" Name" value={formData?.name} onChange={(e) => setFormData(({ ...formData, name: e.target.value }))} />
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" name="Address" required placeholder="Address" value={formData?.address} onChange={(e) => setFormData(({ ...formData, address: e.target.value }))} />
          <Form.Label>Phone Number</Form.Label>
          <Form.Control as="textarea" name="Phone" required placeholder="Phone" value={formData?.phone} onChange={(e) => setFormData(({ ...formData, phone: e.target.value }))} />
          <Form.Label>Email</Form.Label>
          <Form.Control as="textarea" name="Email" required placeholder="Email" value={formData?.email} onChange={(e) => setFormData(({ ...formData, email: e.target.value }))} />
        </Form.Group>
        <Button id="mb-300" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
