import { CloudinaryResource } from "@/app/utilities/types";
import { CldImage } from "next-cloudinary";
import { FC } from "react";

const WelcomeImage: FC<CloudinaryResource> = ({ secure_url, public_id }) => {
	return (
		<div className="fixed h-screen w-screen overflow-hidden z-10">
			<CldImage
				src={secure_url}
				alt={public_id}
				fill
				blurDataURL={secure_url}
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

export default WelcomeImage;
