// Array of products (same as in the main product page)
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

// Get product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Function to display product details
function displayProductDetails() {
    const product = products.find(p => p.id == productId);

    if (product) {
        const productDetails = `
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}">
            <p>Price: $${product.price}</p>
            <p>${product.description}</p>
            <button>Add to Cart</button>
        `;
        document.getElementById('product-details').innerHTML = productDetails;
    } else {
        document.getElementById('product-details').innerHTML = '<p>Product not found!</p>';
    }
}

// Call the function when the page loads
window.onload = displayProductDetails;
