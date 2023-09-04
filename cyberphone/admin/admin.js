import { LayThongTinTuForm, checkHTTP, checkNumber, checkRong, checkSeleted, renderProductList, showInfoLenForm } from "./controller.js";

const BASE_URL = "https://64df717b71c3335b2582a1ca.mockapi.io/product"

document.querySelector(".btn-banner").addEventListener('click',() => { 
    document.getElementById("formPhone").reset()
    document.getElementById("btnUpdate").style.display = "none"
    document.getElementById("btnAddPhone").style.display = "block"
    document.getElementById("id").readOnly = true
 })

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

window.deleteProduct = (id) => { 
    axios.delete(`${BASE_URL}/${id}`)
    .then((res) => {
            fetchProductList()
            console.log(res);
          })
          .catch((err) => {
           console.log(err);
          });
 }

window.editProduct = (id) => { 
    $('#exampleModal').modal('show')
    axios.get(`${BASE_URL}/${id}`)
    .then((res) => {
            showInfoLenForm(res.data)
            document.getElementById("btnUpdate").style.display = "block"
            document.getElementById("btnAddPhone").style.display = "none"
            document.getElementById("id").readOnly = true
            console.log(res);
          })
          .catch((err) => {
           console.log(err);
          });
 }


window.addProduct = function (){
    let product = LayThongTinTuForm()
    let isValid = checkRong(product.name,"tbname")
                & checkNumber(product.price,"tbprice")
                & checkRong(product.screen,"tbscreen")
                & checkRong(product.backCamera,"tbbackCam")
                & checkRong(product.frontCamera,"tbfrontCam")
                & checkHTTP(product.img,"tbimg")
                & checkRong(product.desc,"tbdesc")
                & checkSeleted(product.type,"tbtype")
    if (!isValid) return;
    axios.post(BASE_URL,product)
    .then((res) => {
        fetchProductList()
        $('#exampleModal').modal('hide')
        console.log(res);
          })
          .catch((err) => {
           console.log(err);
          });
}

window.updateProduct = () => { 
    let product = LayThongTinTuForm()
    axios.put(`${BASE_URL}/${product.id}`,product)
    .then((res) => {
            $('#exampleModal').modal('hide')
            fetchProductList()
            console.log(res);
          })
          .catch((err) => {
           console.log(err);
          });
 }