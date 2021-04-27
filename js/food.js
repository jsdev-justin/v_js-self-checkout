var foods=[
    {
        name:"pizza",
        price:"6.99",
        quantity:15,
        on_sale:false,
    },
    {
        name:"paninis",
        price:"3.99",
        quantity:30,
        on_sale:false,
    },
    {
        name:"strawberries",
        price:"2.49",
        quantity:15,
        on_sale:false,
    },
    {
        name:"shrimp",
        price:"12.25",
        quantity:15,
        on_sale:false,
    },
    {
        name:"booba",
        price:"8.99",
        quantity:25,
        on_sale:false,
    },
    {
        name:"water",
        price:"99",
        quantity:20,
        on_sale:false,
    },
]



foods.forEach((f,idx)=>{
    var foodDiv = document.createElement("div");
        foodDiv.className='drag-item flex center column'
        foodDiv.draggable = true;
        foodDiv.setAttribute('data-name',f.name)
        foodDiv.setAttribute('data-quantity',f.quantity)
        foodDiv.setAttribute('data-price',f.price)
        foodDiv.setAttribute('data-idx',idx)
        if(mobile){
            foodDiv.classList.add('mobile')
        }
        foodDiv.innerHTML = `<h4 style="pointer-events:none">${f.name}</h4><h5 style="pointer-events:none">Price:$${f.price}</h5><h5 style="pointer-events:none">Quant:<span style="pointer-events:none" class='drag-item-quantity'>${f.quantity}</span></h5>`


        document.querySelector(".grid").appendChild(foodDiv)

})

