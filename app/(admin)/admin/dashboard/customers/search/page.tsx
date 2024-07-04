import SearchBar from "@/app/(admin)/components/SearchBar";
import Title from "@/app/(admin)/components/Title";

const searchCustomers = () => {
	return (
		<>
			<Title title="Search Customers" />
			<SearchBar label="Search Customers" placeholder="Email or Name" />
		</>
	);
};

export default searchCustomers;
