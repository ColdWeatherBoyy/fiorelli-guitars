import { FC, ReactNode } from "react";

const AdminWrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className={`flex justify-center items-center p-8 min-h-dvh min-w-dvw`}>
			{children}
		</div>
	);
};

export default AdminWrapper;
