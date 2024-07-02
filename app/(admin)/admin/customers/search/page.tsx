import AnimateWrapper from "@/app/components/AnimateWrapper";
import SearchBar from "../../../components/SearchBar";

const searchCustomers = () => {
	return (
		<AnimateWrapper>
			<SearchBar label="Search for Customer" placeholder="Email or Name" />
		</AnimateWrapper>
	);
};

export default searchCustomers;
