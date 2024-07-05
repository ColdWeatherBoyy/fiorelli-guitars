import SearchBar from "@/app/(admin)/components/SearchBar";
import Title from "@/app/(admin)/components/Title";
import { useDeviceType } from "@/app/utilities/hooks.server";

const SearchCustomers = () => {
	const isMobile = useDeviceType();
	return (
		<>
			<Title title="Search Customers" />
			<SearchBar placeholder="Email or Name" isMobile={isMobile} />
		</>
	);
};

export default SearchCustomers;
