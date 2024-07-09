import { AuthUser, Customer } from "@prisma/client";

export enum WelcomeState {
	welcome = "welcome",
	covering = "covering",
	opening = "opening",
}

export enum TextSize {
	small = "small",
	medium = "medium",
	large = "large",
}

export enum ScreenSize {
	extraSmall = "extraSmall",
	small = "small",
	medium = "medium",
	large = "large",
}

export interface newMessage {
	id: number;
	content: string;
	createdAt: Date;
	customerId: number;
}

export interface ContactFormData {
	newMessage: newMessage;
	customer: Customer;
}
export interface ErrorResponse {
	error: string;
}

export type CreateCustomerAndMessageResponse = ContactFormData | ErrorResponse;

export interface CloudinaryResource {
	public_id: string;
	secure_url: string;
	context?: { [key: string]: object };
	width?: number;
	height?: number;
	blurDataUrl?: string;
}

export interface GalleryPhotoProps {
	params: {
		id: string;
	};
}

export type AuthUserResponse = AuthUser | Error;

export interface TableInteractionProps {
	extraHeader: string;
	clickableIcon: React.ReactNode;
	handleClick: any;
}

export enum ContentBlockType {
	TITLE = "title",
	HEADING = "heading",
	BODY1 = "body1",
	BODY2 = "body2",
	BODY3 = "body3",
	SIGNATURE = "signature",
	EMAIL = "email",
}

// export enum DeviceType {
// 	mobile = "mobile",
// 	desktop = "desktop",
// }
