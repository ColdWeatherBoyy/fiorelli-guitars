const OpenPageTransition = () => {
	return (
		<>
			<div
				className={`absolute left-0 w-[51%] bg-zinc-100 z-10 h-screen animate-openFromLeft`}
			/>
			<div
				className={`absolute right-0 w-[51%] bg-zinc-100 z-10 h-screen animate-openFromRight`}
			/>
		</>
	);
};

export default OpenPageTransition;
