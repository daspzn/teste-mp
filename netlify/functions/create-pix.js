export async function handler(event) {
  try {
    const body = JSON.parse(event.body);

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        transaction_amount: body.transaction_amount,
        description: body.description,
        payment_method_id: "pix",
        payer: {
          email: body.payer.email
        }
      })
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error("Erro create-pix:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Erro interno ao gerar PIX" })
    };
  }
}
