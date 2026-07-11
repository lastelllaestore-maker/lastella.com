// ==========================================
// LASTELLA SHOPPING CART SYSTEM
// Part 1
// ==========================================

// Load cart from browser storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================================
// SAVE CART
// ==========================================

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    renderCart();

}

// ==========================================
// UPDATE CART COUNT
// ==========================================

function updateCartCount() {

    let totalItems = 0;

    cart.forEach(function(item){

        totalItems += item.quantity;

    });

    const badge = document.getElementById("cart-count");

    if(badge){

        badge.innerText = totalItems;

    }

}

// ==========================================
// ADD PRODUCT TO CART
// ==========================================

function addToCart(name, price, image, size = ""){

    price = Number(price);

    let existingProduct = cart.find(function(item){

        return item.name === name && item.size === size;

    });

    if(existingProduct){

        existingProduct.quantity++;

    }else{

        cart.push({

            name: name,

            price: price,

            image: image,

            size: size,

            quantity: 1

        });

    }

    saveCart();

    alert(name + " added to cart.");

}

// ==========================================
// GO TO CART PAGE
// ==========================================

function viewCart(){

    window.location.href = "cart.html";

}

// ==========================================
// OPEN / CLOSE CART SIDEBAR
// ==========================================

function toggleCart(){

    const sidebar = document.getElementById("cart-sidebar");

    if(sidebar){

        sidebar.classList.toggle("open");

    }

}
// ==========================================
// RENDER CART
// ==========================================

