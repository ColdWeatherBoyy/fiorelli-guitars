import {
	AuthUser,
	BaseGuitarModel,
	GuitarSpec,
	VariantGuitarModel,
} from "@prisma/client";

export enum ScreenSize {
	extraSmall = "extraSmall",
	small = "small",
	medium = "medium",
	large = "large",
}

export enum GuitarType {
	base = "Base Model",
	variant = "Variant Model",
}

export interface CloudinaryResource {
	public_id: string;
	secure_url: string;
	context?: { [key: string]: object };
	tags: string[];
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

export interface GuitarSpecNeeds {
	body: string;
	neck: string;
	fingerboard: string;
	fingerboardRadius: string;
	scaleLength: string;
	fretMarkers: string;
	neckPickup: string;
	middlePickup?: string;
	bridgePickup?: string;
	pickupSwitch?: string;
	bridge: string;
	vibrato?: string;
	tuners: string;
	knobs?: string;
	customFeatures?: string;
}

export interface BaseGuitarNeeds extends GuitarSpecNeeds {
	name: string;
	tag: string;
}

export interface VariantGuitarNeeds extends GuitarSpecNeeds {
	name: string;
	variantTag: string;
	colorScheme: string;
	distinction: string;
}

export interface VariantGuitarModelWithSpec extends VariantGuitarModel {
	guitarSpec: GuitarSpec;
}
export interface BaseGuitarModelWithSpec extends BaseGuitarModel {
	guitarSpec: GuitarSpec;
}
export interface VariantGuitarModelWithoutSpec extends VariantGuitarModel {
	guitarSpec: null;
}
export interface BaseGuitarModelWithoutSpec extends BaseGuitarModel {
	guitarSpec: null;
}

export type GuitarModelWithSpec = VariantGuitarModelWithSpec | BaseGuitarModelWithSpec;

export type GuitarModelWithoutSpec =
	| VariantGuitarModelWithoutSpec
	| BaseGuitarModelWithoutSpec;
