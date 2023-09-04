export let renderProductList = (list) => { 
    let contentHTML = ""
    list.forEach((item) => { 
        let {id,name,price,screen,backCamera,frontCamera,img,desc,type} = item
        let StringTr = /*html*/
                        `
                            <tr>
                                <td>${id}</td>
                                <td><b>${name}</b></td>
                                <td>${price}</td>
                                <td><img src="${img}" class="w-2/4 inline-block" alt="" /></td>
                                <td>${desc}</td>
                                <td>
                                    <button class="btn btn-warning" onclick = "editProduct(${id})">Sửa</button>
                                    <button class="btn btn-danger" onclick = "deleteProduct(${id})">Xóa</button>
                                </td>
                            </tr>
                        `
        contentHTML += StringTr
     })
    document.getElementById("tablephone").innerHTML = contentHTML
 }

export let showInfoLenForm = (item) => { 
    let {id,name,price,screen,backCamera,frontCamera,img,desc,type} = item
    document.getElementById("id").value = id
    document.getElementById("name").value = name
    document.getElementById("price").value = price
    document.getElementById("screen").value = screen
    document.getElementById("backCam").value = backCamera
    document.getElementById("frontCam").value = frontCamera
    document.getElementById("img").value = img
    document.getElementById("desc").value = desc
    document.getElementById("type").value = type
}

export let LayThongTinTuForm = () => { 
    var id = document.getElementById("id").value 
    var name =document.getElementById("name").value
    var price =document.getElementById("price").value
    var screen =document.getElementById("screen").value
    var backCamera =document.getElementById("backCam").value
    var frontCamera =document.getElementById("frontCam").value
    var img =document.getElementById("img").value
    var desc =document.getElementById("desc").value
    var type =document.getElementById("type").value
    return {id,name,price,screen,backCamera,frontCamera,img,desc,type}
}

export let checkRong = (value,Err) => { 
    if (value.length == 0) {
        document.getElementById(Err).innerText = `Nội dung không được để trống`
        return false
    }   else {
        document.getElementById(Err).innerText =""
        return true
    }
 }

export let checkNumber = (value,Err) => { 
    let isValid = checkRong(value,Err)
    if (!isValid) return;
    const re = /^\d+$/;
    if (re.test(value)) {
        document.getElementById(Err).innerText = ""
        return true
    }   else {
        document.getElementById(Err).style.display="block"
        document.getElementById(Err).innerText = `Bạn phải nhập số`
        return false
    }
 }

export let checkHTTP = (value,Err) => { 
    let isValid = checkRong(value,Err)
    if (!isValid) return;
    const re = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    if (re.test(value)) {
        document.getElementById(Err).innerText = ""
        return true
    }   else {
        document.getElementById(Err).style.display="block"
        document.getElementById(Err).innerText = `Bạn phải nhập đúng URL`
        return false
    }
}

export let checkSeleted = (value,Err) => { 
    let isValid = checkRong(value,Err)
    if (!isValid) return;
    if (value === "Select brand") {
        document.getElementById(Err).style.display="block"
        document.getElementById(Err).innerText = `Bạn phải chọn Brand`
        return false
    }   else {
        document.getElementById(Err).innerText = ""
        return true
    }
}