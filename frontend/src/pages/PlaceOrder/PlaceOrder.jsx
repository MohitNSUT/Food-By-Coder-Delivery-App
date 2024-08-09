import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/Context'
import axios from 'axios';

const PlaceOrder = () => {

  const { getTotalAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo)
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalAmount() + 2
    }

    try {
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token }
      });
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    }
  }

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <h4 className="title">Delivery Information</h4>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter Your Email' />
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Enter your Phone Number' />
      </div>

      <div className="place-order-right">
        <div className="cart-total place-order-total">
          <h4>Cart Total ($)</h4>
          <div>
            <div className="cart-total-details placeorder-details">
              <p>SubTotal ($)</p>
              <p>{getTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details place-order-details">
              <p>Delivery Fee ($)</p>
              <p>{getTotalAmount() > 0 ? 2 : 0}</p>
            </div>
            <hr />
            <div className="cart-total-details place-order-details">
              <b>Total ($)</b>
              <b>{getTotalAmount() > 0 ? getTotalAmount() + 2 : 0}</b>
            </div>
          </div>
          <button type='submit' className='payment'>PROCEED FOR PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;

