//Payment
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
require("dotenv").config({ path: "backend/config/config.env" });
const stripe = require("stripe")(
  "sk_test_51JwoQ1SIQ5NQ03bdFTi7xMCRbclRA36Tz5UIgOCDMojSPgbPCaiUuLq83UEJO0x0dhFMbgAxV3vfHnSEWPhnzTLr00OI6Bbxmm"
);

exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "FoodApp",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
