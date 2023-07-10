import { useState, useContext, createContext } from "react";

const CartContext = createContext();

const CartProvider = ({children}) =>{
    const [cart, setCart] = useState(0);
    return(
        <CartContext.Provider value={[cart,setCart]}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext)

export {useCart, CartProvider}