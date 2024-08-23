import {
	AuthUser,
	Customer,
	GuitarSpec,
	Message,
	PageContent,
	VariantGuitarModel,
} from "@prisma/client";
import {
	AuthUserResponse,
	BaseGuitarNeeds,
	GuitarModelWithSpec,
	VariantGuitarModelWithSpec,
	VariantGuitarNeeds,
} from "./types";

export const isAuthUser = (response: AuthUserResponse): response is AuthUser => {
	return (
		(response as AuthUser).id !== undefined && (response as AuthUser).email !== undefined
	);
};

export const isGuitarSpecArray = (arr: any[]): arr is GuitarSpec[] => {
	return arr.every(
		(obj) =>
			typeof obj === "object" &&
			typeof obj.id === "number" &&
			typeof obj.body === "string" &&
			typeof obj.neck === "string" &&
			typeof obj.fingerboard === "string" &&
			typeof obj.fingerboardRadius === "string" &&
			typeof obj.scaleLength === "string" &&
			typeof obj.fretMarkers === "string" &&
			typeof obj.neckPickup === "string" &&
			(typeof obj.middlePickup === "string" || obj.middlePickup === null) &&
			(typeof obj.bridgePickup === "string" || obj.bridgePickup === null) &&
			(typeof obj.pickupSwitch === "string" || obj.pickupSwitch === null) &&
			typeof obj.bridge === "string" &&
			(typeof obj.vibrato === "string" || obj.vibrato === null) &&
			typeof obj.tuners === "string" &&
			(typeof obj.knobs === "string" || obj.knobs === null) &&
			(typeof obj.customFeatures === "string" || obj.customFeatures === null) &&
			obj.createdAt instanceof Date &&
			obj.updatedAt instanceof Date
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

export const isVariantGuitarModel = (obj: any): obj is VariantGuitarModel => {
	return (
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.variantTag === "string" &&
		typeof obj.name === "string" &&
		typeof obj.colorScheme === "string" &&
		typeof obj.baseModelId === "number" &&
		typeof obj.gallery === "boolean" &&
		typeof obj.createdAt === "object" &&
		typeof obj.updatedAt === "object"
	);
};

export const isGuitarSpec = (obj: any): obj is GuitarSpec => {
	return (
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.body === "string" &&
		typeof obj.neck === "string" &&
		typeof obj.fingerboard === "string" &&
		typeof obj.fingerboardRadius === "string" &&
		typeof obj.scaleLength === "string" &&
		typeof obj.fretMarkers === "string" &&
		typeof obj.neckPickup === "string" &&
		(typeof obj.middlePickup === "string" || obj.middlePickup === null) &&
		(typeof obj.bridgePickup === "string" || obj.bridgePickup === null) &&
		(typeof obj.pickupSwitch === "string" || obj.pickupSwitch === null) &&
		typeof obj.bridge === "string" &&
		(typeof obj.vibrato === "string" || obj.vibrato === null) &&
		typeof obj.tuners === "string" &&
		(typeof obj.knobs === "string" || obj.knobs === null) &&
		(typeof obj.customFeatures === "string" || obj.customFeatures === null) &&
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

export const isGuitarModelWithSpecArray = (arr: any[]): arr is GuitarModelWithSpec[] => {
	return arr.every((obj) => {
		return (
			typeof obj === "object" &&
			typeof obj.id === "number" &&
			typeof obj.name === "string" &&
			obj.createdAt instanceof Date &&
			obj.updatedAt instanceof Date &&
			isGuitarSpec(obj.guitarSpec)
		);
	});
};

export const hasGuitarSpec = <T>(
	model: T & { guitarSpec: null | GuitarSpec }
): model is T & { guitarSpec: GuitarSpec } => {
	return model.guitarSpec !== null;
};

export const hasNoGuitarSpec = <T>(
	model: T & { guitarSpec: null | GuitarSpec }
): model is T & { guitarSpec: null } => {
	return model.guitarSpec === null;
};

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

export const isBaseGuitarNeeds = (obj: any): obj is BaseGuitarNeeds => {
	return (
		typeof obj === "object" &&
		typeof obj.name === "string" &&
		typeof obj.tag === "string" &&
		typeof obj.body === "string" &&
		typeof obj.neck === "string" &&
		typeof obj.fingerboard === "string" &&
		typeof obj.fingerboardRadius === "string" &&
		typeof obj.scaleLength === "string" &&
		typeof obj.fretMarkers === "string" &&
		typeof obj.neckPickup === "string" &&
		(typeof obj.middlePickup === "string" || obj.middlePickup === null) &&
		(typeof obj.bridgePickup === "string" || obj.bridgePickup === null) &&
		(typeof obj.pickupSwitch === "string" || obj.pickupSwitch === null) &&
		typeof obj.bridge === "string" &&
		(typeof obj.vibrato === "string" || obj.vibrato === null) &&
		typeof obj.tuners === "string" &&
		(typeof obj.knobs === "string" || obj.knobs === null) &&
		(typeof obj.customFeatures === "string" || obj.customFeatures === null)
	);
};

export const isVariantGuitarNeeds = (obj: any): obj is VariantGuitarNeeds => {
	return (
		typeof obj === "object" &&
		typeof obj.name === "string" &&
		typeof obj.variantTag === "string" &&
		typeof obj.colorScheme === "string" &&
		typeof obj.body === "string" &&
		typeof obj.neck === "string" &&
		typeof obj.fingerboard === "string" &&
		typeof obj.fingerboardRadius === "string" &&
		typeof obj.scaleLength === "string" &&
		typeof obj.fretMarkers === "string" &&
		typeof obj.neckPickup === "string" &&
		(typeof obj.middlePickup === "string" || obj.middlePickup === null) &&
		(typeof obj.bridgePickup === "string" || obj.bridgePickup === null) &&
		(typeof obj.pickupSwitch === "string" || obj.pickupSwitch === null) &&
		typeof obj.bridge === "string" &&
		(typeof obj.vibrato === "string" || obj.vibrato === null) &&
		typeof obj.tuners === "string" &&
		(typeof obj.knobs === "string" || obj.knobs === null) &&
		(typeof obj.customFeatures === "string" || obj.customFeatures === null)
	);
};

export const isArrayOfBaseGuitarNeedKeys = (
	arr: any[]
): arr is (keyof BaseGuitarNeeds)[] => {
	return arr.every(
		(key) =>
			key === "name" ||
			key === "tag" ||
			key === "body" ||
			key === "neck" ||
			key === "fingerboard" ||
			key === "fingerboardRadius" ||
			key === "scaleLength" ||
			key === "fretMarkers" ||
			key === "neckPickup" ||
			key === "middlePickup" ||
			key === "bridgePickup" ||
			key === "pickupSwitch" ||
			key === "bridge" ||
			key === "vibrato" ||
			key === "tuners" ||
			key === "knobs" ||
			key === "customFeatures"
	);
};

export const isArrayOfVariantGuitarNeedKeys = (
	arr: any[]
): arr is (keyof VariantGuitarNeeds)[] => {
	return arr.every(
		(key) =>
			key === "name" ||
			key === "variantTag" ||
			key === "colorScheme" ||
			key === "distinction" ||
			key === "body" ||
			key === "neck" ||
			key === "fingerboard" ||
			key === "fingerboardRadius" ||
			key === "scaleLength" ||
			key === "fretMarkers" ||
			key === "neckPickup" ||
			key === "middlePickup" ||
			key === "bridgePickup" ||
			key === "pickupSwitch" ||
			key === "bridge" ||
			key === "vibrato" ||
			key === "tuners" ||
			key === "knobs" ||
			key === "customFeatures"
	);
};

export const isVariantGuitarModelWithSpec = (
	obj: any
): obj is VariantGuitarModelWithSpec => {
	return (
		typeof obj === "object" &&
		typeof obj.id === "number" &&
		typeof obj.variantTag === "string" &&
		typeof obj.name === "string" &&
		typeof obj.colorScheme === "string" &&
		typeof obj.distinction === "string" &&
		typeof obj.baseModelId === "number" &&
		typeof obj.gallery === "boolean" &&
		typeof obj.createdAt === "object" &&
		typeof obj.updatedAt === "object" &&
		isGuitarSpec(obj.guitarSpec)
	);
};

export const hasPositiveResult = <T>(obj: T): obj is T & { result: "ok" } => {
	return (obj as any).result === "ok";
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

// export const isContactFormData = (
// 	response: CreateCustomerAndMessageResponse
// ): response is ContactFormData => {
// 	return (
// 		(response as ContactFormData).customer !== undefined &&
// 		(response as ContactFormData).newMessage !== undefined
// 	);
// };
