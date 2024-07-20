import mongoose, { Schema, Document } from "mongoose";

export interface AccountType extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  name: {
    first: string;
    last: string;
  };
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
  createdAt: Date;
  updatedAt: Date;
}

export interface UserType {
  email: string;
  password: string;

  createdAt: Date;
  updatedAt: Date;
}
