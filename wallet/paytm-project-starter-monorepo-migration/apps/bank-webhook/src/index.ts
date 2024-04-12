import express from "express";
import db from "@repo/db/client";

const app = express();

app.post("/", async function (req, res) {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  await db.balance.update({
    where: {
      userId: paymentInformation.userId,
    },
    data: {
      amount: {
        increment: paymentInformation.amount,
      },
    },
  });

  await db.onRampTransaction.update({
    where: {
      token: paymentInformation.token,
    },
    data: {
      status: "Success",
    },
  });

  res.status(201).json({
    message: "Captured",
  });
});
