const amqplib = require('amqplib');

(async () => {
  const queueInitial = 'Initial';
  const queueOrder = 'order';
  const conn = await amqplib.connect('amqp://3.225.168.16:5672');
  console.log('Conexión exitosa')
  const ch1 = await conn.createChannel();
  console.log('Canal 1 creado')
    // Sender
  const ch2 = await conn.createChannel();
  console.log('Canal 2 creado')
    // Listener
  ch1.consume(queueInitial, (msg) => {
    if (msg !== null) {
      console.log('Received:', msg.content.toString());
      ch1.ack(msg);
      
      //Acá iria el código para conectar a una API, un socker o algo

      ch2.sendToQueue(queueOrder, Buffer.from('Enviado desde la cola 2'));
    } else {
      console.log('Consumer cancelled by server');
    }
  });
})();