import { lazy } from "react";

export const LazyDnd = lazy(() => import("./DND/DragAndDrop"));
export const LazyCrypto = lazy(() => import("./Crypto/Transactions"));
