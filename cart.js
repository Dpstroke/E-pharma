document.addEventListener("DOMContentLoaded", function () {
    const totalPriceElement = document.getElementById('total-price');
    const cartBody = document.getElementById('cart-body');

    // Function to load cart items from local storage
    function loadCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        // Clear the existing cart body
        cartBody.innerHTML = '';

        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                </td>
                <td class="subtotal">$${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button class="remove-btn" data-id="${item.id}">Remove</button>
                </td>
            `;
            cartBody.appendChild(row);
        });

        // Add event listeners to remove buttons and quantity inputs
        addEventListeners();
        
        // Update the total price
        updateTotalPrice();
    }

    // Function to calculate and update the total price
    function updateTotalPrice() {
        let total = 0;
        const rows = document.querySelectorAll('#cart-table tbody tr');
        rows.forEach(row => {
            const price = parseFloat(row.cells[1].innerText.replace('$', ''));
            const quantity = parseInt(row.querySelector('.quantity-input').value);
            const subtotal = price * quantity;
            row.querySelector('.subtotal').innerText = `$${subtotal.toFixed(2)}`;
            total += subtotal;
        });
        totalPriceElement.innerText = `$${total.toFixed(2)}`;
    }

    // Add event listeners to quantity inputs and remove buttons
    function addEventListeners() {
        const removeButtons = document.querySelectorAll('.remove-btn');
        const quantityInputs = document.querySelectorAll('.quantity-input');

        removeButtons.forEach(button => {
            button.addEventListener('click', function () {
                const productId = button.dataset.id;
                removeItemFromCart(productId);
                loadCartItems(); // Refresh the cart after removal
            });
        });

        quantityInputs.forEach(input => {
            input.addEventListener('change', function () {
                const productId = input.dataset.id;
                updateQuantityInCart(productId, parseInt(input.value));
                updateTotalPrice(); // Update total price when quantity changes
            });
        });
    }

    // Function to update the quantity of an item in the cart
    function updateQuantityInCart(productId, newQuantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === parseInt(productId));
        
        if (itemIndex > -1 && newQuantity > 0) {
            cart[itemIndex].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        } else if (newQuantity === 0) {
            removeItemFromCart(productId); // Remove item if quantity is set to 0
        }
    }

    // Function to remove an item from the cart
    function removeItemFromCart(productId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== parseInt(productId));
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Initial load of cart items
    loadCartItems();
});
;
