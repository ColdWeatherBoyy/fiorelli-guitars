import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { FC } from "react";

interface BackgroundImageProps {
	src: StaticImport;
	alt: string;
}
const BackgroundImage: FC<BackgroundImageProps> = ({ src, alt }) => {
	return (
		<div className="fixed h-screen w-screen overflow-hidden -z-10">
			<Image
				src={src}
				alt={alt}
				fill
				placeholder="blur"
				quality={100}
				sizes="100vw"
				style={{
					objectFit: "cover",
				}}
				priority={true}
			/>
		</div>
	);
};

export default BackgroundImage;
