export const cartTotalPrices = (cart) => {
    cart.totalPrice = cart.cartItems.reduce( (prev, current) => {
        return prev + current.price * current.quantity;
    },0)
}
