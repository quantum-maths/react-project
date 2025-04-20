import SuspenseComponent from "../components/SuspenseComponent/SuspenseComponent";
import { LazyCrypto, LazyDnd } from "./lazy";

export const DragAndDropComponent = () => (
  <SuspenseComponent>
    <LazyDnd />
  </SuspenseComponent>
);

export const TransactionsComponent = () => (
  <SuspenseComponent>
    <LazyCrypto />
  </SuspenseComponent>
);
