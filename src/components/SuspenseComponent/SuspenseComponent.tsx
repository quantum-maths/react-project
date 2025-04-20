import { ReactNode, Suspense } from "react";
import Loader from "../Loader/Loader";

const SuspenseComponent = ({ children }: { children: ReactNode }) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default SuspenseComponent;
