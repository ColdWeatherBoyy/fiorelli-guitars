import {
	createAuthUser,
	getCustomerIdByEmailOrName,
} from "@/app/utilities/databaseFunctions";
import { AuthUser } from "@prisma/client";

export const handleSearchForm = async (
	prevState: number | Error | null,
	formData: FormData
): Promise<number | Error | null> => {
	const query = formData.get("query");
	if (!query) {
		return {
			name: "No Query",
			message: "A search term is required. Please try again.",
			cause: "Required value missing.",
		};
	}
	try {
		const customerId = await getCustomerIdByEmailOrName(query.toString());

		// Errors are caught in the database function, and whether successful or error, can be returned as is.
		// TypeGuard in form itself
		return customerId;
	} catch (error) {
		return {
			name: "Unexpected Error",
			message:
				"An unexpected error occurred in the Customer Search form. Please try again.",
			cause: error,
		};
	}
};

export const handleAddAuthUserForm = async (
	prevState: AuthUser | Error | null,
	formData: FormData
): Promise<AuthUser | Error> => {
	const email = formData.get("email");
	if (!email) {
		return {
			name: "Email Missing",
			message: "An email is required. Please try again.",
			cause: "Required value missing.",
		};
	}

	try {
		const authUser = await createAuthUser(email.toString());

		// Errors are caught in the database function, and whether successful or error, can be returned as is.
		// TypeGuard in form itself
		return authUser;
	} catch (error) {
		return {
			name: "Unexpected Error",
			message:
				"An unexpected error occurred in the add Authorized User form. Please try again.",
			cause: error,
		};
	}
};
