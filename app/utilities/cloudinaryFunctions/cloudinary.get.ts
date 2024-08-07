"use server";

import { cloudinary } from "../cloudinary";
import { getBlurDataUrl } from "../imageHelpers";
import { CloudinaryResource } from "../types";

export const getResources = async (tag: string) => {
	const { resources }: { resources: CloudinaryResource[] } = await cloudinary.search
		.expression(`tags=${tag}`)
		.with_field("context")
		.sort_by(`public_id`, `asc`)
		.execute();

	const fullResources = await Promise.all(
		resources.map(async (resource: CloudinaryResource) => {
			const thumbnailUrl = resource.secure_url.replace(
				"upload/",
				"upload/c_thumb,h_250,w_250/"
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
