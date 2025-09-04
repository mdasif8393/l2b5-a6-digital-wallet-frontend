import { ReactNode } from "react";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
