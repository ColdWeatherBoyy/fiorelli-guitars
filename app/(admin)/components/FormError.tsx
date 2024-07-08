import { FC } from "react";

interface FormErrorProps {
	error: Error;
}

const FormError: FC<FormErrorProps> = ({ error }) => {
	return (
		<div className="text-center flex flex-col gap-2 p-1 rounded-sm border border-2 border-red-500 shadow-sm shadow-red-800 dark:shadow-red-400 bg-zinc-50 dark:bg-zinc-600">
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
