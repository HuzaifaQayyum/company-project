const mongoose = require('mongoose');


module.exports = server => { 
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, err => {
        if(err) throw err;
        
        const PORT = process.env.PORT || 3000;
        server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    });
}