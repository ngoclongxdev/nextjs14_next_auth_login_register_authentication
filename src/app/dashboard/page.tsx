import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
	const session = await getServerSession();
	if (!session) {
		redirect("/login");
	}

	return (
		<div className="flex flex-col items-center justify-between p-10">
			<h1 className="text-4xl">Dashboard</h1>
			<h1>{session.user?.name}</h1>
			<h1>{session.user?.email}</h1>
		</div>
	)
}

export default Dashboard