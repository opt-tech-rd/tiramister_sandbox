// fold と reduce の違いは初期値があるかないかだけ
// Return the set of products that were ordered by all customers
fun Shop.getProductsOrderedByAll(): Set<Product> =
    customers.map { it.getOrderedProducts() }.reduce { accProducts, products -> accProducts.intersect(products) }

// Q8（FlatMap）より
fun Customer.getOrderedProducts(): Set<Product> =
    orders.flatMap { it.products }.toSet()