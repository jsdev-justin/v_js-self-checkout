var dragItems = document.querySelectorAll(".drag-item")
var dragQuants = document.querySelectorAll(".drag-item-quantity")
var removeSpans = document.querySelectorAll('.remove')
var scanner = document.querySelector(".scanner")
var checkoutList = document.querySelector(".checkout-list")
var totalDOM = document.querySelector("#total");
var beepone = new Audio("../assets/beep.mp3")
var beeptwo = new Audio("../assets/beep2.mp3")
var horn = new Audio('../assets/horn.mp3');

var beeps = [beepone,beeptwo];

var currentItem=""
var checkedOutItems=[];
var total = 0;

var dateDOM = document.querySelector("#date")
var timeDOM = document.querySelector("#time");
var checkoutGrid = document.querySelector(".grid")

    dateDOM.innerHTML = new Date().toLocaleDateString()
    timeDOM.innerHTML = new Date().toLocaleTimeString()
    totalDOM.innerHTML = total

console.log(foods)



dragItems.forEach(d=>{
    d.ondragstart=dragStart;
    d.ondragend=dragEnd;
})


scanner.ondragover=(e)=>dragOver(e);
scanner.ondragenter=(e)=>dragEnter(e);
scanner.ondragleave=(e)=>dragLeave(e);


function dragStart(e){
    currentItem = {
        idx:e.target.getAttribute('data-idx'),
        name:e.target.getAttribute('data-name'),
        price:e.target.getAttribute('data-price'),
        quantity:e.target.getAttribute('data-quantity'),
    }
    checkedOutItems.push(currentItem);
    // console.log('dragStart')
}

function dragEnd(){
    // console.log('dragEnd')
}

function dragOver(e){
    e.target.style.opacity = ".8"
    // console.log('dragOver')
}

function playBeep(){
    beeps[Math.random() * 2 | 0].play()
}



function dragEnter(e){
        playBeep()
    e.target.style.opacity = ".8"
    var checkoutidx = document.querySelectorAll(".checkout-item");
        checkoutidx = checkoutidx.length ? checkoutidx.length : 0
        console.log('checkoutIdxNodeList',checkoutidx)

    if(!checkItems(currentItem)){
        console.log(checkItems(currentItem))
        var liItem = document.createElement("li");
            liItem.className='checkout-item flex space-between ml-2'
            liItem.innerHTML = `<span>${currentItem.name}   q:<span class='quantity'>1</span></span><p> $${currentItem.price}</p><span onclick="removeItem(${currentItem.idx},${checkoutidx})" class='remove mx-2' data-name=${currentItem.name}>x</span>`
            checkoutList.appendChild(liItem)
    }

    let newQuant = parseInt(currentItem.quantity)
        newQuant--
    dragQuants[currentItem.idx].innerText = newQuant
    dragItems[currentItem.idx].setAttribute('data-quantity',newQuant)

    adjustTotal(currentItem.price)
    // console.log('dragEnter')
}




function dragLeave(e){
    e.target.style.opacity = "1"
    // console.log('dragLeave')
}


function checkItems(currentItem){
    var isFound = false;
    var ref={quantity:1,idx:0}
    let checkoutItemEls = document.querySelectorAll(".checkout-item");
    let quantitySpans = document.querySelectorAll(".quantity");
    
    if(!checkoutItemEls.length)return false;
    
    
    checkoutItemEls = Array.from(checkoutItemEls).map(el=>{
            let quantity = el.textContent.split("$")[0];
                quantity = quantity.split(":")[1].trim("")
        return{
               name:el.textContent.split(" ")[0],
               quantity,
    }
})


    checkoutItemEls.forEach((item,idx)=>{
        console.log("Itemname: ",item.name, "currentItem: ",currentItem.name)
        if(item.name === currentItem.name){
            isFound = true;
            ref.quantity = item.quantity,
            ref.idx = idx;
        }

    })
        if(isFound){
                let {idx, quantity} = ref;
                let newQuant = parseInt(quantity);
                    newQuant++
                    quantitySpans[idx].innerHTML = newQuant
                    // console.log("fx exit/true condition")
                    return true;
        }
     
    return false;

}



function removeItem(drag,checkout){
    horn.play()
    console.log(drag,checkout)
    let itemText = Array.from(document.getElementsByClassName("checkout-item"))[parseInt(checkout)].textContent;
    var price = itemText.split("$")[1];
        price = price.split("x")[0]
        price *= -1;
        adjustTotal(price)
    console.log(itemText);
    console.log('remove item')

    let quantity = itemText.split(":")[1];
        console.log("Quantity: " + quantity)
        quantity = parseInt(quantity.trim("")[0])
        console.log(quantity)

        // quantity = parseInt(quantity.split(":")[1]);
        console.log("Quantity: " + quantity)
        
        if(quantity > 1){
            quantity--
            document.querySelectorAll(".quantity")[checkout].innerText = quantity

        }
        else{
            checkoutList.removeChild(document.querySelectorAll(".checkout-item")[checkout])
        }



        restoreDragQuant(dragItems[drag],drag)


}


function restoreDragQuant(quantEl,drag){
    let dataQuant = quantEl.getAttribute('data-quantity');
        dataQuant = parseInt(dataQuant);
        dataQuant++;
        quantEl.setAttribute('data-quantity',dataQuant);
        document.querySelectorAll(".drag-item-quantity")[drag].innerText = dataQuant
}


function adjustTotal(price){
    console.log("Price",price)

        total += parseFloat(price);

        if(total < 1){
            total = 0;
        }

    totalDOM.innerText = total.toFixed(2);
}







