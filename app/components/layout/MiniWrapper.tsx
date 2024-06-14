import { FC, ReactNode } from "react";

const MiniWrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div
			className={`mt-16 md:mt-8 w-full flex justify-center h-fit w-fit"
`}
		>
			{children}
		</div>
	);
};

export default MiniWrapper;
