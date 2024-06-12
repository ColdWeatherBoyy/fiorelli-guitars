import { ImageIdentifier } from "./types";
import ES_Action_1 from "../../public/guitarShots/EGuit/Horiz_Action_1.jpg";
import SP_Outdoors_1 from "../../public/jamie/SP_Horiz_Outdoors_1.jpg";
import SP_Outdoors_2 from "../../public/jamie/SP_Horiz_Outdoors_2.jpg";
import Outdoors_1 from "../../public/jamie/Horiz_Outdoors_1.jpg";
import H_HB_Detail_1 from "../../public/work/HB_Horiz_Detail_1.jpg";
import V_HB_Detail_1 from "../../public/work/HB_Vert_Detail_1.jpg";
import H_Neck_1 from "../../public/work/Horiz_Neck_1.jpg";
import Shop_1 from "../../public/work/Horiz_Shop_1.jpg";
import SP_Shop_1 from "../../public/work/SP_Horiz_Shop_1.jpg";
import IP_Glamor_1 from "../../public/guitarShots/SPGuit/Vert_IP_Glamor_1.jpg";
import Headstock_1 from "../../public/guitarShots/Headstock_Vert_1.jpg";
import Full_Glamor_1 from "../../public/guitarShots/EJGuit/Vert_Full_Glamor_1.jpg";
import CU_Body_1 from "../../public/guitarShots/SPGuit/Vert_CU_Body_1.jpg";
import V_Neck_1 from "../../public/jamie/Vert_Neck_1.jpg";
import Detail_1 from "../../public/work/Vert_Detail_1.jpg";
import V_Neck_2 from "../../public/work/Vert_Neck_1.jpg";

export const backgroundImagesLarge: ImageIdentifier = {
	E_Action: {
		src: ES_Action_1,
		alt: "Elias playing E guitar",
	},
	J_SP_Hold: {
		src: SP_Outdoors_1,
		alt: "Jamie Outdoors with SP guitar",
	},
	J_Tree: {
		src: Outdoors_1,
		alt: "Jamie Outdoors with tree",
	},
	J_SP_Grin: {
		src: SP_Outdoors_2,
		alt: "Jamie Outdoors with SP Guitar",
	},
	WS_HBGuit: {
		src: H_HB_Detail_1,
		alt: "Jamie working on HB Guitar",
	},
	WS_Neck: {
		src: H_Neck_1,
		alt: "Jamie working on guitar neck",
	},
	WS_Shop: {
		src: Shop_1,
		alt: "Jamie working in shop",
	},
	WS_SPGuit: {
		src: SP_Shop_1,
		alt: "Jamie working on SP Guitar",
	},
};

export const backgroundImagesSmall: ImageIdentifier = {
	J_SP_Hold: {
		src: SP_Outdoors_1,
		alt: "Jamie Outdoors with SP guitar",
	},
	HB_Detail_1: {
		src: V_HB_Detail_1,
		alt: "Jamie working on HB guitar detail",
	},
	G_Headstock_1: {
		src: Headstock_1,
		alt: "Headstock of Fiorelli guitar",
	},
	EJ_Full_Glamor_1: {
		src: Full_Glamor_1,
		alt: "Glamor shot of EJ guitar",
	},
	SP_CU_Body_1: {
		src: CU_Body_1,
		alt: "Close up of SP guitar",
	},
	Neck_1: {
		src: V_Neck_1,
		alt: "Jamie carrying guitar neck",
	},
	Detail_1: {
		src: Detail_1,
		alt: "Jamie working on guitar detail",
	},
	WS_Neck_1: {
		src: V_Neck_2,
		alt: "Jamie working on neck",
	},
};
