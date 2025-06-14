//attempting to do javascript for search function on website

if (searchTerm) {
    // case sensitive check
    const searchLower = searchTerm.toLowerCase();
    const allProducts = document.querySelectorAll('.product');

    allProducts.forEach(product => {
        // find the name of the product from data-name
        const productName = product.dataset.name ? product.dataset.name.toLowerCase() : '';

        if (productName.includes(searchLower)) {
            product.style.display = 'inline-block';
        } else {
            product.style.display = 'none';
        }
    });

}
