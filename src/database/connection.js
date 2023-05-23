// to import mongoose
import mongoose from "mongoose";

// creates the connection
mongoose.connect('mongodb+srv://timoteoalves14:!@#Timoteo#@!@clustertm.mvph8o9.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
);



// to connect
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Failed to connect with database:'));
db.once('open', function() {
  console.log('Database connection established with success.');
});

export default db;