import { BaseGuitarNeeds } from "@/app/utilities/types";

export const guitarSpecDefault = {
	body: "",
	neck: "",
	fingerboard: "",
	fingerboardRadius: "",
	scaleLength: "",
	fretMarkers: "",
	neckPickup: "",
	middlePickup: "",
	bridgePickup: "",
	pickupSwitch: "",
	bridge: "",
	vibrato: "",
	tuners: "",
	knobs: "",
	customFeatures: "",
};

export const baseGuitarDefault: Record<keyof BaseGuitarNeeds, string> = {
	name: "",
	tag: "",
	...guitarSpecDefault,
};

export const requiredGuitarSpecs = [
	"body",
	"neck",
	"fingerboard",
	"fingerboardRadius",
	"scaleLength",
	"fretMarkers",
	"neckPickup",
	"bridge",
	"tuners",
];

export const requiredBaseGuitarSpecs = ["name", "tag", ...requiredGuitarSpecs];
export const requiredVariantGuitarSpecs = [
	"name",
	"variantTag",
	"colorScheme",
	...requiredGuitarSpecs,
];

export const VariantGuitarDefault = {
	name: "",
	variantTag: "",
	colorScheme: "",
	...guitarSpecDefault,
};
