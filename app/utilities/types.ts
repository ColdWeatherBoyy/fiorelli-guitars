import { StaticImport } from "next/dist/shared/lib/get-img-props";

export enum HomepageState {
	welcome = "welcome",
	entering = "entering",
	entered = "entered",
}

export interface ImageIdentifier {
	[key: string]: Image;
}

export interface Image {
	src: StaticImport;
	alt: string;
}
