import {
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

export const isErrorResponse = (
	response: CreateCustomerAndMessageResponse
): response is ErrorResponse => {
	return (response as ErrorResponse).error !== undefined;
};
