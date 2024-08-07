"use server";

import { cloudinary } from "../cloudinary";

export const deleteResource = async (public_id: string) => {
	const { result } = await cloudinary.uploader.destroy(public_id, {
		invalidate: true,
	});
	return result;
};
