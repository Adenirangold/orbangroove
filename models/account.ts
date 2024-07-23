import mongoose, { Schema, Document } from "mongoose";
import { AccountType } from "@/types";

const AccountSchema: Schema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    phone: {
      type: String,
      required: true,
    },

    orderHistory: [
      {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
        date: { type: Date, default: Date.now },
        totalAmount: { type: Number, required: true },
        items: [
          {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
          },
        ],
      },
    ],
    paymentMethods: [
      {
        cardType: { type: String, required: true },
        cardNumber: { type: String, required: true },
        expiryDate: { type: String, required: true },
        cardHolderName: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model<AccountType>("Account", AccountSchema);

export default Account;
