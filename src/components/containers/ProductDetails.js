import axios from 'axios'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectedProduct } from '../redux/actions/productActions';


const ProductDetails = () => {

    const {productId}  = useParams()
    console.log(productId)

    const product = useSelector(state => state.product)
    const {title , image , price , category , description} = product.payload.data
    console.log(product.payload.data)
    const dispatch = useDispatch();

    const fetchProductDetail = async()=>{
        const response = await axios.get('https://fakestoreapi.com/products/'+productId).catch(err => console.log(err))
        dispatch(selectedProduct(response))
    }

    useEffect(()=>{
        if(productId && productId !== ''){
            fetchProductDetail()
        }
    } ,[productId])

    return ( 
        <div className='ui grid container '>
            {Object.keys(product).length === 0 ? (
                <div>...Loading</div>
            ) : (
                <div className="ui placeholder segment">
                <div className="ui two column stackable center aligned grid">
                    <div className="ui vertical divider">AND</div>
                    <div className="middle aligned rwo">
                        <div className="column lp">
                            <img src={image} className='ui fluid image' alt={image} />
                        </div>
                        <div className="column rp">
                            <h1>{title}</h1>
                            <h2><a  className="ui teal tag label">${price}</a></h2>
                            <h3 className="ui brown block header">{category}</h3>
                            <p>{description}</p>
                            <div className="ui vertical animated button" tabIndex='0'>
                                <div className="hidden content">
                                    <i className="shop icon"></i>
                                </div>
                                <div className="visible content">Add to Cart</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            )}
            
            
        </div>
     );
}
 
export default ProductDetails;