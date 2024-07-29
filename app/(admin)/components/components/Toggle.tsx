import { Dispatch, FC, SetStateAction } from "react";

interface ToggleProps {
	toggled: boolean;
	handleToggle: () => void;
	optionOne: string;
	optionTwo: string;
}

const Toggle: FC<ToggleProps> = ({ toggled, handleToggle, optionOne, optionTwo }) => {
	return (
		<div className="flex items-center justify-center gap-2">
			<div
				className={`relative box-content rounded-full w-24 h-10 border border-slate-400 dark:border-slate-500 dark:placeholder-zinc-200 bg-zinc-50 dark:bg-zinc-600 shadow-inner-outer focus:shadow-md shadow-slate-400 dark:shadow-slate-900 focus:shadow-sm focus:shadow-slate-400 dark:focus:shadow-slate-900 focus:outline-0 focus:ring-1 focus:ring-cyan-400 dark:focus:ring-cyan-800 focus:ring-opacity-50 transition-all ease-in-out duration-200 flex items-center`}
			>
				<div
					className={`absolute bg-gradient-to-r from-slate-600 to-slate-800 dark:from-slate-300 dark:to-slate-500 border border-slate-300 dark:border-slate-400 hover:border-slate-400 dark:hover:border-slate-500 hover:from-slate-500 hover:to-slate-700 dark:hover:from-slate-200 dark:hover:to-slate-400 transition-all duration-200 ease-in-out rounded-full w-10 h-10 transition-all duration-100 ease-in-out cursor-pointer ${
						toggled ? "translate-x-[140%]" : "translate-x-0"
					}`}
					onClick={handleToggle}
				/>
				<div
					className={`absolute ${
						toggled ? "translate-x-[25%]" : "translate-x-[195%]"
					} w-8 text-base select-none transition-all duration-100 ease-in-out`}
				>
					{toggled ? optionOne : optionTwo}
				</div>
			</div>
		</div>
	);
};

export default Toggle;

//
