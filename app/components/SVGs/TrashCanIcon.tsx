"use client";

import { deleteAuthUser } from "@/app/utilities/databaseFunctions";
import { FC } from "react";

interface TrashCanProps {
	width?: number;
	height?: number;
	color?: string;
	className?: string;
}
// Thanks to SVG Repo https://www.svgrepo.com/svg/27641/trash-can-outline
const TrashCanIcon: FC<TrashCanProps> = ({
	width = 25,
	height = 25,
	color = "currentColor",
	className = "",
}) => {
	return (
		<svg
			fill={color}
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width={width}
			height={height}
			viewBox="0 0 593.727 593.727"
			xmlSpace="preserve"
			className={className}
		>
			<g>
				<g>
					<path
						d="M491.362,593.727H102.374c-20.865,0-37.84-16.975-37.84-37.84v-448.5h464.668v448.5
			C529.202,576.752,512.228,593.727,491.362,593.727z M79.677,122.529v433.357c0,12.516,10.182,22.697,22.697,22.697h388.989
			c12.516,0,22.697-10.182,22.697-22.697V122.529H79.677z"
					/>
				</g>
				<g>
					<path
						d="M550.8,91.913H42.927V58.382c0-20.86,16.973-37.831,37.835-37.831h192.852C276.618,8.58,286.12,0,297.506,0
			c11.399,0,20.907,8.578,23.905,20.551H512.97c20.859,0,37.83,16.971,37.83,37.831V91.913L550.8,91.913z M58.07,76.77h477.587
			V58.382c0-12.51-10.178-22.688-22.688-22.688h-205.57l-0.148-7.42c-0.145-7.24-4.516-13.131-9.745-13.131
			c-5.219,0-9.586,5.893-9.736,13.136l-0.154,7.415H80.762c-12.512,0-22.692,10.177-22.692,22.688V76.77z"
					/>
				</g>
				<g>
					<path
						d="M144.621,546.275c-15.949,0-28.924-12.977-28.924-28.926V196.011c0-15.95,12.975-28.926,28.924-28.926
			c15.95,0,28.926,12.976,28.926,28.926V517.35C173.547,533.299,160.571,546.275,144.621,546.275z M144.621,182.228
			c-7.599,0-13.781,6.183-13.781,13.783V517.35c0,7.6,6.183,13.783,13.781,13.783c7.601,0,13.783-6.184,13.783-13.783V196.011
			C158.404,188.411,152.222,182.228,144.621,182.228z"
					/>
				</g>
				<g>
					<path
						d="M243.094,546.275c-15.95,0-28.925-12.977-28.925-28.926V196.011c0-15.95,12.976-28.926,28.925-28.926
			c15.949,0,28.925,12.976,28.925,28.926V517.35C272.019,533.299,259.043,546.275,243.094,546.275z M243.094,182.228
			c-7.6,0-13.782,6.183-13.782,13.783V517.35c0,7.6,6.183,13.783,13.782,13.783s13.782-6.184,13.782-13.783V196.011
			C256.876,188.411,250.694,182.228,243.094,182.228z"
					/>
				</g>
				<g>
					<path
						d="M341.565,546.275c-15.949,0-28.926-12.977-28.926-28.926V196.011c0-15.95,12.977-28.926,28.926-28.926
			s28.926,12.976,28.926,28.926V517.35C370.491,533.299,357.515,546.275,341.565,546.275z M341.565,182.228
			c-7.6,0-13.783,6.183-13.783,13.783V517.35c0,7.6,6.184,13.783,13.783,13.783s13.783-6.184,13.783-13.783V196.011
			C355.347,188.411,349.165,182.228,341.565,182.228z"
					/>
				</g>
				<g>
					<path
						d="M440.038,546.275c-15.955,0-28.934-12.977-28.934-28.926V196.011c0-15.95,12.979-28.926,28.934-28.926
			c15.949,0,28.924,12.976,28.924,28.926V517.35C468.962,533.299,455.987,546.275,440.038,546.275z M440.038,182.228
			c-7.605,0-13.791,6.183-13.791,13.783V517.35c0,7.6,6.186,13.783,13.791,13.783c7.6,0,13.781-6.184,13.781-13.783V196.011
			C453.819,188.411,447.638,182.228,440.038,182.228z"
					/>
				</g>
			</g>
		</svg>
	);
};

export default TrashCanIcon;