// cart.js - Shopping cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    function renderCart() {
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            emptyCartMessage.style.display = 'table-row';
            checkoutBtn.style.opacity = '0.5';
            checkoutBtn.style.pointerEvents = 'none';
            updateCartSummary(0);
            return;
        }
        
        emptyCartMessage.style.display = 'none';
        checkoutBtn.style.opacity = '1';
        checkoutBtn.style.pointerEvents = 'auto';
        
        let subtotal = 0;
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                        <div>
                            <h4 style="margin-bottom: 5px;">${item.title}</h4>
                            <p style="color: #666; font-size: 0.9rem;">Book ID: ${item.id}</p>
                        </div>
                    </div>
                </td>
                <td>$${item.price.toFixed(2)}</td>
                <td>
                    <div class="cart-quantity">
                        <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                        <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                    </div>
                </td>
                <td>$${itemTotal.toFixed(2)}</td>
                <td>
                    <button onclick="removeItem(${index})" class="remove-item">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            cartItemsContainer.appendChild(row);
        });
        
        updateCartSummary(subtotal);
        updateCartCount();
    }
    
    function updateCartSummary(subtotal) {
        const shipping = 5.00;
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + shipping + tax;
        
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
    
    window.updateQuantity = function(index, newQuantity) {
        if (newQuantity < 1) newQuantity = 1;
        
        cart[index].quantity = parseInt(newQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
    
    window.removeItem = function(index) {
        if (confirm('Remove this item from cart?')) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        }
    }
    
    renderCart();
});
