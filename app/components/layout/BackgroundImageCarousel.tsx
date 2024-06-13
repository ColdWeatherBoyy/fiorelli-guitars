"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { backgroundImageCarousel } from "../../utilities/constants";

const BackgroundImageCarousel: FC = () => {
	const pathname = usePathname();
	const [animate, setAnimate] = useState(pathname !== "/welcome");
	const [currentImageIndex, setCurrentImageIndex] = useState(1);
	const [currentImage, setCurrentImage] = useState(
		backgroundImageCarousel[currentImageIndex]
	);
	const [hasLoaded, setHasLoaded] = useState(false);

	const nextImage = () => {
		setCurrentImageIndex((prevIndex) =>
			prevIndex === backgroundImageCarousel.length - 1 ? 0 : prevIndex + 1
		);
	};

	useEffect(() => {
		setCurrentImage(backgroundImageCarousel[currentImageIndex]);
	}, [currentImageIndex]);

	useEffect(() => {
		if (!animate && pathname !== "/welcome") {
			setAnimate(true);
		}
	}, [pathname]);

	useEffect(() => {
		if (!animate) return;
		const interval = setInterval(() => {
			nextImage();
		}, 10000);
		return () => clearInterval(interval);
	}, [animate]);

	useEffect(() => {
		setHasLoaded(true);
	}, []);

	return (
		<div className="fixed h-screen w-screen overflow-hidden -z-20">
			<AnimatePresence>
				<motion.div
					key={currentImage.alt}
					className="fixed h-screen w-screen overflow-hidden -z-20"
					initial={{ x: currentImageIndex === 1 && !hasLoaded ? "0" : "100%" }}
					animate={{ x: "0%" }}
					exit={{ x: "-100%" }}
					transition={{ duration: 1.25 }}
				>
					<Image
						src={currentImage.src}
						alt={currentImage.alt}
						fill
						placeholder="blur"
						quality={100}
						sizes="100vw"
						style={{
							objectFit: "cover",
						}}
						priority={true}
					/>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};

export default BackgroundImageCarousel;
