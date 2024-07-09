"use client";

import AddAuthUserForm from "@/app/(admin)/components/AddAuthUserForm";
import AdminModalWrapper from "@/app/(admin)/components/AdminModalWrapper";
import FormError from "@/app/(admin)/components/FormError";
import FormSuccess from "@/app/(admin)/components/FormSuccess";
import Table from "@/app/(admin)/components/Table";
import Title from "@/app/(admin)/components/Title";
import { handleAddAuthUserForm } from "@/app/(admin)/utilities/formHandlers";
import TrashCanIcon from "@/app/components/SVGs/TrashCanIcon";
import { deleteAuthUser } from "@/app/utilities/databaseFunctions";
import { isAuthUser } from "@/app/utilities/typeguardFunctions";
import { FC, useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";

interface UserLayoutProps {
	authUsers: Array<Record<string, any>>;
	isMobile: boolean;
}

export enum OpenType {
	DELETE = "delete",
	ADD = "add",
	CLOSED = "closed",
}

const AdminUsersLayout: FC<UserLayoutProps> = ({ authUsers, isMobile }) => {
	const [data, setData] = useState(authUsers);
	const [formData, formAction] = useFormState(handleAddAuthUserForm, null);
	const [open, setOpen] = useState<OpenType>(OpenType.CLOSED);
	const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

	const handleDeleteUser = async (id: string) => {
		try {
			await deleteAuthUser(id);
			setData((prevData) => prevData.filter((user) => user.id !== id));
			console.log("1");
			setOpen(OpenType.DELETE);
		} catch (error) {
			console.error(error);
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
				setOpen(OpenType.ADD);
			}
		}
	}, [formData]);

	useEffect(() => {
		clearTimeout(timeoutRef.current);

		if (open !== OpenType.CLOSED) {
			timeoutRef.current = setTimeout(() => {
				console.log(open === OpenType.DELETE ? "hey" : "hi");
				setOpen(OpenType.CLOSED);
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
			{open !== OpenType.CLOSED && (
				<AdminModalWrapper setOpen={setOpen}>
					{open === OpenType.ADD ? (
						formData === null ? null : isAuthUser(formData) ? (
							<FormSuccess message={`${formData.email} now authorized!`} />
						) : (
							<FormError error={formData} />
						)
					) : (
						<FormSuccess message={`Admin User deleted.`} />
					)}
				</AdminModalWrapper>
			)}
		</>
	);
};

export default AdminUsersLayout;
