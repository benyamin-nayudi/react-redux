import {useEffect} from 'react'
import {useSelector } from 'react-redux'
import ProductComponent from './ProductComponent';
import axios from 'axios'
import { useDispatch } from 'react-redux';
import {setProducts} from '../redux/actions/productActions'


const ProductListing = () => {
    const products = useSelector( state => state)
    const dispatch = useDispatch()


    const fetchData = async()=>{
        const response = await axios.get('https://fakestoreapi.com/products').catch(err => console.log(err))
        dispatch(setProducts(response.data))
    }
    
    useEffect(()=>{
        fetchData()
    } ,[])


    return ( 
        <div className="ui grid container">
            <ProductComponent />
        </div>
     );
}


export default (ProductListing);