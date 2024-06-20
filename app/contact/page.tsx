import AnimateWrapper from "../components/components/AnimateWrapper";
import Card from "../components/components/Card";
import ContactForm from "./components/ContactForm";

export default function Contact() {
	return (
		<AnimateWrapper>
			<Card title={"Contact Fiorelli"}>
				<ContactForm />
			</Card>
		</AnimateWrapper>
	);
}
