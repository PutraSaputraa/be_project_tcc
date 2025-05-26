import app from "./app.js";
import { db } from "./config/Database.js";

const port = 5000;

db.sync({})
  .then(() => {
    console.log("Database synced successfully.");
    app.listen(port, () => {
      console.log(`Server up and running at port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database: ", error);
  });
