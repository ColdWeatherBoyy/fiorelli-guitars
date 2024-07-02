"use client";

import { useSession } from "next-auth/react";

const Admin = () => {
	const { status } = useSession();
	if (status === "authenticated") {
		return <div>Admin Page</div>;
	} else if (status === "loading") {
		return <div>Loading...</div>;
	} else {
		return <div>Access denied</div>;
	}
};

export default Admin;
