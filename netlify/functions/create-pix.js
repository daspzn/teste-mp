import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN // coloque sua variável de ambiente no Netlify
});

const payment = new Payment(client);

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);

    const result = await payment.create({
      body: {
        transaction_amount: body.transaction_amount,
        description: body.description,
        payment_method_id: 'pix',
        payer: {
          email: body.payer.email
        }
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (err) {
    console.error('Erro Mercado Pago:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Erro interno ao gerar PIX' })
    };
  }
}
