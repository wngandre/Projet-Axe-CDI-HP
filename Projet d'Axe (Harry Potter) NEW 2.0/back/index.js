import express from "express";
import houseVisited from "./routes/LastHouseRoutes.js";
import cors from "cors";
import router from "./router.js";
import bodyParser from "body-parser";
import { signUp, logIn, index } from "./controllers/AuthController.js";
import ip from "ip";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(houseVisited);
app.use(signUp);
app.use(logIn);
app.use(index);


app.listen(port, () => {
  console.log(`Server run : http://` + ip.address() + `:3000`);
});

export default app;