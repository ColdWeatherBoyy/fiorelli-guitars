import { NotificationContentType } from "@/app/utilities/types";
import { Dispatch, FC, SetStateAction } from "react";
import AdminModalWrapper from "./AdminModalWrapper";
import FormError from "./FormError";
import FormSuccess from "./FormSuccess";

interface NotificationModalProps {
	notificationContent: NotificationContentType;
}

const NotificationModal: FC<NotificationModalProps> = ({ notificationContent }) => {
	return (
		<div>
			{notificationContent.key === "error" ? (
				<FormError error={notificationContent.content as Error} />
			) : (
				<FormSuccess message={notificationContent.content} />
			)}
		</div>
	);
};

export default NotificationModal;
