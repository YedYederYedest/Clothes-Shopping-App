import { clothesArray } from "./data.js";

const paymentDiv = document.getElementById("pay");
const cartHTML = document.getElementById("cart");
const completeOrderBtn = document.getElementById("cart-completeOrderBtn");
const paymentForm = document.getElementById("pay-modal");
const orderMessage = document.getElementById("orderMessage");
const paidMessage = document.getElementById("orderMessage-paid");
const closeModal = document.getElementById("closeModal");

const currFashion = [];
const data = {};

document.getElementById("yearUpdate").textContent = new Date().getFullYear();

// Render clothing menu
function renderFashion() {
    const fashionHTML = document.getElementById("menu");
    fashionHTML.innerHTML = clothesArray.map(fashionOption => `
        <div class="menuOptions">
            <span class="emoji">${fashionOption.emoji}</span>
            <div class="foodOption">
                <h2>${fashionOption.name}</h2>
                <h3>$${fashionOption.price}</h3>
                <p>${fashionOption.place}</p>
            </div>
            <button class="addButton" data-order="${fashionOption.id}">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
    `).join("");

    document.querySelectorAll(".addButton").forEach(addBtn => {
        addBtn.addEventListener("click", e => {
            const fashionID = parseInt(e.target.closest("button").dataset.order);
            const selectedFashion = clothesArray.find(item => item.id === fashionID);
            if (selectedFashion) {
                currFashion.push(selectedFashion);
                renderCart();
            }
        });
    });
}

// Render cart
function renderCart() {
    const orderCartList = document.getElementById("cart-user-order");
    cartHTML.style.display = currFashion.length > 0 ? "block" : "none";

    orderCartList.innerHTML = currFashion.map((item, index) => `
        <li class="cart-user-order">
            <h2>${item.name}</h2>
            <button class="removeButton" data-index="${index}">Remove</button>
            <p class="cart-item-price">$${item.price}</p>
        </li>
    `).join("");

    const totalPrice = currFashion.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("cart-user-total-amount").textContent = `$${totalPrice}`;

    document.querySelectorAll(".removeButton").forEach(btn => {
        btn.addEventListener("click", e => {
            const id = e.target.dataset.index;
            currFashion.splice(id, 1);
            renderCart();
        });
    });
}

completeOrderBtn.addEventListener("click", () => {
    paymentDiv.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    paymentDiv.style.display = "none";
});

paymentDiv.addEventListener("click", e => {
    if (e.target === paymentDiv) {
        paymentDiv.style.display = "none";
    }
});

paymentForm.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(paymentForm);
    formData.forEach((value, key) => {
        data[key] = value;
    });

    renderComplete();
});

function renderComplete() {
    cartHTML.style.display = "none";
    paymentDiv.style.display = "none";
    orderMessage.style.display = "block";
    paidMessage.innerText = `Thank you ${data.customerName}, your order is on its way!`;
}

renderFashion();
