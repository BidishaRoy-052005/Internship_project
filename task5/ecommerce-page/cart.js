const cartContainer = document.getElementById("cart-container");
const totalElement = document.getElementById("cart-total");
const clearBtn = document.getElementById("clear-cart");

function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalElement.textContent = "0.00";
    return;
  }

  let total = 0;
  cartContainer.innerHTML = cart.map((item, i) => {
    total += item.price * item.qty;
    return `
      <div class="cart-item">
        <div>
          <h4>${item.name}</h4>
          <p>$${item.price} × ${item.qty}</p>
        </div>
        <div>
          <button onclick="changeQty(${i}, -1)">−</button>
          <button onclick="changeQty(${i}, 1)">+</button>
          <button onclick="removeItem(${i})">Remove</button>
        </div>
      </div>
    `;
  }).join("");

  totalElement.textContent = total.toFixed(2);
}

function changeQty(index, delta) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].qty += delta;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("cart");
  renderCart();
});

renderCart();
function addToCart(title, price, img) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    title: title,
    price: price,
    img: img   // <-- IMPORTANT!
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

