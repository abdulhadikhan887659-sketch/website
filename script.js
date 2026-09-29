/* ================= PRODUCTS ================= */

const products = [
    {
        id: 1,
        name: "Alberto Heritage Classic",
        category: "Vintage",
        price: 28500,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85",
        description: "A refined vintage-inspired timepiece featuring a classic dial and elegant leather strap."
    },
    {
        id: 2,
        name: "Alberto Royal Gold",
        category: "Luxury",
        price: 85000,
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=85",
        description: "A luxurious statement watch designed with premium finishes for sophisticated occasions."
    },
    {
        id: 3,
        name: "Alberto Urban Smart",
        category: "Smart",
        price: 42000,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
        description: "Modern smart functionality combined with the timeless character of ALBERTO WATCH."
    },
    {
        id: 4,
        name: "Alberto Executive",
        category: "Luxury",
        price: 67500,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",
        description: "An elegant executive timepiece created for formal occasions and everyday luxury."
    },
    {
        id: 5,
        name: "Alberto Heritage 1985",
        category: "Vintage",
        price: 35000,
        image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=900&q=85",
        description: "Inspired by traditional watchmaking and the heritage that began in 1985."
    },
    {
        id: 6,
        name: "Alberto Classic Clock",
        category: "Classic",
        price: 55000,
        image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=900&q=85",
        description: "A distinguished classic clock designed to bring timeless elegance to your space."
    },
    {
        id: 7,
        name: "Alberto Prestige",
        category: "Luxury",
        price: 125000,
        image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=900&q=85",
        description: "Our premium prestige collection piece with an elegant luxury finish."
    },
    {
        id: 8,
        name: "Alberto Smart Pro",
        category: "Smart",
        price: 48500,
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=85",
        description: "A contemporary smart watch built for a connected modern lifestyle."
    },
    {
        id: 9,
        name: "Alberto Grand Classic",
        category: "Classic",
        price: 62000,
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",
        description: "A timeless classic designed to complement distinguished interiors."
    },
    {
        id: 10,
        name: "Alberto Vintage Leather",
        category: "Vintage",
        price: 31500,
        image: "https://images.unsplash.com/photo-1495857000853-fe46c8aefc30?auto=format&fit=crop&w=900&q=85",
        description: "A sophisticated vintage watch with a classic leather-inspired aesthetic."
    }
];


/* ================= GLOBAL VARIABLES ================= */

let cart = [];
let selectedProduct = null;


/* ================= FORMAT PRICE ================= */

function formatPrice(price) {
    return "PKR " + price.toLocaleString("en-PK");
}


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(list = products) {

    const productGrid = document.getElementById("productGrid");

    if (!productGrid) return;

    productGrid.innerHTML = "";

    if (list.length === 0) {
        productGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try another category.</p>
            </div>
        `;
        return;
    }

    list.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                <span class="product-category">
                    ${product.category}
                </span>

                <button
                    class="quick-view"
                    onclick="openProduct(${product.id})"
                >
                    <i class="bi bi-eye"></i>
                    Quick View
                </button>
            </div>

            <div class="product-info">

                <span class="product-type">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <div class="product-bottom">

                    <strong class="product-price">
                        ${formatPrice(product.price)}
                    </strong>

                    <button
                        class="add-cart"
                        onclick="addToCart(${product.id})"
                        aria-label="Add ${product.name} to cart"
                    >
                        <i class="bi bi-bag-plus"></i>
                    </button>

                </div>

            </div>
        `;

        productGrid.appendChild(card);
    });
}


/* ================= FILTER PRODUCTS ================= */

function filterCategory(category, button = null) {

    let filteredProducts;

    if (category === "All") {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(
            product => product.category === category
        );
    }

    displayProducts(filteredProducts);

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    } else {

        document.querySelectorAll(".filter-btn").forEach(btn => {

            if (btn.textContent.trim().toLowerCase() === category.toLowerCase()) {
                btn.classList.add("active");
            }

        });

    }

    const productSection = document.getElementById("products");

    if (productSection && window.location.hash !== "#products") {
        productSection.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* ================= PRODUCT MODAL ================= */

function openProduct(productId) {

    const product = products.find(p => p.id === productId);

    if (!product) return;

    selectedProduct = product;

    document.getElementById("modalImage").src = product.image;
    document.getElementById("modalImage").alt = product.name;

    document.getElementById("modalCategory").textContent =
        product.category;

    document.getElementById("modalName").textContent =
        product.name;

    document.getElementById("modalPrice").textContent =
        formatPrice(product.price);

    document.getElementById("modalDescription").textContent =
        product.description;

    document.getElementById("productModal").classList.add("show");

    document.body.classList.add("modal-open");
}


function closeModal() {

    document.getElementById("productModal").classList.remove("show");

    document.body.classList.remove("modal-open");

    selectedProduct = null;
}


/* ================= CART ================= */

function addToCart(productId) {

    const product = products.find(p => p.id === productId);

    if (!product) return;

    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    showNotification(`${product.name} added to your bag`);
}


function addToCartFromModal() {

    if (!selectedProduct) return;

    addToCart(selectedProduct.id);

    closeModal();
}


function updateCart() {

    const cartCount = document.getElementById("cartCount");
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    const totalQuantity = cart.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (cartCount) {
        cartCount.textContent = totalQuantity;
    }

    if (cartTotal) {
        cartTotal.textContent = formatPrice(totalPrice);
    }

    if (!cartItems) return;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="bi bi-bag"></i>
                <h3>Your bag is empty</h3>
                <p>Add a timepiece to begin your collection.</p>
            </div>
        `;

        return;
    }

    cartItems.innerHTML = "";

    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <span>${item.category}</span>

                <h4>${item.name}</h4>

                <strong>
                    ${formatPrice(item.price)}
                </strong>

                <div class="quantity-controls">

                    <button onclick="changeQuantity(${item.id}, -1)">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="changeQuantity(${item.id}, 1)">
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-cart"
                onclick="removeFromCart(${item.id})"
                aria-label="Remove item"
            >
                <i class="bi bi-trash"></i>
            </button>
        `;

        cartItems.appendChild(cartItem);
    });
}


