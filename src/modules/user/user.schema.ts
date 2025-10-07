import mongoose from "mongoose";
import { EUserRoles, IUser } from "./user.type";
import { COLLECTION_NAMES } from "../../constants/collections";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: EUserRoles,
      default: EUserRoles.student,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent sending password in user object
userSchema.set("toJSON", {
  transform: function (_, ret) {
    delete ret.password;
    return ret;
  },
});

// Pre-save middleware: hash password
userSchema.pre("save", async function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password as string, salt);
  next();
});

// Pre-update middleware: hash if password updated
userSchema.pre(
  ["findOneAndUpdate", "updateOne", "updateMany"],
  async function (next) {
    const update = this.getUpdate() as any;
    if (update?.password) {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(update.password, salt);
      this.setUpdate(update);
    }
    next();
  }
);

// Compare password method
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model(COLLECTION_NAMES.USER, userSchema);
export default UserModel;
