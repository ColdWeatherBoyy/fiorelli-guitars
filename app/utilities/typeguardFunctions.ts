import { AuthUser } from "@prisma/client";
import {
	AuthUserResponse,
	ContactFormData,
	CreateCustomerAndMessageResponse,
	ErrorResponse,
} from "./types";

export const isContactFormData = (
	response: CreateCustomerAndMessageResponse
): response is ContactFormData => {
	return (
		(response as ContactFormData).customer !== undefined &&
		(response as ContactFormData).newMessage !== undefined
	);
};

export const isAuthUser = (response: AuthUserResponse): response is AuthUser => {
	return (
		(response as AuthUser).id !== undefined && (response as AuthUser).email !== undefined
	);
};
