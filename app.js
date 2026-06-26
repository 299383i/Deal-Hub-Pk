// ==========================
// Deal Hub PK - Premium
// ==========================

const productsContainer = document.getElementById("products");
const searchBox = document.getElementById("searchBox");

let allProducts = [];

// Load Products
async function loadProducts() {
    try {

        const response = await fetch("products.json");
        allProducts = await response.json();

        displayProducts(allProducts);

    } catch (error) {

        productsContainer.innerHTML = `
        <h2 style="text-align:center;color:red;">
        Products could not be loaded.
        </h2>
        `;

        console.log(error);

    }
}

// Display Products

function displayProducts(products){

productsContainer.innerHTML="";

products.forEach(product=>{

productsContainer.innerHTML+=`

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

searchBox.addEventListener("keyup",()=>{

const keyword=searchBox.value.toLowerCase();

const filtered=allProducts.filter(product=>

product.name.toLowerCase().includes(keyword)

);

displayProducts(filtered);

});

// Start

loadProducts();
