import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { FloatingLabel } from 'react-bootstrap';
import { createItem, updateItem } from '../../api/ItemsApi';
import { useAuth } from '../../utils/context/authContext';
import { getAllCategories } from '../../api/CategoriesApi';
import NavBar from '../NavBar';

function ItemForm() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({ });
  const [categories, setCategories] = useState();
  // const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (router?.query.itemObj) {
      const obj = JSON.parse(router.query.itemObj);
      setFormData((prev) => ({
        ...prev,
        name: obj.name,
        description: obj.description,
        quantity: obj.quantity,
        image: obj.image,
        categoryId: obj.categoryId,
        price: obj.price,
        userId: user[0]?.id,
      }));
    }
    getAllCategories().then((data) => setCategories(data));
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (router.query.itemObj) {
      const objItem = JSON.parse(router.query.itemObj);
      updateItem(objItem.id, formData)
        .then(() => router.push('/AllItems'));
    } else {
      const payload = {
        ...formData, userId: user[0]?.id,
      };
      createItem(payload);
      router.push('/AllItems');
    }
  };

  return (
    <>
      <NavBar />
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-30" controlId="formBasicEmail">
          <br />
          <h1 id="welcome-title"> {router.query.itemObj ? 'Update' : 'Add'} an Item </h1>
          <br />
          <Form.Label>Item Name</Form.Label>
          <Form.Control as="textarea" name="Name" required placeholder=" Name" value={formData.name} onChange={(e) => setFormData(({ ...formData, name: e.target.value }))} />
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="Description" required placeholder="Description" value={formData.description} onChange={(e) => setFormData(({ ...formData, description: e.target.value }))} />
          <Form.Label>Quantity</Form.Label>
          <Form.Control as="textarea" name="Quantity" required placeholder="Quantity" value={formData.quantity} onChange={(e) => setFormData(({ ...formData, quantity: e.target.value }))} />
          <Form.Label>Image</Form.Label>
          <Form.Control as="textarea" name="Image" required placeholder="Image" value={formData.image} onChange={(e) => setFormData(({ ...formData, image: e.target.value }))} />
          <Form.Label>Price</Form.Label>
          <Form.Control as="textarea" name="Price" required placeholder="Price" value={formData.price} onChange={(e) => setFormData(({ ...formData, price: e.target.value }))} />
          <Form.Label>Category</Form.Label>

          <FloatingLabel controlId="floatingSelect" label="Category">
            <Form.Select
              aria-label="Category"
              name="categoryId"
              onChange={(e) => setFormData(({ ...formData, categoryId: e.target.value }))}
              className="mb-3"
              value={formData.categoryId}
              required
            >
              <option value="">Select Category</option>
              {
            categories?.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.categoryName}
              </option>
            ))
          }
            </Form.Select>
          </FloatingLabel>
          {/* <div>
            {selectedImage && (
            <div>
              <img
                alt="not found"
                width="250px"
                src={URL.createObjectURL(selectedImage)}
              />
              <br />
              <button onClick={() => setSelectedImage(null)}>Remove</button>
            </div>
            )}

            <br />
            <br />

            <input
              type="file"
              name="myImage"
              onChange={(event) => {
                console.log(event.target.files[0]);
                setSelectedImage(event.target.files[0]);
              }}
            />
          </div> */}

        </Form.Group>

        <Button id="mb-300" variant="primary" type="submit">
          {router.query.itemObj ? 'Update' : 'Add'} Item
        </Button>
      </Form>
    </>
  );
}

export default ItemForm;
