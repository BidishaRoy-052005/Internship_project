const products = [
  { id: 1, name: "Wireless Headphones", category: "electronics", price: 500, rating: 4.5, image: "box3_img.jpg" },
  { id: 2, name: "Smartwatch", category: "electronics", price: 400, rating: 4.7, image: "sm_img.jpg" },
  { id: 3, name: "Casual Shirt", category: "fashion", price: 300, rating: 4.1, image:"shirt.jpg" },
  { id: 4, name: "Leather Jacket", category: "fashion", price: 1000, rating: 4.8, image: "jacket.jpg" },
  { id: 5, name: "Coffee Maker", category: "kichen", price: 800, rating: 4.3, image: "box4_img2.jpg" },
  { id: 6, name: "Home Decor", category: "decoration", price: 600, rating: 4.2, image: "box2_img2.jpg" },
  { id: 7, name: "Home Accessories", category: "home", price: 900, rating: 4.6, image: "box7_img.jpg" },
  { id: 8, name: "Home essentials", category: "home", price: 200, rating: 4.0, image: "box6_img.jpg" },
];

const productContainer = document.getElementById("productContainer");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const sortOption = document.getElementById("sortOption");

function displayProducts(filteredProducts) {
  productContainer.innerHTML = "";

  if (filteredProducts.length === 0) {
    productContainer.innerHTML = `<p style="text-align:center;color:#fff;font-size:1.2rem;">No products found 😢</p>`;
    return;
  }

  filteredProducts.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="price">$${p.price}</p>
        <p class="rating">⭐ ${p.rating}</p>
        <p>${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</p>
      </div>
    `;
    productContainer.appendChild(card);
  });
}

function filterAndSortProducts() {
  let filtered = [...products];

  const selectedCategory = categoryFilter.value;
  if (selectedCategory !== "all") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  const priceValue = priceFilter.value;
  filtered = filtered.filter((p) => {
    if (priceValue === "low") return p.price < 50;
    if (priceValue === "medium") return p.price >= 50 && p.price <= 150;
    if (priceValue === "high") return p.price > 150;
    return true;
  });

  const sortValue = sortOption.value;
  if (sortValue === "priceLowHigh") filtered.sort((a, b) => a.price - b.price);
  if (sortValue === "priceHighLow") filtered.sort((a, b) => b.price - a.price);
  if (sortValue === "ratingHighLow") filtered.sort((a, b) => b.rating - a.rating);

  displayProducts(filtered);
}

categoryFilter.addEventListener("change", filterAndSortProducts);
priceFilter.addEventListener("change", filterAndSortProducts);
sortOption.addEventListener("change", filterAndSortProducts);

displayProducts(products);
