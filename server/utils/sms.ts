export const sendSms = async (recipients: string[], message: string) => {
  const apiKey = process.env.ARKESEL_API_KEY;
  const baseUrl = process.env.ARKESEL_BASE_URL;
  const sender = process.env.ARKESEL_SENDER_ID;
  const url = `${baseUrl}/v2/sms/send`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'api-key': apiKey as string,
    },
    body: JSON.stringify({
      sender,
      message,
      recipients,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to send SMS: ${errorText}`);
  }

  return await response.json();
};