const mongoose = require("mongoose");
const logger = require("./logger");

const localDBName = "accessibility-app";
const { MONGODB_URI = `mongodb://localhost/${localDBName}` } = process.env;

logger.info(`MONGODB_URI ${MONGODB_URI}`);

  (async () => {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
      });
      logger.info(`Database Connected: ${MONGODB_URI}`)
      mongoose.connection.on('error', (err) => {
        logger.info(`CONNECTION ERROR ${err}`);
      });
    } catch (error) {
      logger.info(`CONNECTION ERROR ${error}`);
    }
  })();