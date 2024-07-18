import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import { useDeviceType } from "@/app/utilities/hooks.server";
import SearchBar from "./components/SearchBar";

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
