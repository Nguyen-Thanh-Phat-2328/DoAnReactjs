// const btnAdToCart = document.querySelectorAll(".add-to-cart")
// console.log(btnAdToCart)

let objChaLocal = localStorage.getItem("Carts")
let objCha = {}
if (objChaLocal) {
    objCha = JSON.parse(objChaLocal)
}

const itemProduct = document.querySelectorAll(".product-image-wrapper")
itemProduct.forEach(function (item) {

    const idProduct = item.querySelector(".idProduct")
    if (!idProduct) {
        return
    }
    const id = idProduct.textContent.trim()
    const btnAdToCart = item.querySelectorAll(".add-to-cart")

    const img = item.querySelector("img").getAttribute("src")
    const price = item.querySelector("h2 .price").textContent
    const name = item.querySelector(".nameProduct").textContent
    // const qty = 1

    btnAdToCart.forEach(function (btnAdd) {
        let qtyToTal = 1
        btnAdd.addEventListener("click", function () {
            Object.keys(objCha).map(function (key, index) {
                if (key === id) {
                    qtyToTal = parseInt(objCha[key]['qty']) + 1
                }
            })

            let objCon = {
                img: img,
                price: price,
                name: name,
                qty: qtyToTal
            }

            // console.log(objCon)

            objCha[id] = objCon
            console.log(objCha)

            let setObjCha = JSON.stringify(objCha)
            localStorage.setItem("Carts", setObjCha)

            // console.log(id)

            // cập nhật tổng sản phẩm trong giỏ hàng
            CountQty()
        })
    })

})

document.addEventListener("DOMContentLoaded", function () {
    CountQty()
})

function CountQty() {
    const cart_count = document.querySelector(".cart .cart-count")

    let countQty = 0
    Object.keys(objCha).map(function (key, index) {
        countQty = countQty + parseInt(objCha[key]['qty'])
    })

    cart_count.textContent = `${countQty}`
}