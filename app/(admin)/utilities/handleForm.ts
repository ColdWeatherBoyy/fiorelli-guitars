import { getUserIdByEmailOrName } from "@/app/utilities/databaseFunctions";

export const handleForm = async (
	prevState: number | null,
	formData: FormData
): Promise<number | null> => {
	try {
		const query = formData.get("query");
		if (!query) throw new Error("No query provided");
		const userId = await getUserIdByEmailOrName(query.toString());
		return userId;
	} catch (error) {
		console.error(error);
		return null;
	}
};
