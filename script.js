const cart = [
   {
       name: "Товар 1",
       price: 10.99,
       quantity: 2,
       imageLink: "https://i.pinimg.com/564x/74/b7/3a/74b73ab86a290daffce3ac77a5da5cf0.jpg"
   },
   {
       name: "Товар 2",
       price: 19.99,
       quantity: 1,
       imageLink: "https://i.pinimg.com/564x/9d/65/af/9d65af5bd83b697db63e279ab6af4a34.jpg"
   },
   
];

$(document).ready(function () {
   const cart = JSON.parse(localStorage.getItem('cart')) || [];
   const cartContainer = $(".cart");
   const cartItemsContainer = cartContainer.find(".cart-items");

   function updateCart() {
      cartItemsContainer.empty();
      let totalPrice = 0;

      cart.forEach(item => {
         const cartItem = $(`
               <div class="cart-item">
                   <img src="https://i.pinimg.com/564x/9d/65/af/9d65af5bd83b697db63e279ab6af4a34.jpg"  alt="${item.name}">
                   <p>${item.name} x ${item.quantity}</p>
                
                   <button class="remove-from-cart" data-name="${item.name}" >Remove</button>
               </div>
           `);
         cartItemsContainer.append(cartItem);
         totalPrice += item.price * item.quantity;
      });

      if (cart.length === 0) {
         cartItemsContainer.append("<p>Корзина пуста.</p>");
      }

      cartContainer.find("#total-price").text(`$${totalPrice.toFixed(2)}`);
   }

   $(document).on("click", ".add-to-cart", function () {
      const name = $(this).data("name");
      const price = parseFloat($(this).data("price"));
      const existingItem = cart.find(item => item.name === name);

      if (existingItem) {
         existingItem.quantity += 1;
      } else {
         cart.push({ name, price, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
   });

   $(document).on("click", ".remove-from-cart", function () {
      const name = $(this).data("name");
      const index = cart.findIndex(item => item.name === name);

      if (index !== -1) {
         cart.splice(index, 1);
         localStorage.setItem('cart', JSON.stringify(cart));
         updateCart();
      }
   });

   updateCart();
});
