import { FC, ReactNode } from "react";

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className={`flex flex-col justify-between h-dvh w-dvw gap-4`}>{children}</div>
	);
};

export default Wrapper;
