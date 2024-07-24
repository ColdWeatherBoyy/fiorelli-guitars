"use client";

import Table from "@/app/(admin)/admin/dashboard/components/components/Table";
import Title from "@/app/(admin)/admin/dashboard/components/components/Title";
import { handleAddAuthUserForm } from "@/app/(admin)/utilities/formHandlers";
import TrashCanIcon from "@/app/components/SVGs/TrashCanIcon";
import { deleteAuthUser } from "@/app/utilities/databaseFunctions/authuser.db";
import { isAuthUser } from "@/app/utilities/typeguardFunctions";
import { NotificationContentType } from "@/app/utilities/types";
import { FC, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import NotificationModal from "../../components/notifications/NotificationModal";
import AddAuthUserForm from "./AddAuthUserForm";

interface UserLayoutProps {
	authUsers: Array<Record<string, any>>;
	isMobile: boolean;
}

const AdminUsersLayout: FC<UserLayoutProps> = ({ authUsers, isMobile }) => {
	const [data, setData] = useState(authUsers);
	const [formData, formAction] = useFormState(handleAddAuthUserForm, null);
	const [notificationContent, setNotificationContent] = useState<NotificationContentType>(
		{
			key: "string",
			content: "",
		}
	);
	const [open, setOpen] = useState<boolean>(false);
	const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

	const handleDeleteUser = async (id: string) => {
		const deleteError = new Error(
			"Failed to delete user. If problem persists, please contact site admin."
		);
		deleteError.name = "Delete Error";
		try {
			const deletedUser = await deleteAuthUser(id);
			if (!isAuthUser(deletedUser)) {
				setNotificationContent({
					key: "error",
					content: deletedUser,
				});
				setOpen(true);
				return;
			}
			setData((prevData) => prevData.filter((user) => user.id !== id));
			setNotificationContent({ key: "string", content: "Admin User deleted." });
			setOpen(true);
		} catch (error) {
			setNotificationContent({
				key: "error",
				content: (error as Error) || deleteError,
			});
			setOpen(true);
		}
	};

	const tableInteractionProps = {
		extraHeader: "Delete",
		clickableIcon: <TrashCanIcon />,
		handleClick: handleDeleteUser,
	};

	useEffect(() => {
		if (formData !== null) {
			if (isAuthUser(formData)) {
				setData((prevData) => [...prevData, formData]);
				setNotificationContent({
					key: "string",
					content: `${formData.email} now authorized!`,
				});
				setOpen(true);
			} else {
				setNotificationContent({ key: "error", content: formData });
				setOpen(true);
			}
		}
	}, [formData]);

	useEffect(() => {
		clearTimeout(timeoutRef.current);

		if (open !== false) {
			timeoutRef.current = setTimeout(() => {
				setOpen(false);
			}, 3000);
		}
		return () => {
			clearTimeout(timeoutRef.current);
		};
	}, [open]);

	return (
		<>
			<Title title="Admins" />
			<AddAuthUserForm formAction={formAction} isMobile={isMobile} />
			<Table
				data={data}
				isMobile={isMobile}
				tableInteractionProps={tableInteractionProps}
			/>
			{open && (
				<NotificationModal setOpen={setOpen} notificationContent={notificationContent} />
			)}
		</>
	);
};

export default AdminUsersLayout;
