import React, { createContext, useContext, useMemo } from "react";
import { GamesService } from "./GamesService";

import { SnackBarContext } from "./SnackBarProvider";

export const GamesServiceContext = createContext<GamesService | null>(null);

export const GamesServiceProvider: React.FC = ({ children }) => {
    const snackBar = useContext(SnackBarContext);
    const { notify } = snackBar || {};
    const detectorService = useMemo(() => new GamesService(notify), [notify]);

    return (
        <GamesServiceContext.Provider value={detectorService}>
            {children}
        </GamesServiceContext.Provider>
    );
};
