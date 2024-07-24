import {
	AuthUser,
	Customer,
	BaseGuitarModel,
	VariantGuitarModel,
	Message,
	PageContent,
	GuitarSpec,
} from "@prisma/client";
import { AuthUserResponse } from "./types";

// export const isContactFormData = (
// 	response: CreateCustomerAndMessageResponse
// ): response is ContactFormData => {
// 	return (
// 		(response as ContactFormData).customer !== undefined &&
// 		(response as ContactFormData).newMessage !== undefined
// 	);
// };

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

export const isBaseGuitarModelArray = (arr: any[]): arr is BaseGuitarModel[] => {
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

export const isVariantGuitarModelArray = (arr: any[]): arr is VariantGuitarModel[] => {
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

export const isPageContent = (obj: any): obj is PageContent => {
	return (
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

export const isGuitarSpec = (obj: any): obj is GuitarSpec => {
	return (
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

export const isBaseGuitarModel = (obj: any): obj is BaseGuitarModel => {
	return (
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

export const isVariantGuitarModel = (obj: any): obj is VariantGuitarModel => {
	return (
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

// export const isMessageContent = (obj: any): obj is MessageContent => {
// 	return (
// 		typeof obj === "object" &&
// 		typeof obj.content === "string" &&
// 		obj.createdAt instanceof Date
// 	);
// };

// export const isCustomerWithMessages = (obj: any): obj is Customer => {
// 	return (
// 		typeof obj === "object" &&
// 		obj !== null &&
// 		typeof obj.id === "number" &&
// 		typeof obj.email === "string" &&
// 		(typeof obj.name === "string" || obj.name === null) &&
// 		obj.createdAt instanceof Date &&
// 		Array.isArray(obj.messages) &&
// 		obj.messages.every(isMessageContent)
// 	);
// };

// export const isMessagesArray = (arr: any[]): arr is Message[] => {
// 	return arr.every(
// 		(obj) =>
// 			typeof obj === "object" &&
// 			typeof obj.id === "number" &&
// 			typeof obj.content === "string" &&
// 			obj.createdAt instanceof Date &&
// 			typeof obj.customerId === "number"
// 	);
// };

export const isCustomer = (obj: any): obj is Customer => {
	return (
		typeof obj === "object" &&
		obj !== null &&
		typeof obj.id === "number" &&
		typeof obj.email === "string" &&
		(typeof obj.name === "string" || obj.name === null) &&
		obj.createdAt instanceof Date
	);
};

export const isMessage = (obj: any): obj is Message => {
	return (
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.content === "string" &&
		obj.createdAt instanceof Date &&
		typeof obj.customerId === "number"
	);
};
