import { ADD_TO_CART, REMOVE_FROM_CART, INCREMENT, DECREMENT, ADD_TO_CART_UNKNOWNITEM } from '../constants';


export const addToCart = (payload)=> {
    console.log('cartproduct', payload);
    return{
        type:ADD_TO_CART,
        payload
    }
}
export const addToCartUnknown = (payload)=> {
    //console.log('cartproduct', payload);
    return{
        type:ADD_TO_CART_UNKNOWNITEM,
        payload
    }
}

export const removeToCart = (payload)=> {
    console.log('dsfdsfdsf',payload);
    return{
        type:REMOVE_FROM_CART,
        payload
    }
}

export const itemIncrement = (payload) => {
    return{
        type:INCREMENT,
        payload
    }
}

export const itemDecrement = (payload) => {
    return{
        type:DECREMENT,
        payload
    }
}

