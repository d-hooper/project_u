import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const AccountSchema = new Schema(
  {
    subs: [{ type: String }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    // NOTE If you wish to add additional properties do so here
    calorieGoal: { type: Number, min: 100, max: 7000, required: true, default: 2000 },
    hasPremium: { type: Boolean, default: false, required: true },
    // favoriteMeals: { type: Array, required: false },
    favoriteExercises: { type: Array, required: false }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)


