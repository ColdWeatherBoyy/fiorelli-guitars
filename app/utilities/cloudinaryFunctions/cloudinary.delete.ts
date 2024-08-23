"use server";

import { cloudinary } from "../cloudinary";

export const deleteResource = async (public_id: string) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.destroy(public_id, { invalidate: true }, (err, result) => {
			if (err) return reject(err);
			return resolve(result);
		});
	});
};
