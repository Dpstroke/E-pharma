// Array of products
const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 10.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'http://betterlifeinc.store/cdn/shop/products/710VzOQME5L._AC_SL1500_1200x1200.jpg?v=1697570064'
    },
    {
        id: 2,
        name: 'Product 2',
        price: 14.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'https://cdn.dotpe.in/longtail/store-items/3153988/XBF0wm6C.jpeg'
    },
    {
        id: 3,
        name: 'Product 3',
        price: 8.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'https://images-na.ssl-images-amazon.com/images/I/512Tb3wxPXL._AC_.jpg'
    },
    {
        id: 4,
        name: 'Product 4',
        price: 12.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'http://ecx.images-amazon.com/images/I/51lYcR3qffL._SX300_QL70_.jpg'
    }
];

// Function to dynamically generate the product list
function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productCard = `
            <div class="product">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>$${product.price}</p>
                <p>${product.description}</p>
                <a href="p-detail.html?id=${product.id}">
                    <button>Buy</button>
                </a>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Call the function when the page loads
window.onload = displayProducts;
