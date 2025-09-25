export async function handler(event) {
  try {
    const payload = JSON.parse(event.body);
    console.log("Webhook recebido da NivusPay:", payload);

    // Aqui você atualiza o status do pagamento no seu banco de dados
    // payload.status, payload.paymentId etc.

    return {
      statusCode: 200,
      body: "OK"
    };
  } catch (err) {
    console.error("Erro no webhook:", err);
    return {
      statusCode: 500,
      body: "Erro interno"
    };
  }
}
