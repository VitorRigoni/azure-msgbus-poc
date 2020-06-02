const {
  ServiceBusClient,
  ReceiveMode
} = require("@azure/service-bus");

// Define connection string and related Service Bus entity names here
const connectionString = "Endpoint=sb://msgbuspoc.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=MdL/f+EC7tuVjcmRM0hcKA9fR63YW9Y5ZyKXlW8T7aA=";
const queueName = "poc";

const listen = () => {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString);
  const queueClient = sbClient.createQueueClient(queueName);
  const receiver = queueClient.createReceiver(ReceiveMode.receiveAndDelete);
  const onMessage = ({ body }) => {
    console.log("Message received:");
    console.log(body);
  };

  const onError = (err) => console.log(err);

  receiver.registerMessageHandler(onMessage, onError);
};

const sendMessage = async (body) => {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString);
  const queueClient = sbClient.createQueueClient(queueName);
  const sender = queueClient.createSender();

  await sender.send({
    body
  });
  await queueClient.close();
  await sbClient.close();
};

module.exports = {
  sendMessage,
  listen,
};