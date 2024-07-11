import { FC } from "react";

interface FormErrorProps {
	error: Error;
}

const FormError: FC<FormErrorProps> = ({ error }) => {
	return (
		<div className="max-w-[65dvw] sm:max-w-[25dvw] text-center p-2 flex flex-col gap-2 rounded-sm bg-zinc-50 dark:bg-zinc-600 border border-2 border-red-500 shadow-sm shadow-red-800 dark:shadow-red-400">
			<div className="text-lg font-semibold text-red-500">Error: {error.name}</div>
			<div className="text-base font-semibold text-red-500">{error.message}</div>
			{error.cause === undefined ? null : (
				<div className="text-xs text-red-700/80 dark:text-red-300/90 whitespace-wrap max-w-[33dvw] mt-2">
					{error.cause?.toString()}
				</div>
			)}
		</div>
	);
};
export default FormError;
