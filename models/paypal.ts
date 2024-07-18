import paypal from 'paypal-rest-sdk';
import config from '../config/paypal';

paypal.configure({
  mode: config.mode as 'sandbox' | 'live',
  client_id: config.Client,
  client_secret: config.clientSecret,
});

interface PaymentItem {
  name: string;
  sku: string;
  price: string;
  currency: string;
  quantity: number;
}

class PayPalService {
  static createPayment(amount: string, items: PaymentItem[]): Promise<string> {
    const paymentData = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      redirect_urls: {
        return_url: config.returnUrl,
        cancel_url: config.cancelUrl,
      },
      transactions: [
        {
          item_list: { items },
          amount: {
            currency: 'EUR',
            total: amount,
          },
          description: 'E-commerce purchase.',
        },
      ],
    };

    return new Promise((resolve, reject) => {
      paypal.payment.create(paymentData, (error:any, payment:any) => {
        if (error) {
          reject(error);
        } else {
          const approvalUrl = payment.links?.find((link:any) => link.rel === 'approval_url')?.href;
          if (approvalUrl) {
            resolve(approvalUrl);
          } else {
            reject(new Error('Approval URL not found'));
          }
        }
      });
    });
  }

  static executePayment(
    paymentId: string,
    payerId: string,
    amount: string,
  ): Promise<paypal.Payment> {
    const executePaymentData = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: 'EUR',
            total: amount,
          },
        },
      ],
    };

    return new Promise((resolve, reject) => {
      paypal.payment.execute(paymentId, executePaymentData, (error:any, payment: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });
  }
}

export default PayPalService;
