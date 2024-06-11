import Image from "next/image";

const BackgroundImage = () => {
	return (
		<Image
			src="/jamie/SP_Horiz_Outdoors_1.jpg"
			alt="Jamie Outdoors with SP Guitar"
			layout="fill"
			objectFit="cover"
		/>
	);
};

export default BackgroundImage;
