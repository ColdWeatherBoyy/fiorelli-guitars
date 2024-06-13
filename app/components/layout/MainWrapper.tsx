import { FC, ReactNode } from "react";

const MainWrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className={`min-h-screen w-full flex `}>{children}</div>;
};

export default MainWrapper;
