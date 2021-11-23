import { ADD_TO_CART, REMOVE_FROM_CART, INCREMENT, DECREMENT } from '../constants';

const initialState = {
    cartItems:[],
    totalAmout:0,
    totalItems:0
}

export const CartReducer = (state=initialState, action)=> {
    switch(action.type) {
        case ADD_TO_CART:           
          //check if the action id exists in the addedItems 
          
         let existed_item= state.cartItems.find(item=> action.payload.product_id === item.product_id);
        
        if(existed_item){
            existed_item.product_qty = action.payload.product_qty
            return{
              ...state,
             }
        }else{
          return {
            ...state,
            cartItems: [...state.cartItems, action.payload]
          };          
        }

        case REMOVE_FROM_CART:
        let removeItem = state.cartItems.filter((item)=> {
          return item.item_id !== action.payload
        });

        return{
          ...state,
          cartItems:removeItem
        }

        case INCREMENT:
          let updatedCart = state.cartItems.map((item)=> {            
            if(item.item_id == action.payload){
              let qty = item.order_qty + 1;
              let price = (qty * item.initialPrice).toFixed(2);
              console.log(price);
              return{
                ...item,
                order_qty:qty,
                line_subtotal:price
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
            if(item.item_id == action.payload){
              let qty = item.order_qty - 1;
              let price = (qty * item.initialPrice).toFixed(2);
              return{
                ...item,
                order_qty:qty,
                line_subtotal:price
              }
            }
            return item; 
          }).filter(elem=> elem.order_qty!=0);
          return{
            ...state,
            cartItems:afterDecrementCart
          }          
        default:
          return state;
      }
}

