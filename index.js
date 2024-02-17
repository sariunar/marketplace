document.addEventListener("DOMContentLoaded", function (event) {
    let allContent = "";
    fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((allProducts) => {
            for (let i = 0; i < allProducts.limit; i++) {
                allContent += `
                    <div class = "products addCart">
                        <img class = "products__img" src = ${allProducts.products[i].images[0]} alt="products__img">
                        <div class = "products__info">
                            <p class="products__rating"><img src = "./images/star.png" alt="cart">${allProducts.products[i].rating}</p> 
                            <p class="products__title">${allProducts.products[i].brand} ${allProducts.products[i].title}</p>  
                            <p class="products__description">${allProducts.products[i].description}</p> 
                            <div class="products__cart" >
                                <img src = "./images/cart.png" alt="cart">
                                <p>$</p>
                                <p class="products__price">${allProducts.products[i].price} </p>
                            </div>
                        </div>
                    </div>
                    `;
            }
            document.querySelector("#results").innerHTML = allContent;
        })
        .catch((error) => console.log(error));

    container__search__btn.onclick = function (e) {
        e.preventDefault();

        let searchKeyword = document.getElementById("search").value;
        let productsContent = "";
        if (searchKeyword.length <= 3) {
            fetch("https://dummyjson.com/products")
                .then((response) => response.json())
                .then((product) => {
                    document.getElementById("search").value = "";
                    if (product.total > 0) {
                        for (let i = 0; i < product.limit; i++) {
                            productsContent += `
                            <div class = "products addCart">
                                <img class = "products__img" src = ${product.products[i].images[0]} alt="products__img">
                                <div class = "products__info">
                                    <p class="products__rating"><img src = "./images/star.png" alt="cart">${product.products[i].rating}</p> 
                                    <p class="products__title">${product.products[i].brand} ${product.products[i].title}</p>  
                                    <p class="products__description">${product.products[i].description}</p> 
                                    <div class="products__cart">
                                        <img src = "./images/cart.png" alt="cart">
                                        <p>$</p>
                                        <p class="products__price" >${product.products[i].price} </p>
                                    </div>
                                </div>
                            </div>
                            `;
                        }
                        document.querySelector("#results").innerHTML = productsContent;
                    } else {
                        document.querySelector("#results").innerHTML = "Ничего не найдено, попробуйте изменить запрос";
                    }
                })
                .catch((error) => console.log(error));
        } else {
            fetch(`https://dummyjson.com/products/search?q=${searchKeyword}`)
                .then((response) => response.json())
                .then((product) => {
                    document.getElementById("search").value = "";
                    if (product.total > 0) {
                        for (let i = 0; i < product.limit; i++) {
                            productsContent += `
                            <div class = "products addCart">
                                <img class = "products__img" src = ${product.products[i].images[0]} alt="products__img">
                                <div class = "products__info">
                                    <p class="products__rating"><img src = "./images/star.png" alt="cart">${product.products[i].rating}</p> 
                                    <p class="products__title">${product.products[i].brand} ${product.products[i].title}</p>  
                                    <p class="products__description">${product.products[i].description}</p> 
                                    <div class="products__cart">
                                        <img src = "./images/cart.png" alt="cart">
                                        <p>$</p>
                                        <p class="products__price">${product.products[i].price} </p>
                                    </div>
                                </div>
                            </div>
                            `;
                        }
                        document.querySelector("#results").innerHTML = productsContent;
                    } else {
                        document.querySelector("#results").innerHTML = "Ничего не найдено, попробуйте изменить запрос";
                    }
                })
                .catch((error) => console.log(error));
        }
    };

    let categoriesContent = "";
    fetch("https://dummyjson.com/products/categories")
        .then((response) => response.json())
        .then((categories) => {
            for (let i = 0; i < categories.length; i++) {
                categoriesContent += `
                    <p class="categories__name">${categories[i]}</p>  
                `;
            }
            document.querySelector(".categories").innerHTML = categoriesContent;
        })
        .catch((error) => console.log(error));

    let categories = document.querySelector(".categories");
    categories.addEventListener("click", (event) => {
        const category = event.target.textContent;
        //console.log(category);
        let categoryContent = "";
        fetch(`https://dummyjson.com/products/category/${category}`)
            .then((response) => response.json())
            .then((response) => {
                for (let i = 0; i < response.limit; i++) {
                    categoryContent += `
                            <div class = "products addCart">                                
                                <img class = "products__img" src = ${response.products[i].images[0]} alt="products__img">
                                <div class = "products__info">
                                    <p class="products__rating"><img src = "./images/star.png" alt="cart">${response.products[i].rating}</p> 
                                    <p class="products__title">${response.products[i].brand} ${response.products[i].title}</p>  
                                    <p class="products__description">${response.products[i].description}</p> 
                                    <div class="products__cart">
                                        <img src = "./images/cart.png" alt="cart">
                                        <p>$</p>
                                        <p class="products__price">${response.products[i].price} </p>
                                    </div>
                                </div>
                            </div>
                            `;
                }
                document.querySelector("#results").innerHTML = categoryContent;
            })
            .catch((error) => console.log(error));
    });

    let listProductHTML = document.querySelector("#results");
    let listCart = document.querySelector(".listCart");
    let iconCart = document.querySelector(".icon-cart");
    let body = document.querySelector("body");
    let closeCart = document.querySelector(".close");
    let products = [];
    let cart = [];

    iconCart.addEventListener("click", () => {
        body.classList.toggle("showCart");
    });
    closeCart.addEventListener("click", () => {
        body.classList.toggle("showCart");
    });

    listProductHTML.addEventListener("click", (event) => {
        let product = event.target.parentNode.parentNode.parentNode;
        if (product.classList.contains("addCart")) {
            addToCart(product);
        }
    });
    const addToCart = (product) => {
        const image = product.querySelector(".products__img").src;
        const title = product.querySelector(".products__title").textContent;
        const price = Number(product.querySelector(".products__price").textContent);
        const cartItem = { image, title, price };
        cart.push(cartItem);
        updateCartDisplay();
    };

    const updateCartDisplay = () => {
        listCart.innerHTML = "";
        let total = 0;
        if (cart.length === 0) {
            listCart.innerHTML = "<p>Cart is empty :(</p>";
        } else {
            cart.forEach((item) => {
                const cartItemElement = document.createElement("div");
                cartItemElement.classList.add("cartItem");
                cartItemElement.innerHTML = `
                <div class="cartItem">
                    <img class="cartItem__img" src="${item.image}" alt="cartItem__img"> 
                    <p class="cartItem__title">${item.title}</p>
                    <div>
                        <p>$</p>
                        <p class="cartItem__price">${item.price}</p> 
                    </div>                    
                </div>
                `;
                listCart.appendChild(cartItemElement);
                total += item.price;
            });
        }
        console.log(total);
        document.querySelector(".total__price").innerHTML = "$" + total;
    };
});
