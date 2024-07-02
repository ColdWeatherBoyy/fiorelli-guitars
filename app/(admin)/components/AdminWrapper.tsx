import { FC, ReactNode } from "react";

const AdminWrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<div
			className={`flex justify-center items-center bg-gradient-to-br from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-600 text-zinc-950 dark:text-zinc-100 p-8 min-h-dvh min-w-dvw`}
		>
			{children}
		</div>
	);
};

export default AdminWrapper;
