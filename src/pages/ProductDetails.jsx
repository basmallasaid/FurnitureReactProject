import React, { useEffect, useState } from 'react'
import { getProductById } from '../api/productsApi'
import { useParams } from 'react-router-dom'

export default function ProductDetails() {
    const[product,setProduct]=useState([]);
    const {id}=useParams();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
     const fetchproduct=async()=>{
        try{
            const data= await getProductById(id);
            setProduct(data)
        }
        catch(err){
            console.error(err);
        }
        finally {
                setLoading(false);
            }
     };
     fetchproduct();
    },[id])
  return (
    <>
      <h2>{product.name}</h2>
    </>
  )
}
