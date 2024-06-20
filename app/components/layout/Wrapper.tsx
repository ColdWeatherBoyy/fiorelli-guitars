import { FC, ReactNode } from "react";

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className={`pt-12 md:pt-16 flex justify-center`}>
			<div className="max-h-fit max-w-[80%] lg:max-w-[70%] my-20 lg:mt-36">
				{children}
			</div>
		</div>
	);
};

export default Wrapper;
