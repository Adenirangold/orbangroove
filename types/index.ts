import mongoose, { Schema, Document } from "mongoose";

export interface AccountType extends Document {
  userId: mongoose.Schema.Types.ObjectId;

  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  phone: string;
  orderHistory: [
    {
      orderId: mongoose.Schema.Types.ObjectId;
      date: Date;
      totalAmount: number;
      items: [
        {
          productId: mongoose.Schema.Types.ObjectId;
          quantity: number;
          price: number;
        }
      ];
    }
  ];
  paymentMethods: [
    {
      cardType: string;
      cardNumber: string;
      expiryDate: string;
      cardHolderName: string;
    }
  ];
}

export interface UserType {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
}
