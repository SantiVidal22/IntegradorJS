const products = document.querySelector(".products-container");

const productsCart = document.querySelector(".cart-container");

const total = document.querySelector(".total");

const categories = document.querySelector(".categories");

const categoriesList = document.querySelectorAll(".category");

const btnLoad = document.querySelector(".btn-load");

const buyBtn = document.querySelector(".btn-buy");

const cartBubble = document.querySelector(".cart-bubble");

const cartBtn = document.querySelector(".cart-label");

const barsBtn = document.querySelector(".menu-label");

const cartMenu = document.querySelector(".cart");

const barsMenu = document.querySelector(".navbar-list");

const overlay = document.querySelector(".overlay");

const sucessModal = document.querySelector(".add-modal");

const deleteBtn = document.querySelector(".btn-delete");

let cart = JSON.parse(localStorage.getItem("cart")) || [];



const renderProduct = (product) => {
  const { id, name, bid, user, userImg, cardImg } = product;
  return `
    <div class="product">
        <img src="${cardImg}" alt="${name}" />
        <div class="product-info">
            <div class="product-top">
                <h3>${name}</h3>
                <p>Current Bid</p>
            </div>
            <div class="product-mid">
                <div class="product-user">
                    <img src="${userImg}" alt="" />
                    <p>@${user}</p>
                </div>
                <span>${bid} ARS</span>
            </div>
            <div class="product-bot">
                <div class="product-offer">
                    <div class="offer-time">
                        <img src="" alt="" />
                        <p>05:12:07</p>
                    </div>
                    <button
                    class="btn-add"
                    data-id="${id}"
                    data-name="${name}"
                    data-bid="${bid}"
                    data-img="${cardImg}"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    </div>
  `;
};

const renderDividedProducts = (index = 0) => {
  products.innerHTML += productsController.dividedProducts[index]
    .map(renderProduct)
    .join("");
};

const renderFilteredProducts = (category) => {
  const productsList = productsData.filter((product) => {
    return product.category === category;
  });
  products.innerHTML = productsList.map(renderProduct).join("");
};

const renderProducts = (index = 0, category = undefined) => {
  if (!category) {
    renderDividedProducts(index);
    return;
  }
  renderFilteredProducts(category);
};

const changeShowMoreBtnState = (category) => {
  if (!category) {
    btnLoad.classList.remove("hidden");
    return;
  }
  btnLoad.classList.add("hidden");
};

const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categories.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove("active");
      return;
    }
    categoryBtn.classList.add("active");
  });
};

const changeFilterState = (e) => {
  const selectedCategory = e.target.dataset.category;
  changeShowMoreBtnState(selectedCategory);
  changeBtnActiveState(selectedCategory);
};

const applyFilter = (e) => {
  if (!e.target.classList.contains("category")) {
    return;
  } else {
    changeFilterState(e);
  }
  if (!e.target.dataset.category) {
    products.innerHTML = "";
    renderProducts();
  } else {
    renderProducts(0, e.target.dataset.category);
    productsController.nextProductsIndex = 1;
  }
};

const isLastIndexOf = () => {
    return (
        productsController.nextProductsIndex === productsController.
        productsLimit
    );
};

const showMoreProducts = () => {
    renderProducts(productsController.nextProductsIndex);
    productsController.nextProductsIndex++;
    if (isLastIndexOf()) {
        btnLoad.classList.add("hidden");
    }
};

const toggleMenu = () => {
    barsMenu.classList.toggle("open-menu")
    if (cartMenu.classList.contains
    ("open-cart")) {
        cartMenu.classList.remove
        ("open-cart");
        return;
    }
    overlay.classList.toggle
    ("show-overlay");
}

const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    if (barsMenu.classList.contains
        ("open-menu")) {
            barsMenu.classList.remove
            ("open-menu");
            return;
    }
    overlay.classList.toggle
    ("show-overlay");
};

const renderCart = () => {
  if (!cart.length) {
    productsCart
  }
}

const closeOnClick = (e) => {
    if (e.target.classList.contains
        ("navbar-link")) {
            return
        }
    barsMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
}

const closeOnScroll = () => {
    if (!barsMenu.classList.contains("open-menu") && !cartMenu.classList.
    contains("open-cart")) {
        return
    }
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove
    ("show.overlay");
};

const closeOnOverlayClick = () =>{
    barsMenu.classList.remove("open-menu");
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove
    ("show.overlay");
};

const init = () => {
  renderProducts();
  categories.addEventListener("click", applyFilter);
  btnLoad.addEventListener("click", showMoreProducts);
  barsBtn.addEventListener("click", toggleMenu);
  cartBtn.addEventListener("click", toggleCart);
  barsMenu.addEventListener("click", closeOnClick);
  window.addEventListener("scroll", closeOnScroll);
  overlay.addEventListener("click", closeOnOverlayClick);
};

init();
