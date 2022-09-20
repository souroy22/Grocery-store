const mongoose = require("mongoose");

const database = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connecting database successfully`);
  } catch (error) {
    console.log(`Error while connecting mongodb, ${error.message}`);
  }
};

module.exports = database;
