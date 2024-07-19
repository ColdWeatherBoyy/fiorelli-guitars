import {
	createAuthUser,
	getCustomerIdByEmailOrName,
} from "@/app/utilities/databaseFunctions";
import { AuthUser } from "@prisma/client";

export const handleSearchForm = async (
	prevState: number | Error | null,
	formData: FormData
): Promise<number | Error | null> => {
	try {
		const query = formData.get("query");
		if (!query) {
			return {
				name: "No Query",
				message: "A search term is required. Please try again.",
			};
		}
		const customerId = await getCustomerIdByEmailOrName(query.toString());
		return customerId;
	} catch (error) {
		if ((error as Error).message === "Customer not found.") {
			return {
				name: "Customer Not Found",
				message: "No customer was found with this search term. Please try again.",
			};
		}
		return {
			name: "Search Form Error",
			message: "An error occurred. Please try again.",
			cause: error?.toString() || "No error message provided.",
		};
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
