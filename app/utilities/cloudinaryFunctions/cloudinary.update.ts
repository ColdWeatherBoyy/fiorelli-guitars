"use server";

import { cloudinary } from "../cloudinary";

// https://stackoverflow.com/questions/53853827/async-await-for-cloudinary-upload-not-working
// Thanks to this for solution when async/await wasn't working

export const addTagToResource = async (
	public_id: string,
	tag: string
): Promise<string | Error> => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.add_tag(tag, [public_id], (err, result) => {
			if (err) return reject(err);
			return resolve(result.public_ids[0]);
		});
	});
};

export const removeTagFromResource = async (
	public_id: string,
	tag: string
): Promise<string | Error> => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.remove_tag(tag, [public_id], (err, result) => {
			if (err) return reject(err);
			return resolve(result.public_ids[0]);
		});
	});
};

export const removeFromOneResourceAndThenAddToAnother = async (
	oldPublicId: string,
	newPublicId: string,
	tag: string
): Promise<string | Error> => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.remove_tag(tag, [oldPublicId], (removeErr, removeResult) => {
			if (removeErr) return reject(removeErr);

			cloudinary.uploader.add_tag(tag, [newPublicId], (addErr, addResult) => {
				if (addErr) return reject(addErr);

				if (removeResult?.public_ids?.[0] && addResult?.public_ids?.[0]) {
					resolve(addResult.public_ids[0]);
				} else {
					reject(
						new Error("Failed to remove from one resource and then add to another.")
					);
				}
			});
		});
	});
};
