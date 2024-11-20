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
			<div className="mt-[25dvh]">
				{notificationContent.key === "error" ? (
					<FormError error={notificationContent.content as Error} />
				) : (
					<FormSuccess message={notificationContent.content} />
				)}
			</div>
		</AdminModalWrapper>
	);
};

export default NotificationModal;
