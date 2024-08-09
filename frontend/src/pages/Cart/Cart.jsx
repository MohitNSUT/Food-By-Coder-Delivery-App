import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/Context';
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  
  const {cartItems,food_list,removeFromCart,getTotalAmount,url} = useContext(StoreContext);

  console.log("Rendering FoodItem with id:", id);
  console.log("cartItems:", cartItems)
  
  const navigate = useNavigate();

  return (
    <div className='cart'>
        <div className="cart-items">
            <div className="cart-items-title">
                <p>Item</p>
                <p>Item Name</p>
                <p>Price($) </p>
                <p>Quantity</p>
                <p>Total ($)</p>
                <p>Remove</p>
            </div>
            <br />
            {food_list.map((item,index)=>{
                if(cartItems[item._id]>0){
                    return(
                        <div className='cart-items-title cart-items-item' >
                        <img src={url+"/images/"+item.image} alt="" ></img>
                            <p>{item.name}</p>
                            <p>{item.price}</p>
                            <p>{cartItems[item._id]}</p>
                            <p>{item.price * cartItems[item._id] }</p>
                            <p onClick={()=>removeFromCart(item._id)} className='remove' ><MdDelete /></p>
                        </div>
                    )
                }
            })}
        </div>
        <div className="cart-bottom">
            <div className="cart-total">
                <h3>Cart Total ($)</h3>
                <div>
                    <div className="cart-total-details">
                         <p>SubTotal ($)</p>
                         <p>{getTotalAmount()}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                         <p>Delivery Fee ($)</p>
                         <p>{getTotalAmount()>0 ? 2 : 0}</p>
                    </div>
                    <hr />
                    <div className="cart-total-details">
                          <b>Total ($)</b>
                          <b>{getTotalAmount()>0 ? getTotalAmount()+2 : 0}</b>
                    </div>
                </div>
                <button onClick={()=>navigate("/order")} >PROCEED TO CHECK OUT</button>
            </div>
            <div className="cart-promocode">
                <p>If you have promo code, enter it here. </p>
                <div className='cart-promocode-input' >
                    <input type="text" placeholder='promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cart





