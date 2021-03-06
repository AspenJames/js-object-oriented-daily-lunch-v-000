// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// classes
class Neighborhood{
  constructor(name){
    this.id = ++neighborhoodId;
    this.name = name;

    store.neighborhoods.push(this);
  };

  customers(){
    return store.customers.filter(function(customer){
      return customer.neighborhoodId === this.id;
    }.bind(this));
  };

  deliveries(){
    return store.deliveries.filter(function(delivery){
      return delivery.neighborhoodId === this.id;
    }.bind(this));
  };

  meals(){
    const meals = [];
    this.deliveries().forEach(function(delivery){
      if(!meals.includes(delivery.meal())){
        meals.push(delivery.meal());
      };
    });
    return meals;
  };
};
let neighborhoodId = 0;

class Customer {
  constructor(name, neighborhoodId) {
    this.id = ++customerId;
    this.neighborhoodId = neighborhoodId;
    this.name = name;

    store.customers.push(this);
  };

  deliveries(){
    return store.deliveries.filter(function(delivery){
      return delivery.customerId === this.id;
    }.bind(this));
  };

  meals(){
    const meals = [];
    this.deliveries().forEach(function(delivery){
      meals.push(delivery.meal());
    });
    return meals;
  };

  totalSpent(){
    const spent = this.meals().map(function(meal){
      return meal.price;
    });
    return spent.reduce(function(acc, val){
      return acc + val;
    });
  };
};
let customerId = 0;

class Meal {
  constructor(title, price) {
    this.id = ++mealId;
    this.title = title;
    this.price = price;

    store.meals.push(this);
  };

  deliveries(){
    return store.deliveries.filter(function(delivery){
      return delivery.mealId === this.id;
    }.bind(this));
  };

  customers(){
    const customers = [];
    this.deliveries().forEach(function(delivery){
      customers.push(delivery.customer());
    });
    return customers;
  };

  static byPrice(){
    const mealsByPrice = store.meals;
    mealsByPrice.sort(function(a, b){
      return b.price - a.price;
    });
    return mealsByPrice;
  };
};
let mealId = 0;

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId;
    this.mealId = mealId;
    this.neighborhoodId = neighborhoodId;
    this.customerId = customerId;

    store.deliveries.push(this);
  };

  meal(){
    return store.meals.find(function(meal){
      return meal.id === this.mealId;
    }.bind(this));
  };

  customer(){
    return store.customers.find(function(customer){
      return customer.id === this.customerId;
    }.bind(this));
  };

  neighborhood(){
    return store.neighborhoods.find(function(neighborhood){
      return neighborhood.id === this.neighborhoodId;
    }.bind(this));
  };
};
let deliveryId = 0;

// Meal.prototype.byPrice = function () {
//   const mealsByPrice = [...store.meals];
//   mealsByPrice.sort(function(a, b){
//     return a.price - b.price;
//   });
//   return mealsByPrice;
// };
