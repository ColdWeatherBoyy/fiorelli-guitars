import { FC } from "react";

interface HeadingProps {
	title: string;
}

const Heading: FC<HeadingProps> = ({ title }) => {
	return <div className="text-xl font-semibold text-center">{title}</div>;
};

export default Heading;
