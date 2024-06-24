const OpenPageTransition = () => {
	return (
		<>
			<div
				className={`absolute left-0 w-[51%] bg-zinc-100 z-10 h-dvh animate-openFromLeft`}
			/>
			<div
				className={`absolute right-0 w-[51%] bg-zinc-100 z-10 h-dvh animate-openFromRight`}
			/>
		</>
	);
};

export default OpenPageTransition;
