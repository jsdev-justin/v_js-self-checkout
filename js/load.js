let hasClicked = false;

onload=()=>{
    var div = document.createElement("div");
        div.className = 'overlay flex center column'
        div.innerHTML = "<div class='overlay-bubble text-center'><h1>Cindys <span class='underline'>Checkout</span> </h1><h2>Click to $tart</h2></div>"
        document.querySelector(".app").appendChild(div);
}


onclick=()=>{
    if(hasClicked) return;
        document.querySelector(".app").removeChild(document.querySelector(".overlay"))
        hasClicked = true;
}   