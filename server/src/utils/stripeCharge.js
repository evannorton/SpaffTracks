import stripeLoader from 'stripe';
const stripe = stripeLoader(process.env.STRIPE_SECRET_KEY);

function charge(token, amt) {
    // returning a promise, so when we call .charge, we can use .then(...)
    return stripe.charges.create({
        amount: amt * 100, //amount in cents
        currency: 'usd',
        source: token,
        description: 'Statement description'
    });
};

export { charge };