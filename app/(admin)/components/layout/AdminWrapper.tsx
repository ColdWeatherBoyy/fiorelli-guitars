import { FC, ReactNode } from "react";

const AdminWrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div
			className={`bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 text-zinc-950 dark:text-zinc-50`}
		>
			{children}
		</div>
	);
};

export default AdminWrapper;
