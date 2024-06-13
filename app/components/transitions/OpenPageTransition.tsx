const OpenPageTransition = () => {
	return (
		<div className={`hide-me absolute w-screen h-screen z-10`}>
			<div
				className={`absolute left-0 w-[51%] bg-zinc-100 h-screen animate-openFromLeft`}
			/>
			<div
				className={`absolute right-0 w-[51%] bg-zinc-100 h-screen animate-openFromRight`}
			/>
		</div>
	);
};

export default OpenPageTransition;
