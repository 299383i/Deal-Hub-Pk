// Deal Hub PK
// app.js

const productsContainer = document.getElementById("products");
const searchBox = document.getElementById("searchBox");

let products = [];

// Load Products
fetch("products.json")
  .then(response => response.json())
  .then(data => {
    products = data;
    displayProducts(products);
  })
  .catch(error => {
    console.error("Error loading products:", error);
    productsContainer.innerHTML =
      "<h3 style='text-align:center;'>Products could not be loaded.</h3>";
  });

// Display Products
function displayProducts(items) {

  productsContainer.innerHTML = "";

  items.forEach(product => {

    productsContainer.innerHTML += `

      <div class="card">

          <img src="${product.image}" alt="${product.name}">

          <div class="card-body">

              <h5 class="card-title">
                  ${product.name}
              </h5>

              <div class="rating">
                  ${product.rating}
              </div>

              <div class="price">
                  ${product.price}
              </div>

              <br>

              <a href="${product.link}" target="_blank">

                  <button class="buy-btn">
                      Buy on Daraz
                  </button>

              </a>

          </div>

      </div>

    `;

  });

}

// Search Products

searchBox.addEventListener("keyup", function () {

  const keyword = this.value.toLowerCase();

  const filtered = products.filter(product =>
    product.name.toLowerCase().includes(keyword)
  );

  displayProducts(filtered);

});
