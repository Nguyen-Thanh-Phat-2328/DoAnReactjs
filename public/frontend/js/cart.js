let objChaLocal = localStorage.getItem("Carts")
let objCha = {}
if (objChaLocal) {
	objCha = JSON.parse(objChaLocal)
}
// console.log(objCha)

const tbody = document.getElementById("table-body")
tbody.innerHTML = Object.keys(objCha).map(function (key, index) {
	return `
        <tr>
			<td class="cart_product">
				<a href=""><img src="${objCha[key]['img']}" alt=""></a>
			</td>
			<td class="cart_description">
				<h4><a href="">${objCha[key]['name']}</a></h4>
				<p>Web ID: ${key}</p>
			</td>
			<td class="cart_price">
				<p>$${objCha[key]['price']}</p>
			</td>
			<td class="cart_quantity">
				<div class="cart_quantity_button">
					<a class="cart_quantity_up" href="" onclick="UpQty(this, ${key})"> + </a>
					<input class="cart_quantity_input" type="text" name="quantity" value="${objCha[key]['qty']}" autocomplete="off" size="2">
					<a class="cart_quantity_down" href="" onclick="UpQty(this, ${key})"> - </a>
				</div>
			</td>
			<td class="cart_total">
				<p class="cart_total_price">$${parseFloat(objCha[key]['price']) * parseInt(objCha[key]['qty'])}</p>
			</td>
			<td class="cart_delete">
				<a class="cart_quantity_delete" href="" onclick="UpQty(this, ${key})"><i class="fa fa-times"></i></a>
			</td>
		</tr>
    `
})

//tăng giảm số lượng và tính tổng tiền

function UpQty(btn, idProduct) {
	btn.removeAttribute("href")

	const checkUp = btn.classList.contains("cart_quantity_up")
	const checkDown = btn.classList.contains("cart_quantity_down")
	const checkDelete = btn.classList.contains("cart_quantity_delete")
	const itemProduct = btn.closest("tr")

	if (checkDelete) {
		//Delete, lưu lại local
		delete objCha[idProduct]
		let setObjCha = JSON.stringify(objCha)
		localStorage.setItem("Carts", setObjCha)

		//Xóa html
		$(itemProduct).remove()
	} else {
		const inputQty = itemProduct.querySelector(".cart_quantity_input")
		const viewToTal = itemProduct.querySelector(".cart_total_price")

		let qty = parseInt(inputQty.value)
		if (checkUp) {
			qty = qty + 1
		} else if (checkDown) {
			if (qty > 1) {
				qty = qty - 1
			} else {
				alert("Không được xóa sản phẩm cuối cùng")
			}
		}
		inputQty.value = qty

		objCha[idProduct]['qty'] = qty

		let setObjCha = JSON.stringify(objCha)
		localStorage.setItem("Carts", setObjCha)

		// Tổng tiền
		let totalPrice = qty * parseFloat(objCha[idProduct]['price'])
		viewToTal.textContent = `$${totalPrice}`
	}
	TotalArea()
	CountQty()
}

function TotalArea() {
	const total_area = document.querySelector(".total_area")
	const cart_total = total_area.querySelector(".cart_total")
	const pay_total = total_area.querySelector(".pay_total")
	let cartTotal = 0
	let ecoTax = 2
	Object.keys(objCha).map(function (key, index) {
		cartTotal = cartTotal + (parseInt(objCha[key]['qty']) * parseFloat(objCha[key]['price']))
	})
	cart_total.textContent = `$${cartTotal}`
	pay_total.textContent = `$${cartTotal + ecoTax}`
}

document.addEventListener("DOMContentLoaded", function () {
	TotalArea()
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