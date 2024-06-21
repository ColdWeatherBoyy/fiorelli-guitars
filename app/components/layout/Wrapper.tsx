import { FC, ReactNode } from "react";

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div
			className={`h-screen w-screen overflow-hidden flex justify-center items-start py-28 md:py-40`}
		>
			<div className="max-w-[90%] lg:max-w-[70%]">{children}</div>
		</div>
	);
};

export default Wrapper;
