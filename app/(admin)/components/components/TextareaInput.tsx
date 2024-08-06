import { ChangeEvent, FC } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface TextareaInputProps {
	value: string;
	placeholder?: string;
	disabled?: boolean;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextareaInput: FC<TextareaInputProps> = ({
	value,
	placeholder,
	disabled,
	onChange,
}) => {
	return (
		<TextareaAutosize
			className={`resize-none p-2 rounded-sm border border-slate-400 dark:border-slate-500 dark:placeholder-slate-300 bg-zinc-50 dark:bg-zinc-600 shadow-inner-outer focus:shadow-md shadow-slate-400 dark:shadow-slate-900 focus:shadow-sm focus:shadow-slate-400 dark:focus:shadow-slate-900 focus:outline-0 focus:ring-1 focus:ring-cyan-400 dark:focus:ring-cyan-800 focus:ring-opacity-50 transition-all ease-in-out duration-200`}
			maxRows={10}
			value={value}
			placeholder={placeholder}
			onChange={(event) => onChange(event)}
			disabled={disabled}
		/>
	);
};

export default TextareaInput;
