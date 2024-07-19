import { NotificationContentType } from "@/app/utilities/types";
import { Dispatch, FC, SetStateAction } from "react";
import AdminModalWrapper from "./AdminModalWrapper";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";

interface NotificationModalProps {
	setOpen: Dispatch<SetStateAction<boolean>>;
	notificationContent: NotificationContentType;
	onSuccess?: () => void;
}

const NotificationModal: FC<NotificationModalProps> = ({
	setOpen,
	notificationContent,
	onSuccess,
}) => {
	return (
		<AdminModalWrapper setOpen={setOpen} onSuccess={onSuccess}>
			{notificationContent.key === "error" ? (
				<FormError error={notificationContent.content} />
			) : (
				<FormSuccess message={notificationContent.content} />
			)}
		</AdminModalWrapper>
	);
};

export default NotificationModal;
