import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrder extends Document {
  product: mongoose.Types.ObjectId;
  account?: mongoose.Types.ObjectId; // May be null if failed
  amount: number;
  paymentMethod: "stripe" | "paypal" | "mercadopago";
  status: "pending" | "completed" | "failed";
  customerEmail?: string;
  checkoutSessionId?: string; // payment gateway ID
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    account: { type: Schema.Types.ObjectId, ref: "Account" },
    amount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["stripe", "paypal", "mercadopago"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    customerEmail: { type: String },
    checkoutSessionId: { type: String, index: true },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
