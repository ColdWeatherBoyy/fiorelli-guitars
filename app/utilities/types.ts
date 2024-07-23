import { AuthUser, Customer, GuitarSpec, PageContent } from "@prisma/client";

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

export interface CloudinaryResource {
	public_id: string;
	secure_url: string;
	context?: { [key: string]: object };
	width?: number;
	height?: number;
	blurDataUrl?: string;
}

export interface GalleryPhotoProps {
	params: { tag: string; index: string };
}

export type AuthUserResponse = AuthUser | Error;

export interface TableInteractionProps {
	extraHeader: string;
	clickableIcon: React.ReactNode;
	handleClick: any;
}

export type NotificationContentType =
	| { key: "string"; content: string }
	| { key: "error"; content: Error };
