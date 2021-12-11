const removeItemBtn = document.getElementsByClassName('fa fa-trash')
const checkOutDOM = document.getElementsByClassName('align-middle')[0]
const sanpham = JSON.parse(localStorage.getItem('cart')) //get info of items from localStorage
const totalPayment = JSON.parse(localStorage.getItem('total'))// get total payment from LocalStorage
const itemContainer = document.getElementsByClassName('align-middle')[0]
const updateCheckOutTotal = document.getElementsByClassName('check-out')[0]
itemQty = document.getElementsByClassName('qty')[0]
console.log(totalPayment)

let product = sanpham.map(item => {
    return `
    <tr class="cart-row">
        <td>
            <div class="img">
                <a href="#"><img src=${item.image} alt="Image"></a>
                <p>${item.title}</p>
            </div>
        </td>
        <td class="item-price">$${item.price}</td>
        <td>
            <div class="qty">
                <div class="item-quantity" >${item.amount}</div>
            </div>
        </td>
    </tr>
    `   
    })
    checkOutDOM.innerHTML= product.join("")
console.log(checkOutDOM.innerHTML)
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else {
    ready()
}
    function ready(){
    document.getElementById('item-total').innerText = "$" + totalPayment
}

function removeCartItem(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}


 

// function setCartValue(sanpham){
//     let tempTotal = 0
//     sanpham.forEach(item =>{tempTotal = item.price * item.amount})    
//     console.log(tempTotal)
    
//     document.getElementsByClassName('temp-total').innerText ='$'+ tempTotal
// }

function updateCartTotal(){
    
    var cartRows = itemContainer.getElementsByClassName('cart-row')
    var total = 0
    for(var i=0; i < cartRows.length; i++){
        var  cartRow = cartRows[i]
        var priceEle = cartRow.getElementsByClassName('item-price')[0]
        var quantityEle = cartRow.getElementsByClassName('item-quantity')[0]
        var price = parseFloat(priceEle.innerText.replace('$', ''))
        var quantity = quantityEle.value
        total += (price * quantity)
        console.log(total)
    }
    document.getElementsByClassName('item-total')[0].innerText ='$'+ total
}
console.log(sanpham)


paypal.Buttons({
    createOrder: function(data, actions) {
        // This function sets up the details of the transaction, including the amount and line item details.
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: totalPayment
            }
          }]
        });
      },
      onApprove: function(data, actions) {
        // This function captures the funds from the transaction.
        return actions.order.capture().then(function(details) {
          console.log(details)
            // This function shows a transaction success message to your buyer.
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      }
}).render('#cart-btn')