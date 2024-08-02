import { FC } from "react";

interface SubTitleProps {
	title: string;
}

const SubTitle: FC<SubTitleProps> = ({ title }) => {
	return <div className="text-3xl text-center">{title}</div>;
};

export default SubTitle;
