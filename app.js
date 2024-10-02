// Array of products
const products = [
    {
        id: 1,
        name: 'Product 1',
        price: 10.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmjE4c58zhDm6fGhMw3EYlWDZxxzJDkNPHzg&s'
    },
    {
        id: 2,
        name: 'Product 2',
        price: 14.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPwc4xssfbclN6frSPuF2KCyUasZ0YLxehfQ&s'
    },
    {
        id: 3,
        name: 'Product 3',
        price: 8.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpYMJrH4RGJfrmtDDz2KIrtFnKmqtpQY5VZA&s'
    },
    {
        id: 4,
        name: 'Product 4',
        price: 12.99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDb_yaKQsIvxOzvxcoNAUVN5VWv_7l4ot1sw&s'
    },
    {
        id: 5,
        name: 'Paracetamol',
        price: 15.99,
        description: 'Paracetamol Tablets belongs to Analgesics and Antipyretic Drugs, it is most common drug used in fever and cold.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7yG1lwrSpM3U467ur9N5X6qWxRUgTzev5NQ&s '
    },
    {
        id: 6,
        name: 'Atorvastatin',
        price: 17.99,
        description: 'Atorvastatin is in a class of medications called HMG-CoA reductase inhibitors (statins). ',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTInITR-u1ExgUu0LbVcamKWMm46d3hL5CqrQ&s '
    },
    {
        id: 7,
        name: 'Metformin',
        price: 21.99,
        description: 'Metformin is an FDA-approved antidiabetic agent that manages high blood sugar levels in type 2 diabetes patients. ',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgWn6bzWoKNnvgYwH_SBNKahosJ46J80mIhA&s  '
    },
    {
        id: 8,
        name: 'Amoxicillin',
        price: 20.99,
        description: 'Amoxicillin is an aminopenicillin created by adding an extra amino group to penicillin to battle antibiotic resistance.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRROZAnDcsaS0_0gx-96E_7YOXYE7-ybE0FzQ&s '
    },
    {
        id: 9,
        name: 'Ciprofloxacin ',
        price: 9.99,
        description: 'Ciprofloxacin is used to treat bacterial infections in many different parts of the body. ',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFc9lhZcLGmMb4qdSnajYFz_sJQ988wFChBQ&s '
    },
    {
        id: 10,
        name: 'Salbutamol ',
        price: 1.99,
        description: 'Salbutamol is used to relieve symptoms of asthma and chronic obstructive pulmonary disease',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfk2RKYmBF-_7blRD259pvFmfHTSf8r9qOPg&s '
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