function renderCart() {

    const cartContainer = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");

    if (!cartContainer || !totalElement) return;

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <h3 style="text-align:center;padding:40px;">
                Your cart is empty.
            </h3>
        `;

        totalElement.innerHTML = "R.O 0.000";

        return;

    }

    let grandTotal = 0;

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        grandTotal += itemTotal;

        cartContainer.innerHTML += `

        <div class="cart-product">

            <img src="${item.image}" class="cart-image">

            <div class="cart-info">

                <h3>${item.name}</h3>

                <p>Size : ${item.size || "-"}</p>

                <p>Price : R.O ${item.price.toFixed(3)}</p>

                <div class="qty-box">

                    <button onclick="decreaseQty(${index})">−</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQty(${index})">+</button>

                </div>

            </div>

            <button class="remove-btn"
            onclick="removeItem(${index})">

                🗑️

            </button>

        </div>

        <hr>

        `;

    });

    totalElement.innerHTML = "R.O " + grandTotal.toFixed(3);

}
window.onload = function(){

    updateCartCount();

    renderCart();

    loadCheckout();

};
function increaseQty(index){

    cart[index].quantity++;

    saveCart();

}
function decreaseQty(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }

    saveCart();

}
function removeItem(index){

    if(confirm("Remove this product?")){

        cart.splice(index,1);

        saveCart();

    }

}
/* ===========================================
        LASTELLA HOMEPAGE SCRIPT
===========================================*/


/* Smooth Scroll */

document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

    anchor.addEventListener("click",function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({

            behavior:"smooth"

        });

    });

});


/* Fade In Animation */

const observer = new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

});

document.querySelectorAll("section").forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});


/* Back To Top Button */

const topButton=document.createElement("button");

topButton.innerHTML="↑";

topButton.className="top-btn";

document.body.appendChild(topButton);

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        topButton.classList.add("show-top");

    }else{

        topButton.classList.remove("show-top");

    }

});

topButton.onclick=function(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};


/* Hero Button Animation */

const shopBtn=document.querySelector(".shop-btn");

if(shopBtn){

setInterval(()=>{

shopBtn.classList.toggle("pulse");

},1200);

}


/* Product Card Hover */

document.querySelectorAll(".feature-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-10px) scale(1.03)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0px) scale(1)";

});

});
// ==========================================
// LOAD CHECKOUT
// ==========================================

function loadCheckout() {

    const container = document.getElementById("checkout-items");
    const subtotal = document.getElementById("checkoutSubtotal");
    const total = document.getElementById("checkoutTotal");

    // Only run on checkout.html
    if (!container || !subtotal || !total) return;

    container.innerHTML = "";

    if (cart.length === 0) {

        container.innerHTML = `
            <p style="text-align:center;">
                Your cart is empty.
            </p>
        `;

        subtotal.innerHTML = "R.O 0.000";
        total.innerHTML = "R.O 0.000";

        return;
    }

    let grandTotal = 0;

    cart.forEach((item) => {

        let itemTotal = item.price * item.quantity;

        grandTotal += itemTotal;

        container.innerHTML += `

        <div class="checkout-product">

            <img src="${item.image}" class="checkout-image">

            <div class="checkout-info">

                <h4>${item.name}</h4>

                <p>Size : ${item.size || "-"}</p>

                <p>Quantity : ${item.quantity}</p>

                <p>Price : R.O ${item.price.toFixed(3)}</p>

            </div>

        </div>

        <hr>

        `;

    });

 subtotal.innerHTML = "R.O " + grandTotal.toFixed(3);

const shipping = Number(
    document.getElementById("shippingType").value
);

total.innerHTML =
"R.O " + (grandTotal + shipping).toFixed(3);
}
// ==========================================
// PLACE ORDER
// ==========================================

function placeOrder() {

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const city = document.getElementById("city").value.trim();
    const address = document.getElementById("address").value.trim();
    const notes = document.getElementById("notes").value.trim();

    if (
        firstName === "" ||
        lastName === "" ||
        phone === "" ||
        email === "" ||
        city === "" ||
        address === ""
    ) {

        alert("Please fill all required fields.");
        return;

    }

    if (cart.length === 0) {

        alert("Your cart is empty.");
        return;

    }

    sendWhatsAppOrder(
        firstName,
        lastName,
        phone,
        email,
        city,
        address,
        notes
    );

}
// ==========================================
// SEND ORDER TO WHATSAPP
// ==========================================
function searchProducts(){

    const input = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(card=>{

        const name = card
            .querySelector("h3")
            .textContent
            .toLowerCase();

        if(name.includes(input)){

            card.style.display="block";

        }else{

            card.style.display="none";

        }

    });

}
function selectSize(button,size){

    const buttons = button.parentElement.querySelectorAll("button");

    buttons.forEach(btn=>btn.classList.remove("active"));

    button.classList.add("active");

    button.parentElement.dataset.size = size;

}
function addRingToCart(button,name,price){

    const card = button.closest(".card");

    const image = card.querySelector("img").src;

    const sizeBox = card.querySelector(".size-selector");

    const size = sizeBox.dataset.size;

    if(!size){

        alert("Please select a ring size.");

        return;

    }

    addToCart(name,price,image,size);

}

async function sendWhatsAppOrder(
    firstName,
    lastName,
    phone,
    email,
    city,
    address,
    notes
){

    let payment = document.querySelector(
        'input[name="payment"]:checked'
    );

    payment = payment ? payment.value : "Cash on Delivery";

    // Shipping
    const shippingSelect = document.getElementById("shippingType");

    const shippingType = shippingSelect.options[shippingSelect.selectedIndex].text;

    const shippingCost = Number(shippingSelect.value);

    let subtotal = 0;

    let message =
`🛍️ *NEW ORDER - LASTELLA*

`;

    message += `👤 Name: ${firstName} ${lastName}\n`;
    message += `📞 Phone: ${phone}\n`;
    message += `📧 Email: ${email}\n`;
    message += `📍 City: ${city}\n`;
    message += `🏠 Address: ${address}\n`;
    message += `💳 Payment: ${payment}\n`;
    message += `🚚 Shipping: ${shippingType}\n\n`;

    message += "🛒 PRODUCTS\n\n";

    cart.forEach(item => {

        const itemTotal = item.price * item.quantity;

        subtotal += itemTotal;

        message +=
`${item.name}
Size: ${item.size || "-"}
Quantity: ${item.quantity}
Price: R.O ${item.price.toFixed(3)}
-------------------------
`;

    });

 const finalTotal = subtotal + shippingCost;

try {

    await sendEmails(
        firstName,
        lastName,
        phone,
        email,
        city,
        address,
        notes,
        payment,
        subtotal,
        shippingCost,
        finalTotal
    );

    console.log("Emails sent successfully");

} catch (error) {

    console.error(error);
    alert("Email sending failed!");

}

message += `\nSubtotal: R.O ${subtotal.toFixed(3)}\n`;
   message += `Shipping: R.O ${shippingCost.toFixed(3)}\n`;
    message += `💰 TOTAL: R.O ${finalTotal.toFixed(3)}\n`;

    if(notes !== ""){

        message += `\n📝 Notes:\n${notes}`;

    }

    const whatsappNumber = "96875029949";

    window.open(
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message),
        "_blank"
    );

    // Clear cart
    cart = [];

    localStorage.removeItem("cart");

    saveCart();

    setTimeout(function(){

        window.location.href = "success.html";

    },1000);

}
// ==========================================
// SHOW / HIDE BANK DETAILS
// ==========================================

function toggleBankDetails() {

    const payment = document.querySelector(
        'input[name="payment"]:checked'
    );

    const bankDetails = document.getElementById("bankDetails");

    if (!payment || !bankDetails) return;

    if (payment.value === "Bank Transfer") {

        bankDetails.style.display = "block";

    } else {

        bankDetails.style.display = "none";

    }

}
const modal = document.getElementById("imageModal");

const modalImg = document.getElementById("zoomedImage");

document.querySelectorAll(".card img").forEach(img=>{

    img.style.cursor="zoom-in";

    img.onclick=function(){

        modal.style.display="flex";

        modalImg.src=this.src;

    }

});

document.querySelector(".close-image").onclick=function(){

    modal.style.display="none";

}

modal.onclick=function(e){

    if(e.target===modal){

        modal.style.display="none";

    }

}

// ==========================================
// UPDATE SHIPPING
// ==========================================

function updateShipping(){

    const shipping = Number(
        document.getElementById("shippingType").value
    );

    let subtotal = 0;

    cart.forEach(item=>{

        subtotal += item.price * item.quantity;

    });

    const total = subtotal + shipping;

    document.getElementById("checkoutSubtotal").innerHTML =
        "R.O " + subtotal.toFixed(3);

    document.getElementById("checkoutTotal").innerHTML =
        "R.O " + total.toFixed(3);

}
async function sendEmails(
    firstName,
    lastName,
    phone,
    email,
    city,
    address,
    notes,
    payment,
    subtotal,
    shippingCost,
    finalTotal
){

    try{

        const response = await fetch(
            "https://lastella-order-api.lastelllaestore.workers.dev/",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    customer_name: firstName + " " + lastName,

                    email,

                    phone,

                    city,

                    address,

                    payment,

                    subtotal: subtotal.toFixed(3),

                    shipping: shippingCost.toFixed(3),

                    total: finalTotal.toFixed(3),

                    products: cart

                })

            }
        );

        const result = await response.json();

        if(response.ok && result.success){

            console.log("✅ Owner email sent successfully.");

        }else{

            console.error(result);

            alert("❌ Failed to send owner email.");

        }

    }catch(error){

        console.error(error);

        alert("❌ Network Error. Please try again.");

    }

}