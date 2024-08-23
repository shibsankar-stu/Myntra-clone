let convenience_fee= 99;
let bagItemObject;
onLoadBag();
function onLoadBag() {
    loadBagItems();
    displayBagItems();
    displaybagSummary();
}

function displaybagSummary() {
  let bagSummeryElement = document.querySelector('.bag-summary');
  let totalItems = bagItemObject.length;
  let totalMrp =0;
  let totalDiscount = 0;
  let totalAmount = 0;

  bagItemObject.forEach(bagItems => {
    totalMrp += bagItems.price.original_price;
    totalDiscount += bagItems.price.original_price -bagItems.price.current_price;
  });
  totalAmount += totalMrp - totalDiscount + convenience_fee;

  bagSummeryElement.innerHTML = `<div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${ totalItems} Items) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">Rs${totalMrp}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">-Rs${totalDiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">Rs 99</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">Rs ${ totalAmount}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>`;
}

function  loadBagItems() {
    bagItemObject = bagItems.map(itemId => {
        for (let i = 0; i < items.length; i++) {
            if (itemId == items[i].id) {
                return items[i];
            }  
        }
    });
    console.log(bagItemObject);
}
function displayBagItems(){
    let containerElement = document.querySelector('.bag-items-container');
    let innerHTML = '';
    bagItemObject.forEach(bagItems => {
        innerHTML += generateItemHtml(bagItems);
    });
     containerElement.innerHTML = innerHTML;
}

function removeBagItems(itemId) {
    bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
    localStorage.setItem('bagitems' , JSON.stringify(bagItems));
    onLoadBag();
    displayBagItem();
   
}

function generateItemHtml(item) {
    return ` <div class="bag-item-container">
      <div class="item-left-part">
        <img class="bag-item-img" src="${item.item_image}">
      </div>
      <div class="item-right-part">
        <div class="company">${item.company_name}</div>
        <div class="item-name">${item.item_name}</div>
        <div class="price-container">
          <span class="current-price">Rs ${item.price.current_price}</span>
          <span class="original-price">Rs ${item.price.original_price}</span>
          <span class="discount-percentage">(${item.price.discount_percentage}% OFF)</span>
        </div>
        <div class="return-period">
          <span class="return-period-days">${item.return_period} days</span> return available
        </div>
        <div class="delivery-details">
          Delivery by
          <span class="delivery-details-days">${item.delivery_date}</span>
        </div>
      </div>

      <div class="remove-from-cart"  onclick="removeBagItems(${item.id});">X</div>
    </div>`
}