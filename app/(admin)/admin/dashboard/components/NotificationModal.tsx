import AdminModalWrapper from "@/app/(admin)/components/AdminModalWrapper";
import FormError from "@/app/(admin)/components/FormError";
import FormSuccess from "@/app/(admin)/components/FormSuccess";
import { NotificationContentType } from "@/app/utilities/types";
import { Dispatch, FC, SetStateAction } from "react";

interface NotificationModalProps {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	notificationContent: NotificationContentType;
}

const NotificationModal: FC<NotificationModalProps> = ({
	open,
	setOpen,
	notificationContent,
}) => {
	return (
		<>
			{!open && (
				<AdminModalWrapper setOpen={setOpen}>
					{notificationContent.key === "error" ? (
						<FormError error={notificationContent.content} />
					) : (
						<FormSuccess message={notificationContent.content} />
					)}
				</AdminModalWrapper>
			)}
		</>
	);
};

export default NotificationModal;
