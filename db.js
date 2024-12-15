const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://psakh:NIMPHIUS!1958@clusterforcsc.0885f.mongodb.net/?retryWrites=true&w=majority&appName=ClusterForCSC&tlsAllowInvalidCertificates=true")
.then(() => {
    console.log('Connected to the database');
})
.catch((error) => {
    console.log('Connection failed', error);
});

module.exports = mongoose;