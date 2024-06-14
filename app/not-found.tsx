import Link from "next/link";
import Card from "./components/components/Card";
import CardLink from "./components/components/CardLink";
import { TextSize } from "./utilities/types";

export default function NotFound() {
	return (
		<Card title="404 Not Found" body={["This page doesn't exist! Get out of here!"]}>
			<CardLink href="/" text="Return Home" size={TextSize.small} />
		</Card>
	);
}
