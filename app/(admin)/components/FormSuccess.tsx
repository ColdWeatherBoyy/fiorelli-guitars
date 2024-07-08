import { FC } from "react";

interface FormSuccessProps {
	message: string;
}

const FormSuccess: FC<FormSuccessProps> = ({ message }) => {
	return (
		<div className="text-center p-2 rounded-sm bg-zinc-50 dark:bg-zinc-600 shadow-sm shadow-slate-400 dark:shadow-slate-900 border border-2 border-slate-400 dark:border-slate-500">
			<div className="text-lg font-semibold">Success!</div>
			<div className="text-base">{message}</div>
		</div>
	);
};

export default FormSuccess;
