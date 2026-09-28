/* =========================================================
   SPYRO — CART SYSTEM
========================================================= */


/* =========================
   CART DATA
========================= */

let cart = JSON.parse(localStorage.getItem("spyroCart")) || [];


/* =========================
   ELEMENTS
========================= */

const cartCount = document.getElementById("cart-count");
const cartOverlay = document.getElementById("cart-overlay");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const openCartButton = document.getElementById("open-cart");
const closeCartButton = document.getElementById("close-cart");
const checkoutButton = document.getElementById("checkout-button");

const addButtons = document.querySelectorAll(".add-cart");


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "spyroCart",
        JSON.stringify(cart)
    );

}


/* =========================
   ADD PRODUCT
========================= */

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct = cart.find(
            item => item.name === name
        );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }


        saveCart();
        updateCart();
        openCart();

    });

});


/* =========================
   UPDATE CART
========================= */

function updateCart() {

    cartItems.innerHTML = "";


    /* Empty cart */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent = "₹0";
        cartCount.textContent = "0";

        return;
    }


    let total = 0;
    let totalItems = 0;


    /* Create cart items */

    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;
        totalItems += item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div>

                <div class="cart-item-name">
                    ${item.name}
                </div>

                <div class="cart-item-price">
                    ₹${item.price} × ${item.quantity}
                </div>


                <div class="quantity-controls">

                    <button
                        class="decrease"
                        data-index="${index}">
                        −
                    </button>


                    <span class="quantity-number">
                        ${item.quantity}
                    </span>


                    <button
                        class="increase"
                        data-index="${index}">
                        +
                    </button>

                </div>

            </div>


            <div>

                <div class="cart-item-price">
                    ₹${itemTotal}
                </div>

                <button
                    class="remove-item"
                    data-index="${index}">
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    /* Update total */

    cartTotal.textContent =
        `₹${total}`;


    /* Update count */

    cartCount.textContent =
        totalItems;


    /* Add quantity listeners */

    addQuantityListeners();

}


/* =========================
   QUANTITY BUTTONS
========================= */

function addQuantityListeners() {


    /* Increase */

    document.querySelectorAll(".increase")
        .forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);


                cart[index].quantity++;


                saveCart();
                updateCart();

            });

        });


    /* Decrease */

    document.querySelectorAll(".decrease")
        .forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);


                if (cart[index].quantity > 1) {

                    cart[index].quantity--;

                } else {

                    cart.splice(index, 1);

                }


                saveCart();
                updateCart();

            });

        });


    /* Remove */

    document.querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener("click", () => {

                const index =
                    Number(button.dataset.index);


                cart.splice(index, 1);


                saveCart();
                updateCart();

            });

        });

}


/* =========================
   OPEN CART
========================= */

function openCart() {

    cartOverlay.classList.add("active");

    document.body.classList.add("cart-open");

}


/* =========================
   CLOSE CART
========================= */

function closeCart() {

    cartOverlay.classList.remove("active");

    document.body.classList.remove("cart-open");

}


/* =========================
   OPEN BUTTON
========================= */

openCartButton.addEventListener(
    "click",
    openCart
);


/* =========================
   CLOSE BUTTON
========================= */

closeCartButton.addEventListener(
    "click",
    closeCart
);


/* =========================
   CLICK OUTSIDE CART
========================= */

cartOverlay.addEventListener(
    "click",
    event => {

        if (event.target === cartOverlay) {

            closeCart();

        }

    }
);


/* =========================
   ESCAPE KEY
========================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeCart();

        }

    }
);

/* =========================
   CHECKOUT
========================= */

checkoutButton.addEventListener(
    "click",
    () => {

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add a product first."
            );

            return;

        }

        window.location.href = "order.html";

    }
);


/* =========================
   NAVIGATION
========================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        function(event) {

            const targetId =
                this.getAttribute("href");


            if (targetId === "#") {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

});


/* =========================
   INITIAL LOAD
========================= */

updateCart();