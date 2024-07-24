import AnimateWrapper from "../components/AnimateWrapper";
import { TextSize } from "../utilities/types";
import Card from "./components/components/Card";
import CardButtonLink from "./components/components/CardButtonLink";

export default function NotFound() {
	return (
		<AnimateWrapper>
			<Card title="404 Not Found" body={["This page doesn't exist! Get out of here!"]}>
				<CardButtonLink href="/" text="Return Home" size={TextSize.small} />
			</Card>
		</AnimateWrapper>
	);
}
