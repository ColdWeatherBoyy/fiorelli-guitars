import { getCldImageUrl } from "next-cloudinary";

export async function getBlurDataUrl(publicId: string) {
	const response = await fetch(
		getCldImageUrl({
			src: publicId,
			width: 100,
		})
	);
	const arrayBuffer = await response.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const base64 = buffer.toString("base64");
	return `data:${response.type};base64,${base64}`;
}
