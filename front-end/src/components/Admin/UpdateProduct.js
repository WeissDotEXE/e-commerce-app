import React, { Fragment, useState } from "react";
import styles from "../Styles/AddProduct.module.scss";

import Form from "../UI/Form";
import Button from "../UI/Button";
import AdminNav from "./AdminNav";
import Notification from "../UI/Notification";

import { useSelector, useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";
import { Link } from "react-router-dom";

const UpdateProduct = (props) => {
  const dispatch = useDispatch();

  //state for getting data from redux
  const [id, setId] = useState(useSelector((state) => state.updateProduct.id));
  const [name, setName] = useState(
    useSelector((state) => state.updateProduct.name)
  );
  const [category, setCategory] = useState(
    useSelector((state) => state.updateProduct.category)
  );
  const [price, setPrice] = useState(
    useSelector((state) => state.updateProduct.price)
  );
  const [description, setDescription] = useState(
    useSelector((state) => state.updateProduct.description)
  );
  const [imageLink, setImageLink] = useState(
    useSelector((state) => state.updateProduct.image)
  );
  const notify = useSelector((state) => state.cart.showNotification);

  const submitHandler = async (event) => {
    event.preventDefault();
    const updatedData = {
      name,
      category,
      price,
      description,
      image: imageLink,
    };
    try {
      const response = await fetch(`http://localhost:4000/products/${id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      console.log("dataaa" + data);

      //function for showing notification when product id added to cart
      dispatch(cartActions.showNotification());
      setTimeout(() => {
        dispatch(cartActions.hideNotification());
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className={styles.addProduct}>
        {notify && (
          <Notification message="Succes! You can go back to admin page" />
        )}
        <AdminNav />
        <Form onSubmit={submitHandler}>
          <h1>Update {props.productName}</h1>
          <label htmlFor="productName">Product Name</label>
          <input
            id="productName"
            type="text"
            required
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          <label htmlFor="category">Category</label>
          <select onChange={(event) => setCategory(event.target.value)}>
            <option value="laptop">Laptop</option>
            <option value="smartphone">Smartphone</option>
            <option value="accesory">Accesory</option>
          </select>
          <label htmlFor="price">Price $</label>
          <input
            id="price"
            type="number"
            required
            onChange={(event) => setPrice(event.target.value)}
            value={price}
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
          <label htmlFor="imageLink">Image Link</label>
          <input
            id="imageLink"
            type="text"
            required
            onChange={(event) => setImageLink(event.target.value)}
            value={imageLink}
          />

          <Button id={styles.submitBtn} type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Fragment>
  );
};

export default UpdateProduct;
