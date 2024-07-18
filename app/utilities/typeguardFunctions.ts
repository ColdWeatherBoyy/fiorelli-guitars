import { AuthUser, GuitarSpec, PageContent } from "@prisma/client";
import {
	AuthUserResponse,
	ContactFormData,
	CreateCustomerAndMessageResponse,
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

export const isPageContentArray = (arr: any[]): arr is PageContent[] => {
	return arr.every(
		(obj) =>
			typeof obj === "object" &&
			typeof obj.id === "number" &&
			typeof obj.pageId === "number" &&
			typeof obj.heading === "string" &&
			Array.isArray(obj.bodies) &&
			obj.bodies.every((item: any) => typeof item === "string") &&
			(typeof obj.signature === "string" || obj.signature === null) &&
			(typeof obj.email === "string" || obj.email === null) &&
			obj.createdAt instanceof Date &&
			obj.updatedAt instanceof Date
	);
};

export const isGuitarSpecArray = (arr: any[]): arr is GuitarSpec[] => {
	return arr.every(
		(obj) =>
			typeof obj === "object" &&
			typeof obj.id === "number" &&
			typeof obj.tag === "string" &&
			typeof obj.name === "string" &&
			typeof obj.body === "string" &&
			typeof obj.neck === "string" &&
			typeof obj.fingerboard === "string" &&
			typeof obj.fingerboardRadius === "string" &&
			typeof obj.scaleLength === "string" &&
			typeof obj.fretMarkers === "string" &&
			typeof obj.neckPickup === "string" &&
			(typeof obj.middlePickup === "string" || obj.middlePickup === null) &&
			typeof obj.bridgePickup === "string" &&
			typeof obj.pickupSwitch === "string" &&
			typeof obj.bridge === "string" &&
			typeof obj.tuners === "string" &&
			typeof obj.knobs === "string" &&
			obj.createdAt instanceof Date &&
			obj.updatedAt instanceof Date
	);
};
