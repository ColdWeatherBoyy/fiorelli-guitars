import { StaticImport } from "next/dist/shared/lib/get-img-props";

export enum WelcomeState {
	welcome = "welcome",
	covering = "covering",
	opening = "opening",
}

export interface ImageIdentifier {
	[key: string]: Image;
}

export interface Image {
	src: StaticImport;
	alt: string;
}

export enum TextSize {
	small = "small",
	medium = "medium",
	large = "large",
}
