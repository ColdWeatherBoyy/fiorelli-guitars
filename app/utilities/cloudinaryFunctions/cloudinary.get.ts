"use server";

import { cloudinary } from "../cloudinary";
import { getBlurDataUrl } from "../imageHelpers";
import { CloudinaryResource } from "../types";

// To-Do: try this cloudinary.api
// .resources_by_tag("shoes")
// .then(result=>console.log(result)); https://cloudinary.com/documentation/tags

// Also perhaps I should switch away from async/await as it seems Cloudinary uses callback
// https://support.cloudinary.com/hc/en-us/community/posts/8786801740434-await-search-in-NodeJS

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
