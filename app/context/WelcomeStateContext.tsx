"use client";

import React, { Dispatch, SetStateAction, createContext, useState } from "react";
import { WelcomeState } from "../utilities/types";

interface WelcomeStateContextProps {
	welcomeState: WelcomeState;
	setWelcomeState: Dispatch<SetStateAction<WelcomeState>>;
}

export const WelcomeStateContext = createContext<WelcomeStateContextProps>({
	welcomeState: WelcomeState.welcome,
	setWelcomeState: () => console.error("setWelcomeState function was not initialized"),
});

export default function WelcomeStateProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [welcomeState, setWelcomeState] = useState<WelcomeState>(WelcomeState.welcome);

	return (
		<WelcomeStateContext.Provider value={{ welcomeState, setWelcomeState }}>
			{children}
		</WelcomeStateContext.Provider>
	);
}
