import mongoose, { ConnectOptions } from "mongoose";

const connect = async () => {
	if (mongoose.connections[0].readyState) return;

	try {
		await mongoose.connect(process.env.MONGODB_URI as string, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
		} as ConnectOptions);
		
		console.log("Mongoose connection successfully established.");
	} catch (err) {
		throw new Error("Error connecting to Mongoose");
	}
}

export default connect;