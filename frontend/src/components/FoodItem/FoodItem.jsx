import React, { useContext, useState } from 'react'
import  './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/Context';

const FoodItem = ({id ,name,price,description,image}) => {

    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

    return (
    <div className='food-item'>
        <div className='food-item-img-container'>
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
            
            {!cartItems[id] ?
                <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white}/> 
            
            :
                <div className='food-item-counter'>
                    <img src={assets.remove_icon_red} onClick={()=>removeFromCart(id)}  alt='' ></img>
                    <p>{cartItems[id]}</p>
                    <img src={assets.add_icon_green} onClick={()=>addToCart(id)}  alt=""></img>
                </div>
            }
        </div>
        <div className='food-item-info'>
            <div className='food-item-name-rating'>
                <p className='food-item-name'>{name}</p>
                <img className='food-item-rating' src={assets.rating_starts} alt=" " />
            </div>
            <div className='food-item-description'>
                <p>{description}</p>
            </div>
            <div className='food-item-price'>
                <p> Price - {price} $ </p>
            </div>
        </div>
    </div>
    ) 
}

export default FoodItem

