// Return the sum of prices for all the products ordered by a given customer
fun moneySpentBy(customer: Customer): Double =
        customer.orders.sumOf { it.products.sumOf { it.price } }
