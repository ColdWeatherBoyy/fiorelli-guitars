import SearchBar from "@/app/(admin)/components/SearchBar";
import AnimateWrapper from "@/app/components/AnimateWrapper";

const searchCustomers = () => {
	return (
		<AnimateWrapper>
			<SearchBar label="Search for Customer" placeholder="Email or Name" />
		</AnimateWrapper>
	);
};

export default searchCustomers;
