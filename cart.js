// cart.js

document.addEventListener("DOMContentLoaded", function () {
    const removeButtons = document.querySelectorAll('.remove-btn');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const totalPriceElement = document.getElementById('total-price');

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

    // Remove item from cart
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = button.closest('tr');
            row.remove();
            updateTotalPrice(); // Update the total price after removal
        });
    });

    // Update total price on quantity change
    quantityInputs.forEach(input => {
        input.addEventListener('change', function () {
            updateTotalPrice(); // Update total price when quantity changes
        });
    });

    // Initial calculation
    updateTotalPrice();
});
