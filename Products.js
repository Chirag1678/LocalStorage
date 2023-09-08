const addbtn = document.getElementById("add");
const form = document.getElementById("postForm");
const imageUrl = document.getElementById("imageUrl");
const description = document.getElementById("description");
const rate = document.getElementById("rate");
console.log(rate);
const layout = document.getElementById("right");
const deletebtn = document.getElementsByClassName("delete");


loadpage();

function loadpage(){
    document.addEventListener("DOMContentLoaded",loadproduct);
    
    addbtn.addEventListener("click",formappear);
    
    form.addEventListener("submit",(e)=>{
        addproduct(e);
    });

    layout.addEventListener("click",(e)=>{
        deleteproduct(e);
    });
}

function loadproduct(){
    let products;
    if (localStorage.getItem("products")===null) {
        products = [{
            Url: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
            desc: "Lorem ipsum dolor sit amet.",
            price: "1200"
        }];
    }
    else{
        products = JSON.parse(localStorage.getItem("products"));
    }
    products.forEach((product)=>{
        addlisting(product.Url,product.desc,product.price)
    })
}

function addproduct(e){
    e.preventDefault();
    console.log("HELLO");
    addlisting(imageUrl.value,description.value,rate.value);
    storagetogo(imageUrl.value,description.value,rate.value);
    imageUrl.value = '';
    description.value = '';
    rate.value = '';
    formdisappear;
}

function addlisting(Url,desc,price){
    const productadd = document.createElement("div");
    productadd.className = "gridItem";
    productadd.innerHTML = `
    <div class="product">
                        <div>
                            <img src=${Url} alt="">
                        </div>
                        <div class="description">
                            <p>${desc}</p>
                        </div>
                        <div class="rate">
                            <p>$<span>${price}</span>/-</p>
                        </div>
                        <div class="delete">
                            <i class="fa-solid fa-trash" style="color: #b42222;"></i>
                        </div>
                    </div>
    `;
    layout.prepend(productadd);
}

function storagetogo(Url,desc,price){
    let products;
    if (localStorage.getItem('products') == null) {
        products = [];
    }
    else {
        products = JSON.parse(localStorage.getItem('products'));
    }

    products.push({Url,desc,price});

    localStorage.setItem('products',JSON.stringify(products));
    console.log("done");
}

function formappear(){
    let displayform = document.getElementById("overlayForm");
    let background = document.getElementsByClassName("overlayBackground");
    displayform.style.display = "flex";
    background[0].addEventListener("click",()=>{
        displayform.style.display = "none";
    });
}

function formdisappear(){
    let displayform = document.getElementById("overlayForm");
    displayform.style.display = "none";
}

function deleteproduct(e){
    if (e.target.parentElement.parentElement.parentElement.classList.contains("gridItem")) {
        if (confirm("Are you sure you want")) {
            e.target.parentElement.parentElement.parentElement.remove();
            let productUrl = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.src;
            let descrip = e.target.parentElement.previousElementSibling.previousElementSibling.firstElementChild.innerText;
            let rate = e.target.parentElement.previousElementSibling.firstElementChild.firstElementChild.innerText;
            removefromstorage(productUrl,descrip,rate)
        }
    }
}

function removefromstorage(productUrl,descrip,rate) {
    let products = JSON.parse(localStorage.getItem('products'));
    let index = -1;
    console.log("RUN");
    products.forEach((product, i) => {
        if (product.Url == productUrl && product.desc == descrip && product.price == rate) {
            index = i;
        }
    });

    if (index > -1) {
        products.splice(index, 1);
    }

    localStorage.setItem('products', JSON.stringify(products));
}