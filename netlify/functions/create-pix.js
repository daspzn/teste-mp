module.exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        "X-Idempotency-Key": Date.now().toString()
      },
      body: JSON.stringify({
        transaction_amount: Number(body.transaction_amount), // garante número
        description: body.description,
        payment_method_id: "pix",
        payer: {
          email: body.payer.email
        }
      })
    });

    const data = await response.json();
    console.log("Resposta Mercado Pago:", data); // aparece no log da função no Netlify

    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.error("Erro create-pix:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message || "Erro interno ao gerar PIX"
      })
    };
  }
};
