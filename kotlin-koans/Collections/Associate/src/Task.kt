// Build a map from the customer name to the customer
// これ今まで見たことない
fun Shop.nameToCustomerMap(): Map<String, Customer> =
        customers.associateBy { it.name }

// Build a map from the customer to their city
fun Shop.customerToCityMap(): Map<Customer, City> =
        customers.associateWith { it.city }

// Build a map from the customer name to their city
// 構文がキモい
fun Shop.customerNameToCityMap(): Map<String, City> =
        customers.associate { it.name to it.city }