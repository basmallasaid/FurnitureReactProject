import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartList, setCartList] = useState([]);

    function addCart(product) {
        const exist = cartList.find(item => item.id === product.id);

        if (exist) {
            setCartList(cartList.filter(item => item.id !== product.id));
        } 
        else {
            setCartList([...cartList, product]); 
        }
    }

    return (
        <CartContext.Provider value={{ 
            cartList, 
            addCart, 
            countCart: cartList.length 
        }}>
            {children}
        </CartContext.Provider>
    );
};