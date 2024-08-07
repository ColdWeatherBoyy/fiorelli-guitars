"use client";

import { CloudinaryResource } from "@/app/utilities/types";
import { AnimatePresence, motion } from "framer-motion";
import { CldImage } from "next-cloudinary";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface BackgroundImageCarousel {
	resources: CloudinaryResource[];
}

const BackgroundImageCarousel: FC<BackgroundImageCarousel> = ({ resources }) => {
	const pathname = usePathname();
	const [animate, setAnimate] = useState(pathname !== "/welcome");
	const [currentImageIndex, setCurrentImageIndex] = useState(1);
	const [currentImage, setCurrentImage] = useState(resources[currentImageIndex]);
	const [hasLoaded, setHasLoaded] = useState(false);

	useEffect(() => {
		setCurrentImage(resources[currentImageIndex]);
	}, [currentImageIndex, resources]);

	useEffect(() => {
		if (!animate && pathname !== "/welcome") {
			setAnimate(true);
		}
	}, [animate, pathname]);

	useEffect(() => {
		const nextImage = () => {
			setCurrentImageIndex((prevIndex) =>
				prevIndex === resources.length - 1 ? 0 : prevIndex + 1
			);
		};
		if (!animate) return;
		const interval = setInterval(() => {
			nextImage();
		}, 15000);
		return () => clearInterval(interval);
	}, [animate, resources.length]);

	useEffect(() => {
		setHasLoaded(true);
	}, []);

	return (
		<AnimatePresence>
			<motion.div
				key={currentImage.public_id}
				className="absolute inset-0 -z-20"
				initial={{ x: currentImageIndex === 1 && !hasLoaded ? "0" : "100%" }}
				animate={{ x: "0%" }}
				exit={{ x: "-100%" }}
				transition={{ ease: "easeInOut", duration: 0.5 }}
			>
				<CldImage
					src={currentImage.secure_url}
					alt={currentImage.public_id}
					fill
					placeholder="blur"
					blurDataURL={currentImage.blurDataUrl}
					sizes="100vw"
					style={{
						objectFit: "cover",
					}}
					priority={true}
					loading="eager"
				/>
			</motion.div>
		</AnimatePresence>
	);
};

export default BackgroundImageCarousel;
