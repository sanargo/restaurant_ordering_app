// imports

import { menuArray } from "./data.js";

// global variables

const modal = document.querySelector("#modal")
const chosen = document.querySelector("#chosen")
let itemList = []

// click events

document.addEventListener("click", function(e) {
    if (e.target.dataset.addItem) {
        handleClickAdd(e.target.dataset.addItem);
    } 
    if (e.target.dataset.remove) {
        handleClickRemove(e.target.dataset.remove)
    }
    if (e.target.id === "complete-order-btn") {
        handleClickForm()
    }
})

// submit events

document.addEventListener("submit", function(e) {
    if (e.target.id === "payment-form") {
        e.preventDefault()
        handleClickPayment();
    }
})

// funtions for adding items

function handleClickAdd(itemId) {

    const targetItemObj = menuArray.filter(function(item) {
        return +itemId === item.id; 
    })[0]

    itemList.push(targetItemObj)

    chosen.style.display = 'block'

    renderList(itemList)

}

function renderList(arr) {
    document.querySelector("#chosen-container").innerHTML = getListHtml(arr)
}

function getListHtml(arr) {

    let itemPrice = 0

    let listHtml = ''

    listHtml += `<h3>Your order</h3>`

    arr.forEach(function(item) {
        listHtml +=
        `
        <div class="chosen--container__list">
            <h3>${item.name} <span data-remove='${item.id}'>remove</span></h3>
            <h6>$${item.price}</h6>
        </div>
        `
        itemPrice = itemPrice + item.price
    })

    listHtml += `
    <div class="total-price">
        <h3>Total price:</h3>
        <h6>$${itemPrice}</h6>
    </div>
    <button class="chosen-btn" id='complete-order-btn'>Complete order</button>
    `
    return listHtml

}

// funtions for the remove btn

function handleClickRemove(removeId) {

    const targetItemObj = itemList.filter(function(item) {
        return +removeId === item.id
    })[0]

    const indexItem = itemList.indexOf(targetItemObj);

    itemList.splice(indexItem, 1)

    renderList(itemList)

    if (!itemList.length) {
        chosen.style.display = 'none'
    }
}

// funtions for the form

function handleClickForm() {
    
    modal.style.display = 'block'

    modal.innerHTML = `
    <div class="modal-inner" id="modal-inner">
        <h2>Enter card details</h2>

        <form id="payment-form">

            <input 
                type="text" 
                id="nameText" 
                name="name"
                placeholder="Enter your name"
                aria-label="name"
                required>

            <input 
                type="number" 
                id="cardNumber" 
                name="cardNumber"
                placeholder="Enter card name"
                aria-label="card number"
                required>

            <input 
                type="number" 
                id="cvvNumber" 
                name="cvvNumber"
                placeholder="Enter CVV"
                aria-label="cvv Number"
                required>

            <div class="modal-pay-btn-container">
                <button class="modal-pay-btn" id="modal-pay-btn" type="submit">Pay</button>
            </div>
        </form>
    </div>
    `
}

// funtions for submiting the payment

function handleClickPayment() {

    const paymentForm = document.getElementById('payment-form')
    const paymentFormData = new FormData(paymentForm)
    const name = paymentFormData.get('name')
    
    console.log(`Thanks, ${name}! Your order is on its way!`);

    document.getElementById("modal-inner").remove()
    document.getElementById("chosen-container").remove()
    modal.style.display = 'none'

    // chosen.style.display = 'block'


    chosen.innerHTML = `
    <div class="thanks-message">
        <h2>Thanks, ${name.trim()}! Your order is on its way!</h2>
    </div>
    `
}

// funtions for rendering the main information

function getMenuHtml() {

    let menuHtml = ''

    menuArray.forEach(function(item) {

        menuHtml += `
        <div class="menu--item">
            <div class="menu--item__description">
                <span>${item.emoji}</span>
                <div class="description--text">
                    <h3>${item.name}</h3>
                    <p>${item.ingredients}</p>
                    <h6>$${item.price}</h6>
                </div>
            </div>
            <button class="add-item" data-add-item="${item.id}">+</button>
        </div>
        `
    })
    return menuHtml
}

function renderMenu() {
    document.querySelector("#menu").innerHTML = getMenuHtml()
}

renderMenu()