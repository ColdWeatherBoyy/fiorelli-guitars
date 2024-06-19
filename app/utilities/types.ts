import { User } from "@prisma/client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

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
	userId: number;
}

export interface ContactFormData {
	newMessage: newMessage;
	user: User;
}
export interface ErrorResponse {
	error: string;
}

export type CreateUserAndMessageResponse = ContactFormData | ErrorResponse;

export interface CloudinaryResource {
	public_id: string;
	secure_url: string;
}
