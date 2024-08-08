import mongoose, { Schema, Types } from "mongoose";
import { AccountType } from "@/types";

const AccountSchema: Schema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },

    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
    address: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Account =
  mongoose.models.Account ||
  mongoose.model<AccountType>("Account", AccountSchema);

export default Account;
