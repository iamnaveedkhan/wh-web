const qrcode = require('qrcode-terminal');
const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');

const app = express();
const port = 7777;  // Replace with your desired port
const ip = '0.0.0.0';

const whatsapp = new Client({
    authStrategy: new LocalAuth()
});

whatsapp.on('qr', qr => {
    qrcode.generate(qr, {
        small: true
    });
});

whatsapp.on('message', async message => {
    if (message.body === "hi" || message.body === "HI" || message.body === "Hi") {
        message.reply("Hello This Is Naveed");
    }
});

whatsapp.on('ready', () => {
    console.log("Client is ready");
});


app.get('/sendmsg', (req, res) => {
    const phoneNumber = req.query.phone;
    const message = "This is Naveed" 

   
    if (phoneNumber && message) {
        const contact = `${phoneNumber}@c.us`; 
        whatsapp.sendMessage(contact, message).then(response => {
            res.send(`Message sent to ${phoneNumber}: ${message}`);
        }).catch(error => {
            res.status(500).send(`Error sending message: ${error}`);
        });
    } else {
        res.status(400).send("Both phone number and message are required.");
    }
});


app.listen(port,ip, () => {
    console.log(`Server is listening on port ${port}`);
});

whatsapp.initialize();

module.exports = app;
