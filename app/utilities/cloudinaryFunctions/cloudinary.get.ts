"use server";

import { cloudinary } from "../cloudinary";
import { getBlurDataUrl } from "../imageHelpers";
import { CloudinaryResource } from "../types";

export const getResources = async (tag: string) => {
	const { resources }: { resources: CloudinaryResource[] } = await cloudinary.search
		.expression(`tags=${tag}`)
		.with_field("context")
		.with_field("tags")
		.sort_by(`public_id`, `asc`)
		.execute();

	const fullResources = await Promise.all(
		resources.map(async (resource: CloudinaryResource) => {
			const thumbnailUrl = resource.secure_url.replace(
				"upload/",
				"upload/c_auto,g_auto,h_250,w_250/"
			);
			const thumbnailBlurDataUrl = await getBlurDataUrl(thumbnailUrl);
			resource = {
				...resource,
				blurDataUrl: thumbnailBlurDataUrl,
				secure_url: thumbnailUrl,
			};

			return resource;
		})
	);

	return fullResources;
};

export const getResource = async (tag: string) => {
	const { resources }: { resources: CloudinaryResource[] } = await cloudinary.search
		.expression(`tags=${tag}`)
		.with_field("context")
		.with_field("tags")
		.sort_by(`public_id`, `asc`)
		.max_results(1)
		.execute();

	let fullResource = resources[0];
	const thumbnailUrl = fullResource.secure_url.replace(
		"upload/",
		"upload/c_auto,g_auto,h_250,w_250/"
	);
	const thumbnailBlurDataUrl = await getBlurDataUrl(thumbnailUrl);
	fullResource = {
		...fullResource,
		blurDataUrl: thumbnailBlurDataUrl,
		secure_url: thumbnailUrl,
	};
	return fullResource;
};
