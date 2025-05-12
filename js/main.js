(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:3
            },
            768:{
                items:4
            },
            992:{
                items:5
            },
            1200:{
                items:6
            }
        }
    });


    // Related carousel
    $('.related-carousel').owlCarousel({
        loop: true,
        margin: 29,
        nav: false,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            }
        }
    });


    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });
    
})(jQuery);

// Function to open the chatbox
function openChatbox() {
    document.getElementById('chatbox').style.display = 'block';
}

// Function to close the chatbox
function closeChatbox() {
    document.getElementById('chatbox').style.display = 'none';
}

// Function to simulate sending a message
function sendMessage(event) {
    if (event.key === 'Enter') {
        const message = document.getElementById('userMessage').value;
        if (message.trim() !== '') {
            const messageContainer = document.createElement('div');
            messageContainer.classList.add('chat-message');
            messageContainer.innerHTML = `<span class="user">${message}</span>`;
            document.querySelector('.chatbox-content').appendChild(messageContainer);

            // Clear the input field
            document.getElementById('userMessage').value = '';

            // Scroll to the bottom
            document.querySelector('.chatbox-content').scrollTop = document.querySelector('.chatbox-content').scrollHeight;

            // Simulate bot reply
            setTimeout(() => {
                const botMessage = document.createElement('div');
                botMessage.classList.add('chat-message');
                botMessage.innerHTML = `<span class="bot">Thank you! We'll get back to you shortly with a quote.</span>`;
                document.querySelector('.chatbox-content').appendChild(botMessage);
                document.querySelector('.chatbox-content').scrollTop = document.querySelector('.chatbox-content').scrollHeight;
            }, 1500);
        }
    }
}




        // Sample product data (will be replaced with API calls)
        const products = [
            {
                id: 1,
                name: "Wireless Headphones",
                description: "High-quality wireless headphones with noise cancellation",
                price: 129.99,
                image: "https://via.placeholder.com/300x200?text=Headphones",
                category: "electronics"
            },
            {
                id: 2,
                name: "Smart Watch",
                description: "Track your fitness and stay connected",
                price: 199.99,
                image: "https://via.placeholder.com/300x200?text=Smart+Watch",
                category: "electronics"
            },
            {
                id: 3,
                name: "Men's Casual Shirt",
                description: "Comfortable cotton shirt for everyday wear",
                price: 39.99,
                image: "https://via.placeholder.com/300x200?text=Casual+Shirt",
                category: "clothing"
            },
            {
                id: 4,
                name: "Bestselling Novel",
                description: "The latest bestseller from a renowned author",
                price: 24.99,
                image: "https://via.placeholder.com/300x200?text=Novel",
                category: "books"
            },
            {
                id: 5,
                name: "Coffee Maker",
                description: "Programmable coffee maker for perfect brews",
                price: 79.99,
                image: "https://via.placeholder.com/300x200?text=Coffee+Maker",
                category: "home"
            },
            {
                id: 6,
                name: "Wireless Earbuds",
                description: "Compact wireless earbuds with charging case",
                price: 89.99,
                image: "https://via.placeholder.com/300x200?text=Earbuds",
                category: "electronics"
            },
            {
                id: 7,
                name: "Women's Running Shoes",
                description: "Lightweight and comfortable running shoes",
                price: 119.99,
                image: "https://via.placeholder.com/300x200?text=Running+Shoes",
                category: "clothing"
            },
            {
                id: 8,
                name: "Blender",
                description: "Powerful blender for smoothies and more",
                price: 69.99,
                image: "https://via.placeholder.com/300x200?text=Blender",
                category: "home"
            }
        ];
        
        // Function to render products
        function renderProducts(productsToRender) {
            const container = document.getElementById('products-container');
            container.innerHTML = '';
            
            if (productsToRender.length === 0) {
                container.innerHTML = '<p>No products found matching your criteria.</p>';
                return;
            }
            
            productsToRender.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-description">${product.description}</div>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                `;
                
                container.appendChild(productCard);
            });
            
            // Add event listeners to "Add to Cart" buttons
            document.querySelectorAll('.add-to-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = this.getAttribute('data-id');
                    addToCart(productId);
                });
            });
        }
        
        // Function to add product to cart
        function addToCart(productId) {
            // This will be implemented when we connect to the backend
            console.log(`Product ${productId} added to cart`);
            alert(`Product added to cart!`);
            
            // Here you would normally make an API call to the backend
            // or store the item in localStorage temporarily
        }
        
        // Filter products based on user selection
        function filterProducts() {
            const categoryFilter = document.getElementById('category-filter').value;
            const priceFilter = document.getElementById('price-filter').value;
            const searchTerm = document.getElementById('search-input').value.toLowerCase();
            
            let filteredProducts = [...products];
            
            // Apply category filter
            if (categoryFilter) {
                filteredProducts = filteredProducts.filter(product => 
                    product.category === categoryFilter
                );
            }
            
            // Apply price filter
            if (priceFilter) {
                const [min, max] = priceFilter.split('-');
                
                if (max === '+') {
                    filteredProducts = filteredProducts.filter(product => 
                        product.price >= parseFloat(min)
                    );
                } else {
                    filteredProducts = filteredProducts.filter(product => 
                        product.price >= parseFloat(min) && product.price <= parseFloat(max)
                    );
                }
            }
            
            // Apply search filter
            if (searchTerm) {
                filteredProducts = filteredProducts.filter(product => 
                    product.name.toLowerCase().includes(searchTerm) || 
                    product.description.toLowerCase().includes(searchTerm)
                );
            }
            
            renderProducts(filteredProducts);
        }
        
        // Add event listeners to filters
        document.getElementById('category-filter').addEventListener('change', filterProducts);
        document.getElementById('price-filter').addEventListener('change', filterProducts);
        document.getElementById('search-input').addEventListener('input', filterProducts);
        
        // Load products when page loads
        document.addEventListener('DOMContentLoaded', () => {
            renderProducts(products);
            
            // In a real implementation, you would fetch products from your API:
            /*
            fetch('/api/products')
                .then(response => response.json())
                .then(data => {
                    products = data;
                    renderProducts(products);
                })
                .catch(error => console.error('Error fetching products:', error));
            */
        });
