import React from "react";
import "./PayButton.css";

const apiKey = "5725e76a-1dd4-448c-8530-f7b1f3eb368b";
const signatureKey = "DzW/HDawaiwZ@OShFbbAWmcx0c3Aw217";
const environment = 'development';
const sha512 = window.sha512;
const Synap = window.Synap;
class PayButton extends React.Component {
  constructor(props) {
    super(props);
    this.container = props.container;
    this.handlePay = this.handlePay.bind(this);
  }

  handlePay(event) {
    console.log("pay...." + this.container);
    const transactionData = this.getTransaction();
    const identifier = apiKey;
    var signature = this.generateSignature(
      identifier,
      transactionData,
      signatureKey
    );
    const autheticationData = {
      identifier: identifier,
      signature: signature,
    };

    var form = new Synap.Form({
      authentication: autheticationData,
      transaction: transactionData,
      environment: environment,
      listeners: {
        afterPay: function (response) {
          console.info({ ecommerceCapureResponse: response });
        },
      },
    });
    form.render("#" + this.container);
  }

  getTransaction() {
    const generateNumberOrder = new Date().getTime() + "";

    const transactionData = {
      order: {
        number: generateNumberOrder,
        amount: "100.05",
        country: {
          code: "PER",
        },
        currency: {
          code: "PEN",
        },
        products: [
          {
            name: "Frigobar",
          },
        ],
        customer: {
          name: "Javier",
          lastName: "Pérez",
          address: {
            country: "PER",
            levels: ["LIMA", "LIMA", "SAN ISIDRO"],
            line1: "Av Carlos Ferreyros 180",
            zip: "051014",
          },
          email: "javier.perez@synapsolutions.com",
          phone: "999555666",
          document: {
            type: "DNI",
            number: "44556677",
          },
        },
      },
      settings: {
        brands: ["VISA", "MSCD", "AMEX", "DINC"],
        language: "es_PE",
        businessService: "WEB",
      },
    };
    return transactionData;
  }
  generateSignature(identifier, orderData, signatureKey) {
    var orderNumber = orderData.order.number,
      amount = orderData.order.amount,
      currencyCode = orderData.order.currency.code;

    var signatureBase =
      identifier + orderNumber + currencyCode + amount + signatureKey;

    var signature = sha512(signatureBase);
    return signature;
  }
  render() {
    return (
      <button className="pay-button" onClick={this.handlePay}>
        Pagar
      </button>
    );
  }
}
export default PayButton;
