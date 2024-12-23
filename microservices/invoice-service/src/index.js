const express = require('express');
const { connectConsumer, subscribeToTopic } = require('./kafka');

const app = express();
app.use(express.json());

const generateInvoice = (paymentInfo) => {
  console.log(`Generating invoice for payment:`, paymentInfo);

  // Fatura oluşturma işlemini simüle et
  const invoice = {
    invoiceId: `INV-${new Date().getTime()}`,
    userId: paymentInfo.userId,
    amount: paymentInfo.amount,
    date: new Date().toISOString(),
  };

  console.log('Invoice generated:', invoice);
};

connectConsumer()
  .then(() => {
    subscribeToTopic('payment-topic', generateInvoice);
  })
  .catch(console.error);

app.listen(3002, () => console.log('Invoice service running on port 3002'));
