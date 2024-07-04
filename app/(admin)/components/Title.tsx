import { FC } from "react";

interface TitleProps {
	title: string;
}

const Title: FC<TitleProps> = ({ title }) => {
	return <div className="text-4xl font-semibold">{title}</div>;
};

export default Title;
