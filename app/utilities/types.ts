import { StaticImport } from "next/dist/shared/lib/get-img-props";

export enum HomepageState {
	welcome = "welcome",
	entering = "entering",
	entered = "entered",
}
export interface PictureIdentifier {
	[key: string]: Picture;
}

export interface Picture {
	src: StaticImport;
	alt: string;
}
