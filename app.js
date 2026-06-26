// ======================================
// Deal Hub PK - Premium app.js
// ======================================

const productsContainer = document.getElementById("productsContainer");
const searchBox = document.getElementById("searchBox");

let allProducts = [];

// Load Products
async function loadProducts() {

    if (!productsContainer) return;

    try {

        const response = await fetch("products.json");

        allProducts = await response.json();

        displayProducts(allProducts);

    } catch (error) {

        console.error(error);

        productsContainer.innerHTML = `
            <h2 style="text-align:center;color:red;">
                Failed to load products.
            </h2>
        `;

    }

}

// Display Products

function displayProducts(products) {

    productsContainer.innerHTML = "";

    if (products.length === 0) {

        productsContainer.innerHTML = `
            <h2 style="text-align:center;">
                No Products Found
            </h2>
        `;

        return;

    }

    products.forEach(product => {

        productsContainer.innerHTML += `

<div class="card">

<img src="${product.image}" alt="${product.name}">

<div class="card-body">

<h3 class="card-title">

${product.name}

</h3>

<div class="rating">

${product.rating}

</div>

<div class="price">

${product.price}

</div>

<p>

${product.description}

</p>

<a
class="buy-btn"
href="product.html?id=${product.id}">

View Details

</a>

<br><br>

<a
class="buy-btn"
href="${product.link}"
target="_blank">

Buy on Daraz

</a>

</div>

</div>

`;

    });

}

// Live Search

if (searchBox) {

    searchBox.addEventListener("keyup", () => {

        const keyword = searchBox.value.toLowerCase();

        const filtered = allProducts.filter(product =>

            product.name.toLowerCase().includes(keyword) ||

            product.category.toLowerCase().includes(keyword)

        );

        displayProducts(filtered);

    });

}

// Start

loadProducts();
