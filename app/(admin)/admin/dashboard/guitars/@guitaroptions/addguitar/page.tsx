import { useDeviceType } from "@/app/utilities/hooks.server";
import AddGuitarForm from "../../../components/CMS/AddGuitarForm";
import SubTitle from "../../../components/components/SubTitle";

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
