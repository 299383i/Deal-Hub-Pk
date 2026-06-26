/* ==========================================
   DEAL HUB PK v1.0 FINAL
========================================== */

const productsContainer = document.getElementById("productsContainer");
const searchBox = document.getElementById("searchBox");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const backToTop = document.getElementById("backToTop");

let allProducts = [];

/* ==========================================
   HERO SLIDER
========================================== */

const heroSlides = [

{
title:"Samsung Galaxy A07",
text:"Latest Samsung smartphone with PTA approval and amazing value for money.",
image:"images/samsung-a07.jpg"
},

{
title:"Wireless Microphone",
text:"Perfect for YouTube, Podcasts, Interviews and Live Streaming.",
image:"images/wireless-mic.jpg"
},

{
title:"M10 Wireless Earbuds",
text:"Crystal clear sound with long battery life and premium design.",
image:"images/m10-earbuds.jpg"
},

{
title:"Portable Mist Fan",
text:"Stay cool anywhere with USB powered portable air cooler.",
image:"images/mist-fan.jpg"
}

];

let currentSlide=0;

const heroTitle=document.getElementById("heroTitle");
const heroText=document.getElementById("heroText");
const heroImage=document.getElementById("heroImage");

function changeHero(){

if(!heroTitle) return;

currentSlide++;

if(currentSlide>=heroSlides.length){

currentSlide=0;

}

heroTitle.textContent=heroSlides[currentSlide].title;

heroText.textContent=heroSlides[currentSlide].text;

heroImage.src=heroSlides[currentSlide].image;

}

setInterval(changeHero,4000);

/* ==========================================
   MOBILE MENU
========================================== */

if(menuToggle){

menuToggle.onclick=()=>{

navMenu.classList.toggle("active");

}

}

/* ==========================================
   BACK TO TOP
========================================== */

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

backToTop.style.display="block";

}else{

backToTop.style.display="none";

}

});

backToTop.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

/* ==========================================
   LOAD PRODUCTS
========================================== */

async function loadProducts(){

const response=await fetch("products.json");

allProducts=await response.json();

displayProducts(allProducts);

}

loadProducts();

/* ==========================================
PART 1 END
========================================== */
/* ==========================================
   DISPLAY PRODUCTS
========================================== */

function displayProducts(products){

productsContainer.innerHTML="";

if(products.length===0){

productsContainer.innerHTML=`

<div class="no-products">

<h2>No Products Found 😔</h2>

<p>Please try another keyword.</p>

</div>

`;

return;

}

products.forEach(product=>{

productsContainer.innerHTML+=`

<div class="product-card">

<span class="discount-badge">

${product.discount}

</span>

<img
src="${product.image}"
alt="${product.name}"
loading="lazy">

<div class="product-content">

<div class="product-category">

${product.category}

</div>

<h3 class="product-title">

${product.name}

</h3>

<div class="product-brand">

${product.brand}

</div>

<div class="product-rating">

${product.rating}

</div>

<div class="price-row">

<span class="new-price">

${product.price}

</span>

<span class="old-price">

${product.oldPrice}

</span>

</div>

<p class="product-description">

${product.description.substring(0,90)}...

</p>

<div class="card-buttons">

<a
class="details-btn"
href="${product.link}"
target="_blank">

View Details

</a>

<a
class="buy-btn"
href="${product.link}"
target="_blank">

🛒 Buy Now

</a>

</div>

</div>

</div>

`;

});

}

/* ==========================================
PART 2 END
========================================== */
/* ==========================================
   LIVE SEARCH
========================================== */

if(searchBox){

searchBox.addEventListener("keyup",(e)=>{

const keyword=e.target.value.toLowerCase().trim();

const filtered=allProducts.filter(product=>{

return(

product.name.toLowerCase().includes(keyword) ||

product.category.toLowerCase().includes(keyword) ||

product.brand.toLowerCase().includes(keyword)

);

});

displayProducts(filtered);

});

}

/* ==========================================
   CATEGORY FILTER
========================================== */

const categoryCards=document.querySelectorAll(".category-card");

categoryCards.forEach(card=>{

card.addEventListener("click",()=>{

const category=card.dataset.category;

if(category==="More"){

displayProducts(allProducts);

return;

}

const filtered=allProducts.filter(product=>

product.category.toLowerCase()===category.toLowerCase()

);

displayProducts(filtered);

window.scrollTo({

top:document.getElementById("products").offsetTop-70,

behavior:"smooth"

});

});

});

/* ==========================================
   NEWSLETTER
========================================== */

const newsletterForm=document.getElementById("newsletterForm");

if(newsletterForm){

newsletterForm.addEventListener("submit",(e)=>{

e.preventDefault();

alert("✅ Thanks for subscribing to Deal Hub PK!");

newsletterForm.reset();

});

}

/* ==========================================
   SCROLL ANIMATION
========================================== */

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".product-card,.category-card,.feature,.deal-box").forEach(el=>{

observer.observe(el);

});

/* ==========================================
   IMAGE FALLBACK
========================================== */

document.addEventListener("error",(e)=>{

if(e.target.tagName==="IMG"){

e.target.src="images/no-image.png";

}

},true);

/* ==========================================
   CURRENT YEAR
========================================== */

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}

/* ==========================================
   DEAL HUB PK
   VERSION 1.0 FINAL
========================================== */

console.log("✅ Deal Hub PK Loaded Successfully");
