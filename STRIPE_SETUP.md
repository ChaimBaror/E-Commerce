# Stripe Payment Integration Setup

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

## Getting Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or log in
3. Go to Developers > API Keys
4. Copy your Publishable key and Secret key
5. Replace the placeholder values in your `.env.local` file

## Testing

The integration uses Stripe's test mode by default. You can use these test card numbers:

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Requires authentication**: 4000 0025 0000 3155

Use any future expiry date and any 3-digit CVC.

## Production

For production, replace the test keys with live keys from your Stripe dashboard.
