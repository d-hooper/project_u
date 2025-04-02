import { Schema } from "mongoose";

export const MealSchema = new Schema(
  {
    id: { type: Schema.ObjectId, required: true },
    fatSecretMealId: { type: Number, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
    calorieCount: { type: Number, required: true },
    servingSize: { type: Number, require: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)