import { FC, ReactNode } from "react";

const AdminWrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className={`flex justify-center items-center h-dvh w-dvw`}>{children}</div>;
};

export default AdminWrapper;
