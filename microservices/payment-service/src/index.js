const express = require('express');
const { connectProducer, sendMessage } = require('./kafka');

const app = express();
app.use(express.json());

app.post('/process-payment', async (req, res) => {
  const paymentInfo = req.body;

  console.log('Payment processed:', paymentInfo);

  await sendMessage('payment-topic', {
    userId: paymentInfo.userId,
    amount: paymentInfo.amount,
    status: 'success',
  });

  res.status(200).json({ message: 'Payment successful!' });
});

connectProducer().catch(console.error);

app.listen(3001, () => console.log('Payment service running on port 3001'));
