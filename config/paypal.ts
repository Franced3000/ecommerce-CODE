const mode = process.env.PAYPAL_MODE || 'sandbox';
const clientId = process.env.PAYPAL_CLIENT_ID || '';
const clientSecret = process.env.PAYPAL_CLIENT_SECRET || '';
const returnUrl = process.env.PAYPAL_RETURN_URL || 'http://localhost:3000/api/payment/return';
const cancelUrl = process.env.PAYPAL_CANCEL_URL || 'http://localhost:3000/api/payment/cancel';

export default {
  mode,
  clientId,
  clientSecret,
  returnUrl,
  cancelUrl,
}
