import { FC, ReactNode } from "react";

const MiniWrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div
			className={`mt-12 md:mt-16 w-full flex justify-center h-fit w-fit"
`}
		>
			{children}
		</div>
	);
};

export default MiniWrapper;
