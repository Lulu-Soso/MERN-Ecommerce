// Configuration des constantes pour faciliter la maintenance et les ajustements
// const FREE_SHIPPING_THRESHOLD = 100;
// const SHIPPING_COST = 10;
const TAX_RATE = 0.15;

// Fonction pour arrondir et formater les nombres
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Fonction de mise à jour du panier
export const updateCart = (state) => {
  // Calcul du prix des articles
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calcul du prix de la livraison
  // state.shippingPrice = addDecimals(state.itemsPrice > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST);

  // Calcul du prix des taxes
  state.taxPrice = addDecimals(
    Number((TAX_RATE * state.itemsPrice).toFixed(2))
  );

  // Calcul du prix total
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice)
    // Number(state.shippingPrice) +
    // Number(state.taxPrice)
  ).toFixed(2);

  // Mise à jour du localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
}
