import conf from "../config/config";
import { base64Encode, formatDate } from "../utils";
const { timeoutUrl, APIEcommerce } = conf.niubiz;

export async function getBoton(options: any) {
  const { order, session } = options;
  console.log("order getBoton(): ", order);
  const urlJs = `https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true`;
  let payment64 = base64Encode({ token: order.token, ...session });

  var result = `
    <main>
      <div class='loader linkid'></div> 
      <p>Espere un momento por favor...</p>       
      <div id='linkid' class='linkid'>        
        <form name='myForm' class="center" id='myForm' action='http:localhost:3000/order-confirmation?purchaseNumber=${order.purchaseNumber}&payment=${payment64}' method='post'>
              <script src='${urlJs}'
              data-sessiontoken='${session.sessionKey}'
              data-channel='web'
              data-merchantid='${order.merchantId}'
              data-merchantlogo='https://www.lolimsa.com.pe/wp-content/uploads/2018/09/qullana.png'
              data-formbuttoncolor='#D80000'
              data-purchasenumber='${order.purchaseNumber}'
              data-amount='${order.amount}'
              data-expirationminutes='5'
              data-timeouturl = '${timeoutUrl}'
              data-showamount="true"
              data-merchantname="APPLE"
              data-cardholdername= 'Juan'
              data-cardholderlastname= 'Perez'
              data-cardholderemail= 'integraciones@niubiz.com.pe'
              >
              </script>
              <input type='hidden' name='toke' value='mamacita'/>
          </form>
      </div>
    </main>
    <script>
    submitform();
    
    function submitform()
    {     
      document.getElementById("linkid").style.display = "none";     
      var y = document.getElementsByClassName("start-js-btn modal-opener default");
      var aNode = y[0].click(); 
    }
    </script>
    <style>main{display:grid;place-items:center}.loader{border:16px solid #f3f3f3;border-top:16px solid #3498db;border-radius:50%;width:120px;height:120px;animation:spin 2s linear infinite;margin:30vh auto 0 auto}@keyframes spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}</style>
    
  `;

  return result;
}

function encryptObject(data: any) {
  let objJsonStr = JSON.stringify(data);
  let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
  return objJsonB64;
}

export function desencryptObject(data: any) {
  let objJsonStr = Buffer.from(data, "base64").toString("ascii");
  return objJsonStr;
}

export async function sendAuthorization(payment: any) {
  const { merchantId, session, ...rest } = payment;
  const url = `${APIEcommerce}${payment.merchantId}`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(rest),
    headers: {
      Authorization: `${session.token}`,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  if (response.ok === false) {
    throw new Error("Error en la autorización");
  }

  const json = await response.json();
  return json;
}

export const successResponseHTML = (order: any, dataMap: any) => {
  return `<div class="colums">
    <div class="right">
        <p><b>Orden: </b></p>                            
        <p><b>Tarjeta: </b></p>
        <p><b>Medio de pago: </b></p>
        <p><b>Monto (S/.): </b></p>
        <p><b>Fecha y hora: </b></p>
        <p><b>Descripción: </b></p>
    </div>
    <div class="left">
        <p>${order.purchaseNumber}</p>                            
        <p>${dataMap.CARD}</p>
        <p>${dataMap.BRAND.toUpperCase()}</p>
        <p>${dataMap.AMOUNT} </p>
        <p>${formatDate(order.transactionDate)} </p>
        <p>${dataMap.ACTION_DESCRIPTION}</p>
    </div>
  </div>`;
};

export const contentFailed = (response: any) => {
  return `<p class="center">Su transacción no fue procesada.</p> ${
    response.data
      ? "<p class='center'>(Código de error: " + response.data.ACTION_CODE + ")"
      : "Operación denegada. Intente nuevamente"
  } </p> <br/> ${
    response.data.ACTION_DESCRIPTION
      ? "<p><b>Descripción: </b>" + response.data.ACTION_DESCRIPTION
      : " "
  } `;
};

export const responsePayment = (type: any, content: any) => {
  const style = `<style>*{box-sizing:border-box;margin:0;padding:0}html{background-color:#f6f9fc;font-size:100%;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Open Sans','Helvetica Neue',sans-serif}main{box-sizing:border-box;display:flex;justify-content: center; align-items: center; width: 100vw; padding: 10px;}.container{border-radius:.6rem;border:#2ca2eb .1rem solid}.title{border-radius:.6rem;padding:.6rem;background-color:#2ca2eb;text-align:center;font-weight:700;margin-bottom:2rem;font-size:2rem}p{font-weight:400;font-size:1rem; }.btnBlue{padding:1rem 3rem 1rem 3rem;}.small{padding-top:1rem;text-align:center;font-size:1rem}.colums{column-count:2}.right{text-align:right}.left{text-align:left}.btnBlue{text-decoration:none;align-self:center;text-align:center;background-color:#2ca2eb;border-radius:.6rem;border:0 solid;padding:.6rem;color:#000;cursor:pointer}.btnBlue:hover{background-color:#e1ecf4;color:#2ca2eb}.instruction{margin-bottom:0;padding-bottom:0}.center{padding-top:1rem;text-align:center;}</style>`;

  let response = `<main>
      <div class="container">
          <div>
              <p class="title">Pago ${type}</p>
          </div>
          ${content}
          <div class="small">                                
              <a href="myapp://Confirmation"" class="btnBlue" >Finalizar</a>

              <button onclick="window.ReactNativeWebView.postMessage('Confirmation')">Pagina de confirmacion</button>

              <p class="small">
                  <p class="small"><b class="instruction">IMPORTANTE: Presione finalizar para concretar la transacción.</b></p> Esta tienda está autorizada por Visa para realizar transacciones electrónicas.
                  </br>Copyright 2020 <a target="_blank" href="https://www.lolimsa.com.pe/">LOLIMSA</a></p>
          </div>
      </div>
  </main> ${style}`;
  return response;
};
