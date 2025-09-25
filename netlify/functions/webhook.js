module.exports.handler = async (event) => {
  try {
    // Mercado Pago envia em formato JSON
    const data = JSON.parse(event.body);
    console.log("Webhook recebido:", data);

    // IMPORTANTE: validar a assinatura do Mercado Pago se necessário

    // Exemplo: evento de pagamento
    if (data.type === "payment" || data.action === "payment.created" || data.action === "payment.updated") {
      const paymentId = data.data.id;

      // Buscar detalhes do pagamento no Mercado Pago
      const resp = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          "Authorization": `Bearer ${process.env.MP_ACCESS_TOKEN}`
        }
      });

      const payment = await resp.json();
      console.log("Detalhes do pagamento:", payment);

      // Aqui você trata os status
      if (payment.status === "approved") {
        // 💰 Dinheiro caiu
        // Ex: salvar no banco de dados, disparar e-mail, notificar no Telegram etc.
      }
    }

    return { statusCode: 200, body: "ok" };
  } catch (err) {
    console.error("Erro webhook:", err);
    return { statusCode: 500, body: "erro" };
  }
};
