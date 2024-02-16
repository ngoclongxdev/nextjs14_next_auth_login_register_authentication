import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import UserModel from "@/models/User.model";
import connect from "@/utils/db";

export const POST = async (request: NextRequest) => {
	const { name, email, password } = await request.json();

	await connect();

	const existingUser = await UserModel.findOne({ email });
	if (existingUser) {
		return new NextResponse("Email is already in use.", { status: 400 });
	}

	const hashPass = await bcrypt.hash(password, 10);
	const newUser = new UserModel({
		name,
		email,
		password: hashPass
	});

	try {
		await newUser.save();

		return new NextResponse("User is register", { status: 200 });
	} catch (err: any) {
		return new NextResponse(err, { status: 500 });
	}
}