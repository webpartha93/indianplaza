import { ADD_TO_CART, REMOVE_FROM_CART, INCREMENT, DECREMENT } from '../constants';

const initialState = {
    cartItems:[],
    getAllData:"",
    isAddedCartItem:false,
    totalAmout:0,
    totalItems:0
}

export const CartReducer = (state=initialState, action)=> {
  //console.log('cartreducer', action.payload);
    switch(action.type) {
        case ADD_TO_CART: 
        let existed_item = state.cartItems.find(item=> action.payload.productData.product_id === item.product_id);
        if(existed_item){
            if(existed_item.product_uom == action.payload.productData.product_uom){
              existed_item.product_qty = action.payload.productData.product_qty
                return{
                  ...state,              
                }
            }else{
              return {
                ...state,
                isAddedCartItem:true,
                cartItems: [...state.cartItems, action.payload.productData],
                getAllData:action.payload.getAllData
              }
            }
            
        }else{
          action.payload.product_qty;
          console.log('addItems',action.payload)
          return {
            ...state,
            isAddedCartItem:true,
            cartItems: [...state.cartItems, action.payload.productData],
            getAllData:action.payload.getAllData
          };          
        }

        case REMOVE_FROM_CART:
        let removeItem = state.cartItems.filter((item, index)=> {
          return index !== action.payload
        });

        // let removeItem = state.cartItems.filter(item => !values.includes(item));
        console.log(action.payload);

        return{
          ...state,
          cartItems:removeItem
        }

        case INCREMENT:
          let updatedCart = state.cartItems.map((item)=> {            
            if(item.product_id == action.payload){
              let qty = item.product_qty + 1;
              return{
                ...item,
                product_qty:qty,
                isDeleteItem:false
              }
             
            }
            return item; 
          });
          return{
            ...state,
            cartItems:updatedCart
          }
          case DECREMENT:
          //console.log(state.cartItems);
          let afterDecrementCart = state.cartItems.map((item)=> {
            if(item.product_id == action.payload){
              let qty = item.product_qty - 1;
              console.log('itemval', qty);
              return{
                ...item,
                product_qty:qty
              }
            }
            return item; 
          }).filter(elem=> elem.product_qty!=0);
          return{
            ...state,
            cartItems:afterDecrementCart
          }          
          case "RESET_CART_DATA":
            return{
              ...state,
              isLoading:false,
              cartItems:[]
            }
            case "RESET_ADDED_CART":
            return{
              ...state,
              isAddedCartItem:false
            }
        default:
          return state;
      }
}

