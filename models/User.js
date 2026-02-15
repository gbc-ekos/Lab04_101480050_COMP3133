import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, minlength: 4, maxlength: 100 },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: "Please enter a valid email address",
    },
  },
  address: {
    type: {
      street: { type: String, required: true },
      suite: { type: String, required: true },
      city: {
        type: String,
        required: true,
        validate: {
          validator: (v) => /^[a-zA-Z\s]+$/.test(v),
          message: "City name must contain only alphabets and spaces",
        },
      },
      zipcode: {
        type: String,
        required: true,
        validate: {
          validator: (v) => /^\d{5}-\d{4}$/.test(v),
          message: "Zipcode must be in format DDDDD-DDDD (e.g. 12345-1234)",
        },
      },
      geo: {
        type: {
          lat: { type: String, required: true },
          lng: { type: String, required: true },
        },
        required: true,
      },
    },
    required: true,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\d-\d{3}-\d{3}-\d{4}$/.test(v),
      message: "Phone must be in format D-DDD-DDD-DDDD (e.g. 1-123-123-1234)",
    },
  },
  website: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^https?:\/\/.+/.test(v),
      message: "Website must be a valid URL starting with http or https",
    },
  },
  company: {
    type: {
      name: { type: String, required: true },
      catchPhrase: { type: String, required: true },
      bs: { type: String, required: true },
    },
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
