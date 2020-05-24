const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

function getShoppingCart(ids, productsList) {
	const cart = {
		products: [],
		promotion: '',
		totalPrice: 0,
		discountValue: 0,
		discount: ''
	};
	const groupedCategories = {};
	const products = [];
	productsList.forEach(
		product => {
			if (ids.includes(product.id)) {
				products.push(product);
				if (!groupedCategories[product.category]) groupedCategories[product.category] = 1;
				else groupedCategories[product.category]++

			}
		})
	cart.promotion = promotions[Object.keys(groupedCategories).length - 1];
	products.forEach(
		product => {
			cart.products.push({
				name: product.name,
				category: product.category,
			})
			cart.totalPrice = cart.totalPrice + product.regularPrice;
			product.promotions.forEach(
				promotion => {
					if (promotion.looks.includes(cart.promotion)) {
						cart.discountValue = cart.discountValue + (product.regularPrice - promotion.price);
					}
				}
			)
		}
	)

	return {
		...cart,
		totalPrice: (cart.totalPrice - cart.discountValue).toFixed(2),
		discountValue: cart.discountValue.toFixed(2),
		discount: (
			(cart.discountValue * 100) / cart.totalPrice
		).toFixed(2) + '%',
	};
}

module.exports = { getShoppingCart };