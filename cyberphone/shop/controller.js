export let renderProductList = (list) => { 
    let contentHTML = ""
    list.forEach((product) => { 
        let {id,name,price,screen,backCamera,frontCamera,img,desc,type} = product
        let StringDiv = /*html*/
                        `
                        <div class="h-100 text-black card">
                            <div class="card-overplay"></div>
                            <img src="${img}" alt="Phone Image" class="card-img">
                            <div class="card-details absolute text-center ">
                                <h3 class="pb-10">Specifications</h3>
                                <div class="flex justify-items-start"style ="font-size :14px; text-align:start;">
                                    <span class="text-white">
                                        <b class="mr-2">Screen:</b>
                                    </span >
                                    <span class="text-white">${screen}</span>
                                </div>
                                <div class="flex justify-items-start"style ="font-size :14px; text-align:start;">
                                    <span class="text-white">
                                        <b>Back Camera:</b> ${backCamera}
                                    </span >
                                </div>
                                <div class="flex justify-items-start"style ="font-size :14px; text-align:start;">
                                    <span class="text-white">
                                        <b class="mr-2">Front Camera:</b>
                                    </span >
                                    <span class="text-white">${frontCamera}</span>
                                </div>
                                <p class="pt-10 text-white">
                                    <u>click here for more details</u>
                                </p>
                            </div>
                            <div class="card-body">
                                <div class="text-center ">
                                    <h5 class="font-semibold pt-4">${name}</h5>
                                    <span class="text-muted mb-2">$${price}</span>
                                    <span class="text-red-500">
                                        <s>$333</s>
                                    </span>
                                </div>
                                <div class="brand-box text-center mt-3">
                                    <span>${type}</span>
                                </div>
                                <div class="flex justify-items-start pt-3">
                                    <span>
                                        <b>Description:</b>
                                        ${desc}
                                    </span>
                                </div>
                                <div class="flex pt-3 justify-between">
                                    <div class="text-yellow-500">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </div>
                                    <span class="text-green-600">
                                        <b>In Stock</b>
                                    </span>
                                </div>
                                <button class="btn btn-warning text-center" onclick="addProdct(${id})">Add to cart</button>
                            </div>
                        </div>
                        `
                        contentHTML += StringDiv
     })
     document.getElementById("bodySanPham").innerHTML = contentHTML

}

export let fillProduct = (list,type) => { 
    let AfterFill=[];
    list.forEach((item) => { 
        if (type == "loai1") {
            if (item.type === "Iphone") {
                AfterFill.push(item)
            }
        }   else if (type == "loai2") {
                    if (item.type === "Samsung") {
                        AfterFill.push(item)
                    }
                }   else {
                    AfterFill.push(item)
                }
     }) 
    return AfterFill;
 }


export let renderCart = (list) => { 
    let contentHTML =""
    list.forEach((item) => { 
        let StringCart = /*html*/ 
                        `
                        <div class="product p-5 flex flex-col">
                        <div class="product_1 flex">
                            <div class="product_1_img">
                                <img src="${item.product.img}" alt="phonecamera">
                            </div>
                            <div class="product_1_content flex flex-col pl-4">
                                <div class="mb-2"><b>${item.product.name}</b></div>
                                <div class="content-sub">
                                    Screen:
                                    <span>${item.product.screen}</span>
                                </div>
                                <div class="content-sub">
                                    Back Camera:
                                    <span>${item.product.backCamera}</span>
                                </div>
                                <div class="content-sub">
                                    Front Camera:
                                    <span>${item.product.frontCamera}</span>
                                </div>
                                <div class="mt-2">
                                    <a href="#!" type="button" onclick="removeProduct(${item.product.id})">Remove</a>
                                </div>
                            </div>
                        </div>
                        <div class="product_2 flex pt-3 justify-between">
                                <div class="quanti">
                                    <span class="mr-2"><b>Quantity:</b></span>
                                    <span class="minus" onclick="btnMinus(${item.product.id})">-</span>
                                    <span class="quantifyResult">${item.quatify}</span>
                                    <span class="plus" onclick="btnAdd(${item.product.id})">+</span>
                                </div>
                                <div class="product_price">
                                    <b>$${item.product.price * item.quatify}</b>
                                </div>
                        </div>
                    </div>
                        `
        contentHTML +=StringCart
     })
     document.getElementById("cartList").innerHTML = contentHTML
     let subTotal = calculateSubtotal(list) 
     let shipping = subTotal > 0 ? 10 : 0 
     document.getElementById("subTotal").innerHTML = "$"+ subTotal ; 
     document.getElementById("shipping").innerHTML = "$"+ shipping ; 
     document.getElementById("tax").innerHTML = "$"+ Math.floor(subTotal * 0.1) ; 
     document.getElementById("priceTotal").innerHTML = "$"+ Math.floor(subTotal * 1.1 + shipping) ; 
 }

let calculateSubtotal = (list) => { 
    let subTotal = 0 ;
    list.forEach((item) => { 
        subTotal += item.product.price * item.quatify
     })  
     return subTotal
 }