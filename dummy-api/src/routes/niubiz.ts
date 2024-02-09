import { Request, Response, Router } from "express";
import {
  successResponseHTML,
  getBoton,
  responsePayment,
  sendAuthorization,
} from "../services/nibuxv2";
import { base64Decode } from "../utils";
import config from "../config/config";
const {
  niubiz: { APIToken, APISession },
} = config;

const merchantId = "456879852";

const router = Router();

// GET INITIAL TOKEN
router.get("/nibuiz/token", async (req: Request, res: Response) => {
  try {
    const response = await fetch(APIToken, {
      headers: {
        // Authorization: `Basic ${base64Encode(
        //   `integraciones@niubiz.com.pe:_7z3@8fF`
        // )}`,
        Authorization: `Basic aW50ZWdyYWNpb25lc0BuaXViaXouY29tLnBlOl83ejNAOGZG`,
      },
    });
    const token = await response.text();
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/nibuiz/session", async (req: Request, res: Response) => {
  try {
    const { amount, token, clientIp } = req.body;
    const bodyData = {
      channel: "web",
      amount: parseFloat(amount).toFixed(2),
      antifraud: {
        clientIp: clientIp,
        merchantDefineData: {
          MDD15: "Valor MDD 15",
          MDD20: "Valor MDD 20",
          MDD33: "Valor MDD 33",
        },
      },
    };
    const URL = `${APISession}${merchantId}`;
    const response = await fetch(URL, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        Authorization: token,
        accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const session = await response.json();
    console.log("[API SESSION]: ", session.sessionKey);
    res.json(session);
  } catch (error: any) {
    console.log("error: ", error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/nibuiz/button", async (req: Request, res: Response) => {
  try {
    const data = await getBoton(req.body);
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(data);
  } catch (error: any) {
    res.setHeader("Content-Type", "text/html");
    res.status(500).json(`<h1>Error: ${error.message}</h1>`);
  }
});

router.post("/order-confirmation", async (req, res) => {
  const { body } = req;
  const payment = req.query.payment;
  const session = base64Decode(payment);

  const options = {
    channel: "web",
    captureType: "manual",
    countable: true,
    order: {
      purchaseNumber: req.query.purchaseNumber,
      tokenId: body.transactionToken,
      amount: parseFloat("1000.00").toFixed(2),
      currency: "PEN",
    },
    merchantId,
    session: { ...session },
    // terminalId: "1",
    // terminalUnattended: false,
  };

  await sendAuthorization(options)
    .then((result) => {
      console.log("result ---* : ", result);
      if (!result.code) {
        const orderHTMLConfirm = successResponseHTML(
          result.order,
          result.dataMap
        );
        let summaryHTMLTransaction = responsePayment(
          "exitoso",
          orderHTMLConfirm
        );
        res.setHeader("Content-Type", "text/html");
        console.log("summaryHTMLTransaction: ", summaryHTMLTransaction);
        res.status(200).send(summaryHTMLTransaction);
      } else {
        res.status(500).json({ message: "Unauthorized access" });
      }
    })
    .catch((err: any) => {
      console.log("err: ", err);
      res.status(500).json({ message: err.message ?? "Unauthorized access" });
    });
});

export default router;
