import { ContactFormData, CreateUserAndMessageResponse, ErrorResponse } from "./types";

export const isContactFormData = (
	response: CreateUserAndMessageResponse
): response is ContactFormData => {
	return (
		(response as ContactFormData).user !== undefined &&
		(response as ContactFormData).newMessage !== undefined
	);
};

export const isErrorResponse = (
	response: CreateUserAndMessageResponse
): response is ErrorResponse => {
	return (response as ErrorResponse).error !== undefined;
};
