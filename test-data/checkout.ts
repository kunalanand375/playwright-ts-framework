export const validCustomer = { first: 'John', last: 'Doe', zip: '12345' };

export const invalidCustomers = [
  { first: '', last: 'Doe', zip: '12345', error: 'First Name is required' },
  { first: 'John', last: '', zip: '12345', error: 'Last Name is required' },
  { first: 'John', last: 'Doe', zip: '', error: 'Postal Code is required' },
];

export const products = {
  backpack: { id: 'sauce-labs-backpack', name: 'Sauce Labs Backpack', price: '$29.99' },
  bikeLight: { id: 'sauce-labs-bike-light', name: 'Sauce Labs Bike Light', price: '$9.99' },
  onesie: { id: 'sauce-labs-onesie', name: 'Sauce Labs Onesie', price: '$7.99' },
};
