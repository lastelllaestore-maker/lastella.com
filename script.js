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

function sendWhatsAppOrder(
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
    sendEmails(
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

    const products = cart.map(item =>
        `${item.name}
Size: ${item.size || "-"}
Qty: ${item.quantity}
Price: R.O ${item.price.toFixed(3)}`
    ).join("\n\n");

    const orderId = "LS" + Date.now();

    const params = {

        customer_name: firstName + " " + lastName,

        name: firstName + " " + lastName,

        phone: phone,

        email: email,

        city: city,

        address: address,

        notes: notes,

        payment: payment,

        products: products,

        quantity: cart.length,

        total: finalTotal.toFixed(3),

        order_id: orderId

    };

    try{

        await emailjs.send(
            "service_flr88lm",
            "template_y3a94ys",
            params
        );

        await emailjs.send(
            "service_flr88lm",
            "template_bgebrc8",
            params
        );

        console.log("Emails Sent");

    }catch(error){

        console.error(error);

    }

}