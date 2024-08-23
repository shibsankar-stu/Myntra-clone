let bagItems;
onload();
function onload() {
    let bagItemsstr = localStorage.getItem('bagitems');
    bagItems = bagItemsstr ? JSON.parse(bagItemsstr) : [];
    displayItemsOnHome();
    displayBagItem();
}

function addToBag(itemid){
    bagItems.push(itemid);
    localStorage.setItem('bagitems' , JSON.stringify(bagItems));
    displayBagItem();
}

function displayBagItem() {
    let bagItemCountElement = document.querySelector('.bag-item-count');
    if (bagItems.length > 0) {
        bagItemCountElement.style.visibility = 'visible';
        bagItemCountElement.innerText = bagItems.length;
        
    } else {
        bagItemCountElement.style.visibility = 'hidden';
    }
}

function displayItemsOnHome() {
    let itemsContainerElement = document.querySelector('.items-container');
    if (!itemsContainerElement) {
        return;
    }
        let innerHTML='';
        items.forEach(item => {
            innerHTML += `
            <div class="item-container">
                <img class="item-image" src="${item.item_image}" alt="image1">
                <div class="rating">
                    ${item.rating.stars}⭐ | ${item.rating.noOfviews}
                </div>
                <div class="company-name">${item.company_name}</div>
                <div class="item-name">${item.item_name}</div>
                <div class="price">
                    <span class="current-price">${item.price.current_price}</span>
                    <span class="original-price">${item.price.original_price}</span>
                    <span class="discount">${item.price.discount_percentage}% Off</span>
                </div>
                <button class="btn-add-bag" onclick = "addToBag(${item.id})">Add to Bag</button>
            </div>`
        });
        itemsContainerElement.innerHTML = innerHTML;
}

