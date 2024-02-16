import mongoose, { Schema, Document } from "mongoose";

// export interface IUser {
// 	name: string,
// 	email: string,
// 	password: string,
// }

// export interface IUserModel extends IUser, Document {};

const UserSchema: Schema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true,
	}
);

const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);

export default UserModel;