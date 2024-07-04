import { FC } from "react";

interface TitleProps {
	title: string;
}

const Title: FC<TitleProps> = ({ title }) => {
	return <div className="text-4xl font-semibold text-center">{title}</div>;
};

export default Title;
