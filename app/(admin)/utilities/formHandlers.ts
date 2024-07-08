import {
	createAuthUser,
	getCustomerIdByEmailOrName,
} from "@/app/utilities/databaseFunctions";
import { AuthUser } from "@prisma/client";

export const handleSearchForm = async (
	prevState: number | null,
	formData: FormData
): Promise<number | null> => {
	try {
		const query = formData.get("query");
		if (!query) throw new Error("No query provided");
		const customerId = await getCustomerIdByEmailOrName(query.toString());
		return customerId;
	} catch (error) {
		console.error(error);
		return null;
	}
};

export const handleAddAuthUserForm = async (
	prevState: AuthUser | Error | null,
	formData: FormData
): Promise<AuthUser | Error> => {
	try {
		const email = formData.get("email");
		if (!email) {
			return { name: "Email Missing", message: "No email provided" };
		}
		const authUser = createAuthUser(email.toString());

		if (!authUser) {
			return {
				name: "AuthUser Return Missing",
				message: "Error creating auth user, please try again.",
			};
		}
		return authUser;
	} catch (error) {
		if (error instanceof Error) {
			return { name: error.name, message: `Error: ${error.message}` };
		} else {
			return {
				name: "UnkownHandleAuthUserFormError",
				message: "An error occurred. Please try again.",
			};
		}
	}
};
