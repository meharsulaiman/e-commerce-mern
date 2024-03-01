import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/v1/order/payment`, {
      method: 'POST',
      body: JSON.stringify({
        totalAmount: 3000,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.status === 200) {
      try {
        const confirmPayment = await stripe.confirmCardPayment(
          data.client_secret,
          {
            payment_method: {
              card: elements.getElement(CardNumberElement),
              billing_details: {
                name: 'Jenny Rosen',
                address: {
                  line1: '510 Townsend St',
                  postal_code: '98140',
                  city: 'San Francisco',
                  state: 'CA',
                  country: 'US',
                },
                email: 'hello@gmail.com',
                phone: '+15555555555',
              },
            },
          }
        );

        if (confirmPayment.error) {
          console.error(
            'Error during payment confirmation:',
            confirmPayment.error
          );
        } else {
          if (confirmPayment.paymentIntent.status === 'succeeded') {
            console.log('Payment confirmed successfully');
          } else {
            console.log(
              'Payment not yet succeeded. Status:',
              confirmPayment.paymentIntent.status
            );
          }
        }
      } catch (error) {
        console.error('Error confirming payment:', error);
      }
    } else {
      console.error('Failed to fetch client secret:', data.error);
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardNumberElement />
      <CardExpiryElement />
      <CardCvcElement />
      <button>Confirm Payment</button>
    </form>
  );
};

export default Payment;

// const getPaymentToken = async () => {
//   try {
//     const response = await fetch('/api/v1/order/payment', {
//       method: 'POST',
//       body: JSON.stringify({
//         totalAmount,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//     const data = await response.json();
//     console.log(data);
//     if (data.success === false) return toast.error(data.message);
//     return data.client_secret;
//   } catch (error) {
//     console.log(error.message);
//   }
// };
