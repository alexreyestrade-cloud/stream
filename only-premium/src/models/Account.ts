import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAccount extends Document {
  email: string;
  password?: string;
  credentials?: string; // In case they use a token or raw text
  product: mongoose.Types.ObjectId;
  status: "available" | "sold";
  createdAt: Date;
  updatedAt: Date;
}

const AccountSchema = new Schema<IAccount>(
  {
    email: { type: String, required: true },
    password: { type: String },
    credentials: { type: String }, // Optional field for unstructured credentials
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    status: { type: String, enum: ["available", "sold"], default: "available" },
  },
  { timestamps: true }
);

// Index to quickly find available accounts and prevent locking
AccountSchema.index({ product: 1, status: 1 });

const Account: Model<IAccount> =
  mongoose.models.Account || mongoose.model<IAccount>("Account", AccountSchema);

export default Account;
