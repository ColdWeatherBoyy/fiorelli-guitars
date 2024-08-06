import { useDeviceType } from "@/app/utilities/hooks.server";
import Dropdown from "../../../components/components/Dropdown";
import SubTitle from "../../../components/components/SubTitle";
import AddGuitarForm from "../../../components/CMS/AddGuitarForm";

const AddGuitar = () => {
	const isMobile = useDeviceType();
	return (
		<>
			<SubTitle title="Add Guitar" />
			<AddGuitarForm isMobile={isMobile} />
		</>
	);
};

export default AddGuitar;
