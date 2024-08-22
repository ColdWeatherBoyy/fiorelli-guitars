import { Dispatch, FC, SetStateAction } from "react";

interface ToggleProps {
	isToggled: boolean;
	handleToggle: () => void;
	optionOne: string;
	optionTwo: string;
	isMobile: boolean;
	small: boolean;
}

const Toggle: FC<ToggleProps> = ({
	isToggled,
	handleToggle,
	optionOne,
	optionTwo,
	isMobile,
	small = true,
}) => {
	return (
		<div className="flex justify-center">
			<div
				className={`relative box-content rounded-full ${
					small ? "w-24" : "w-36"
				} h-10 border border-slate-400 dark:border-slate-500 dark:placeholder-slate-300 bg-zinc-50 dark:bg-zinc-600 shadow-inner-outer focus:shadow-md shadow-slate-400 dark:shadow-slate-900 focus:shadow-sm focus:shadow-slate-400 dark:focus:shadow-slate-900 focus:outline-0 focus:ring-1 focus:ring-cyan-400 dark:focus:ring-cyan-800 focus:ring-opacity-50 transition-all ease-in-out duration-200 flex items-center`}
			>
				<div
					className={`absolute bg-gradient-to-r from-slate-600 to-slate-800 dark:from-slate-300 dark:to-slate-500 border border-slate-300 dark:border-slate-400 ${
						isMobile &&
						"hover:border-slate-400 dark:hover:border-slate-500 hover:from-slate-500 hover:to-slate-700 dark:hover:from-slate-200 dark:hover:to-slate-400"
					} transition-all duration-200 ease-in-out rounded-full w-10 h-10 transition-all duration-100 ease-in-out cursor-pointer ${
						isToggled
							? `${small ? "translate-x-[140%]" : "translate-x-[260%]"}`
							: `translate-x-0`
					}`}
					onClick={handleToggle}
				/>
				<div
					className={`absolute whitespace-nowrap	 ${
						isToggled
							? "translate-x-[25%]"
							: `${small ? "translate-x-[195%]" : "translate-x-[250%]"}`
					} w-8 text-base select-none transition-all duration-100 ease-in-out`}
				>
					{isToggled ? optionOne : optionTwo}
				</div>
			</div>
		</div>
	);
};

export default Toggle;

//
