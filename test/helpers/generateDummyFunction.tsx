import React, { ReactNode } from "react";

export const generateDummyFunction = (testId: string, children: ReactNode) => {
    return function DummyFunction() {
        return <div data-testid={testId}>{children}</div>;
    };
};
