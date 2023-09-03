import { ReactNode, createContext, useContext, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ShoppingCartProviderProps = {
    children: ReactNode;
}

type ShoppingCartContext = {
    getItemQuantity: (id: number) => number,
    increaseCartQuantity: (id: number) => void,
    decreaseCartQuantity: (id: number) => void,
    removeFromCart: (id: number) => void,
    openCart: () => void,
    closeCart: () => void,
    cartQuantity: number,
    cartItems: CartItem[]
}

type CartItem = {
    id: number,
    quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext);


const ShoppingCartProvider = ({ children }: ShoppingCartProviderProps) => {

    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart",[]);
    const [isOpen, setIsOpen] = useState(false);

    const cartQuantity = cartItems.reduce((quantity,item) => item.quantity + quantity, 0);

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    const increaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if (cartItems.find(item => item.id === id) == null) {
                return [...cartItems, { id, quantity: 1 }];
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else return item;
                })
            }
        })
    }

    const decreaseCartQuantity = (id: number) => {
        setCartItems(currItems => {
            if (cartItems.find(item => item.id === id)?.quantity === 1) {
                return cartItems.filter(item => item.id !== id);
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else return item;
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id);
        })
    }

    const openCart = () => {
        setIsOpen(true);
    }

    const closeCart = () => {
        setIsOpen(false);
    }

    return (
        <ShoppingCartContext.Provider value={{closeCart,openCart,cartItems,cartQuantity, getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart }}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}

export const UserShoppingCartContext = () => {
    const cartContext = useContext(ShoppingCartContext);
    if (!cartContext) throw new Error('Error Shopping Cart was not found.');
    return cartContext;
}

export default ShoppingCartProvider;