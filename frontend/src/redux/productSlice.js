import { createSlice } from "@reduxjs/toolkit";
import{toast} from "react-hot-toast"

const initialState = {
    productList: [],
    cartItem: []
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setData: (state, action) => {
            state.productList = [...action.payload]

        },
        addCartItem: (state, action) => {
            const check=state.cartItem.some(el=>el._id===action.payload._id)
            if(check){
                toast("Item already in cart")
            }else{
                toast("Item added")

                const total = action.payload.price
            state.cartItem = [...state.cartItem, { ...action.payload, qty: 1, total: total }]
            }
            

        },
        deleteCartItem: (state, action) => {
        
            toast("one item deleted")
            const index=state.cartItem.findIndex((el)=>el._id===action.payload)
            state.cartItem.splice(index,1)
            
        },
        increaseQty:(state,action)=>{
            const index=state.cartItem.findIndex((el)=>el._id===action.payload)
            let quantity=state.cartItem[index].qty
            const incqty=++quantity
            state.cartItem[index].qty=incqty
            
            const price=state.cartItem[index].price
            const total=price*incqty

            state.cartItem[index].total=total
        },
        decreaseQty: (state, action) => {
            const index = state.cartItem.findIndex((el) => el._id === action.payload);
            let quantity = state.cartItem[index].qty;
        
            if (quantity > 1) {
                // Decrease quantity and update total if more than 1
                quantity--;
                state.cartItem[index].qty = quantity;
                state.cartItem[index].total = state.cartItem[index].price * quantity;
            } else if (quantity === 1) {
                // Remove item if quantity is 1
                state.cartItem.splice(index, 1);
                toast("Item removed from cart");
            }
        }
    }

})
export const { setData, addCartItem, deleteCartItem,increaseQty,decreaseQty } = productSlice.actions
export default productSlice.reducer