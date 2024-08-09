import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";

const List = ({url}) => {

  const [list,setList] =  useState([])

  const fetchList = async()=>{
      const response = await axios.get(`${url}/api/food/list`);
      // console.log(response);
      if(response.data.success){
          setList(response.data.data);
      }
      else{
        toast.error("Error")
      }
  }

  // for remove from list
  const removeFood = async(foodId)=>{
    //  console.log("dleleted",foodId);
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error("Item is not removed due to some error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col' >
         <h3>All Food Items</h3>
         <div className="list-table">
             <div className="list-table-format title">
                 <b>Image</b>
                 <b>Name</b>
                 <b>Description</b>
                 <b>Category</b>
                 <b>Price</b>
                 <b>Remove</b>
             </div>
             {list.map((item,index)=>{
                return (
                    <div key={index} className="list-table-format">
                        <img src={`${url}/images/`+item.image} alt="" />
                        <p>{item.name}</p>
                        <p>{item.description}</p>
                        <p>{item.category}</p>
                        <p>${item.price} </p>
                        <p onClick={()=>removeFood(item._id)} className='action-delete' ><MdDelete /></p>
                    </div>
                )
             })}
         </div>
    </div>
  )
}

export default List