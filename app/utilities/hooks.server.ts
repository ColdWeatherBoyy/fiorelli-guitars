import { headers } from "next/headers";
import { UAParser } from "ua-parser-js";

// Thanks to https://stackademic.com/blog/the-best-way-to-detect-mobile-device-in-next-js-14
export const useDeviceType = () => {
	if (typeof process === "undefined") {
		throw new Error(
			"[Server method] you are importing a server-only module outside of server"
		);
	}
	const { get } = headers();
	const ua = get("user-agent");

	const uap = new UAParser(ua || "");

	// To-Do: Get .withFeatureCheck() to work https://github.com/faisalman/ua-parser-js/issues/690
	// I think the issue is with the typing – IDevice is supposed to extend IData (https://github.com/faisalman/ua-parser-js/blob/master/src/main/ua-parser.d.ts#L33)
	// But @types/ua-parser-js just makes IDevice directly https://www.npmjs.com/package/@types/ua-parser-js?activeTab=code
	const device = uap.getDevice().type;

	return typeof device === "string";
};
