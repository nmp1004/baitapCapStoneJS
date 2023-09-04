import {  fillProduct , renderCart, renderProductList } from "./controller.js"
import { CartItem } from "./model.js";

const BASE_URL = "https://64df717b71c3335b2582a1ca.mockapi.io/product"
let menu = document.getElementById("menu")
let navbar = document.getElementById("navbar")
let cart = []; 

let jsondata = localStorage.getItem("Giỏ hàng")

if (jsondata != null) {
    var list = JSON.parse(jsondata)
    cart = list.map((item) => { 
        return new CartItem(item.product,item.quatify)
     })
}

let isCheck = true;
document.querySelector(".navbar-toggle").addEventListener('click',() => { 
    if (isCheck) {
        document.getElementById("menu").style.display = "flex"
        isCheck = false
    }   else {
        document.getElementById("menu").style.display = "none"
        isCheck = true
    }
 })

const mediaNavbar = window.matchMedia('( min-width:1024px )')

if (mediaNavbar) {
    document.getElementById("menu").style.display = "none"
}

let count = localStorage.getItem("cartCount")
let countCart = JSON.parse(count)
document.getElementById("cartCount").innerHTML = countCart

let fetchProductList = () => { 
     axios.get(BASE_URL)
     .then((res) => {
            renderProductList(res.data)
            console.log(res);
           })
           .catch((err) => {
            console.log(err);
           });
  }  

fetchProductList()

window.fillType = () => { 
    let type = document.getElementById("locHang").value;
    axios.get(BASE_URL)
    .then((res) => {
            let FillSucess = fillProduct(res.data,type);
            renderProductList(FillSucess)
           console.log(res);
          })
          .catch((err) => {
           console.log(err);
          });
 }

window.showCart = () => { 
    let check = document.getElementById("cart")
    if (check.classList.contains("is-hidden")) {
        check.classList.remove("is-hidden")
    }   else {
        check.classList.add("is-hidden")
    }
 }

window.addProdct = (id) => { 
    axios.get(`${BASE_URL}/${id}`)
    .then((res) => {
            let isExist = false 
            cart.forEach((item) => {    
                if (item.product.id == id ) {
                    isExist = true
                    item.plusQuantify()
                }
             })
            if (!isExist) {
                cart.push(new CartItem(res.data,1))
            }
            let numberCart = 0;
            cart.forEach((item) => { 
                numberCart += item.quatify
             })
            document.getElementById("cartCount").innerHTML = numberCart
            localStorage.setItem("Giỏ hàng",JSON.stringify(cart))
            localStorage.setItem("cartCount",JSON.stringify(numberCart))
            renderCart(cart)

          })
          .catch((err) => {
           console.log(err);
          });
 }
renderCart(cart)
console.log(cart);

window.EmptyCart = () => { 
    cart=[]
    countCart= 0
    renderCart(cart)
    localStorage.setItem("Giỏ hàng",JSON.stringify(cart))
    localStorage.setItem("cartCount",JSON.stringify(countCart))
    document.getElementById("cartCount").innerHTML = countCart
 }

window.payNow = () => { 
    if (cart.length == 0 ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
    }   else {
        cart=[]
        countCart= 0
        renderCart(cart)
        localStorage.setItem("Giỏ hàng",JSON.stringify(cart))
        localStorage.setItem("cartCount",JSON.stringify(countCart))
        document.getElementById("cartCount").innerHTML = countCart
        Swal.fire(
            'Good job!',
            'Your order is completed',
            'success'
      )
    }
 }

window.btnMinus = (id) => { 
    cart.forEach((item,index) => { 
        if (item.product.id == id) {
            item.quatify--;
        }
        if (item.quatify == 0) {
            cart.splice(index,1)
        }
     })
     let numberCart = 0;
     cart.forEach((item) => { 
         numberCart += item.quatify
      })
    document.getElementById("cartCount").innerHTML=numberCart
    renderCart(cart)
    localStorage.setItem("Giỏ hàng",JSON.stringify(cart))
    localStorage.setItem("cartCount",JSON.stringify(numberCart))
 }

window.btnAdd = (id) => { 
    cart.forEach((item) => { 
        if (item.product.id == id ) {
            item.quatify++;
        }
     })
     let numberCart = 0;
     cart.forEach((item) => { 
         numberCart += item.quatify
      })
      document.getElementById("cartCount").innerHTML=numberCart
      renderCart(cart)
      localStorage.setItem("Giỏ hàng",JSON.stringify(cart))
      localStorage.setItem("cartCount",JSON.stringify(numberCart))
 }

window.removeProduct = (id) => { 
    cart.forEach((item,index) => { 
        if (item.product.id == id) {
            cart.splice(index,1)
        }
     })
     let numberCart = 0;
     cart.forEach((item) => { 
         numberCart += item.quatify
      })
    document.getElementById("cartCount").innerHTML=numberCart
    renderCart(cart)
    localStorage.setItem("Giỏ hàng",JSON.stringify(cart))
    localStorage.setItem("cartCount",JSON.stringify(numberCart))
 }