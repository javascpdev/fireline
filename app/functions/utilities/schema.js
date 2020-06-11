module.exports = ({ admin, environment }) => {
  const db = admin.firestore();
  const rtdb = admin.database();

  return createSchema({ db, rtdb });
};

module.exports.createSchema = createSchema;

function createSchema({ db, rtdb }) {
  return {
    db,
    rtdb,
    getCustomersRef: () => db.collection('stripe-customers'),
    getCustomerRef: (userId) => db.collection('stripe-customers').doc(userId),
    getPaymentMethodsRef: (userId) =>
      db.collection('stripe-customers').doc(userId).collection('payment-methods'),
    getPaymentMethodRef: (userId, paymentMethodId) =>
      db
        .collection('stripe-customers')
        .doc(userId)
        .collection('payment-methods')
        .doc(paymentMethodId),
    getProductsRef: () => db.collection('stripe-products'),
    getProductRef: (productId) => db.collection('stripe-products').doc(productId),
  };
}