function changeQuantity(productId, change) {

    const item = cart.find(product => product.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== productId);
    }

    updateCart();
}


function removeFromCart(productId) {

    cart = cart.filter(product => product.id !== productId);

    updateCart();

    showNotification("Item removed from your bag");
}


function showCart() {

    updateCart();

    document.getElementById("cartModal").classList.add("show");

    document.body.classList.add("modal-open");
}


function closeCart() {

    document.getElementById("cartModal").classList.remove("show");

    document.body.classList.remove("modal-open");
}


/* ================= CHECKOUT ================= */

function checkout() {

    if (cart.length === 0) {
        showNotification("Your shopping bag is empty");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    alert(
        "Thank you for choosing ALBERTO WATCH!\n\n" +
        "Order Total: " + formatPrice(total) +
        "\n\nOur team will contact you to confirm your order."
    );
}


/* ================= SEARCH ================= */

function openSearch() {

    const overlay = document.getElementById("searchOverlay");

    overlay.classList.add("show");

    document.body.classList.add("modal-open");

    setTimeout(() => {
        document.getElementById("searchInput").focus();
    }, 200);
}


function closeSearch() {

    document.getElementById("searchOverlay").classList.remove("show");

    document.body.classList.remove("modal-open");

    document.getElementById("searchInput").value = "";

    document.getElementById("searchResults").innerHTML = "";
}


function searchProducts() {

    const input = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    const results = document.getElementById("searchResults");

    if (!input) {
        results.innerHTML = "";
        return;
    }

    const matches = products.filter(product =>
        product.name.toLowerCase().includes(input) ||
        product.category.toLowerCase().includes(input)
    );

    if (matches.length === 0) {

        results.innerHTML = `
            <div class="no-search">
                No timepieces found.
            </div>
        `;

        return;
    }

    results.innerHTML = matches.map(product => `
        <div
            class="search-result"
            onclick="openSearchProduct(${product.id})"
        >
            <img src="${product.image}" alt="${product.name}">

            <div>
                <strong>${product.name}</strong>
                <span>${formatPrice(product.price)}</span>
            </div>
        </div>
    `).join("");
}


function openSearchProduct(productId) {

    closeSearch();

    openProduct(productId);
}


/* ================= MOBILE NAVBAR ================= */

function toggleMenu() {

    const nav = document.getElementById("mainNav");

    if (!nav) return;

    nav.classList.toggle("open");
}


/* Close mobile menu after clicking a link */

document.addEventListener("DOMContentLoaded", () => {

    const navLinks = document.querySelectorAll("#mainNav a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            const nav = document.getElementById("mainNav");

            if (nav) {
                nav.classList.remove("open");
            }

        });

    });

});


/* ================= CONTACT FORM ================= */

function submitContact(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;

    showNotification(
        `Thank you ${name}! Your message has been sent.`
    );

    event.target.reset();
}


/* ================= NEWSLETTER ================= */

function subscribe(event) {

    event.preventDefault();

    const email = document.getElementById("newsletterEmail").value;

    if (!email) return;

    showNotification("Thank you for joining the ALBERTO WATCH Journal!");

    event.target.reset();
}


/* ================= STORE ================= */

function findStore() {

    window.open(
        "https://www.google.com/maps/search/?api=1&query=Karachi+Pakistan",
        "_blank"
    );
}


/* ================= NOTIFICATION ================= */

function showNotification(message) {

    const notification = document.getElementById("notification");
    const notificationText =
        document.getElementById("notificationText");

    if (!notification || !notificationText) return;

    notificationText.textContent = message;

    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}


/* ================= KEYBOARD ================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeModal();
        closeCart();
        closeSearch();

        const nav = document.getElementById("mainNav");

        if (nav) {
            nav.classList.remove("open");
        }
    }

});


/* ================= MODAL BACKDROP ================= */

document.addEventListener("click", event => {

    const productModal = document.getElementById("productModal");
    const cartModal = document.getElementById("cartModal");

    if (event.target === productModal) {
        closeModal();
    }

    if (event.target === cartModal) {
        closeCart();
    }

});


/* ================= INITIALIZE ================= */

document.addEventListener("DOMContentLoaded", () => {

    displayProducts();

    updateCart();

});
