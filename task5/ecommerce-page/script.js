


// ====== SMOOTH SCROLL ======
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const section = document.querySelector(link.getAttribute('href'));
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  });
});

// ====== NEWSLETTER FORM (FAKE SUBMIT) ======
document.querySelector('.newsletter form').addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for subscribing!');
  e.target.reset();
});
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  nav.classList.toggle("nav-active");
});
// ===== CART FUNCTIONALITY =====
const cartItemsContainer = document.getElementById("cart-items");
const cartSubtotalEl = document.getElementById("cart-subtotal");

// Example cart data (replace with dynamic cart later)
let cart = [
  { id: 1, name: "Running Shoes", price: 49.99, quantity: 1, img: "images/shoes.jpg" },
  { id: 2, name: "Wireless Headphones", price: 89.99, quantity: 2, img: "images/headphones.jpg" },
];

// Function to display cart
function displayCart() {
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    const total = (item.price * item.quantity).toFixed(2);
    subtotal += parseFloat(total);

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <img src="${item.img}" alt="${item.name}" />
        <span>${item.name}</span>
      </td>
      <td>$${item.price.toFixed(2)}</td>
      <td><input type="number" min="1" class="quantity" value="${item.quantity}" data-index="${index}" /></td>
      <td>$${total}</td>
      <td><button class="btn-remove" data-index="${index}">Remove</button></td>
    `;
    cartItemsContainer.appendChild(tr);
  });

  cartSubtotalEl.textContent = subtotal.toFixed(2);

  // Add event listeners
  document.querySelectorAll(".btn-remove").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const idx = e.target.dataset.index;
      cart.splice(idx, 1);
      displayCart();
    })
  );

  document.querySelectorAll(".quantity").forEach((input) =>
    input.addEventListener("change", (e) => {
      const idx = e.target.dataset.index;
      let qty = parseInt(e.target.value);
      if (qty < 1) qty = 1;
      cart[idx].quantity = qty;
      displayCart();
    })
  );
}

// Initialize cart display
displayCart();

// ===== Checkout (Buy Page) =====
const checkoutForm = document.getElementById("checkout-form");
if (checkoutForm) {
  checkoutForm.addEventListener("submit", e => {
    e.preventDefault();
    alert("Order placed successfully! Thank you for shopping.");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
}

// Run displayCart() when on cart page
window.addEventListener("DOMContentLoaded", displayCart);
// ===== Add to Cart from Product Page =====
const addToCartBtn = document.getElementById("add-to-cart-btn");

if (addToCartBtn) {
  addToCartBtn.addEventListener("click", () => {
    const name = document.getElementById("product-name").innerText;
    const priceText = document.getElementById("product-price").innerText.replace("$", "");
    const price = parseFloat(priceText);
    const image = document.getElementById("product-img").getAttribute("src");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.name === name);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ name, price, image, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
  });
}
// ===== Contact Form Submission =====
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && message) {
      alert(`Thank you, ${name}! Your message has been sent successfully.`);
      contactForm.reset();
    } else {
      alert("Please fill out all fields before submitting.");
    }
  });
}
function addToCartFromPage() {
  let title = document.getElementById("product-title").textContent;
  let price = document.getElementById("product-price").textContent;
  let img = document.getElementById("product-img").src;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ title, price, img });

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}
currentProduct = {
  title: card.dataset.title,
  price: card.dataset.price,
  img: card.dataset.img     // ✔ this is correct
};
