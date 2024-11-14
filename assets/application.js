
    document.querySelectorAll('.increase-quantity, .decrease-quantity').forEach(button => {
        button.addEventListener('click', function () {
            const itemKey = this.getAttribute('data-item-key');
            const isIncrease = this.classList.contains('increase-quantity');
            const quantityEl = document.querySelector(`[data-item-key="${itemKey}"] .item-quantity`);
            let currentQuantity = parseInt(quantityEl.textContent);
            let newQuantity = isIncrease ? currentQuantity + 1 : Math.max(1, currentQuantity - 1);

            fetch('/cart/change.js', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: itemKey, quantity: newQuantity })
            })
                .then(response => response.json())
                .then(data => {
                    // Update the item quantity
                    quantityEl.textContent = newQuantity;

                    // Update the line price for this item
                    const linePriceEl = document.querySelector(`[data-line-price-id="${itemKey}"]`);
                    const updatedItem = data.items.find(i => i.key === itemKey);
                    linePriceEl.textContent = `$${(updatedItem.line_price / 100).toFixed(2)}`;

                    // Update the cart total
                    document.querySelector('.cart-total').textContent = `$${(data.total_price / 100).toFixed(2)}`;
                })
                .catch(error => console.error('Error updating cart:', error));
        });
    });
