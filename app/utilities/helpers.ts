import { PageContent } from "@prisma/client";
import { ContentBlockType } from "./types";

export const formatDateTime = (dateTimeStr: string): string => {
	const date = new Date(dateTimeStr);
	const months = (date.getMonth() + 1).toString();
	const days = date.getDate().toString();
	const years = date.getFullYear().toString().slice(-2);

	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padEnd(2, "0");
	const period = hours >= 12 ? "PM" : "AM";

	hours = hours % 12 || 12; // Convert 0 to 12 for midnight, adjust 24-hour to 12-hour
	const formattedHours = hours.toString();

	return `${months}/${days}/${years}, ${formattedHours}:${minutes} ${period}`;
};

export const toTitleCase = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const sortObjectKeys = (obj: Record<string, any>, priority: string[]) => {
	// Only move the priorities to the front of the object, leave the rest as is
	return Object.fromEntries(
		Object.entries(obj).sort(([keyA], [keyB]) => {
			const indexA = priority.indexOf(keyA);
			const indexB = priority.indexOf(keyB);

			if (indexA === -1) return 1;
			if (indexB === -1) return -1;

			return indexA - indexB;
		})
	);
};

export const divideAndSortDatabaseData = (data: Array<Record<string, any>>) => {
	const sortedData = data.map((item) => sortObjectKeys(item, ["name", "content"]));
	const headers = Object.keys(sortedData[0]).filter((header) => header !== "id");
	return { headers, sortedData };
};

export const getContentBlocks = (content: PageContent) => {
	return Object.entries(content).reduce((acc, [key, value]) => {
		if (
			value !== null &&
			Object.values(ContentBlockType).includes(key as unknown as ContentBlockType)
		) {
			acc.push([key, value as string]);
		}
		return acc;
	}, [] as [string, string][]);
};
