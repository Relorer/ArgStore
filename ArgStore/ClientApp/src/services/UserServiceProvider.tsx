import React, { createContext, useContext, useMemo } from "react";
import { UserService } from "./UserService";

import { SnackBarContext } from "./SnackBarProvider";

export const UserServiceContext = createContext<UserService | null>(null);

export const UserServiceProvider: React.FC = ({ children }) => {
    const snackBar = useContext(SnackBarContext);
    const { notify } = snackBar || {};
    const detectorService = useMemo(() => new UserService(notify), [notify]);

    return (
        <UserServiceContext.Provider value={detectorService}>
            {children}
        </UserServiceContext.Provider>
    );
};
