import Navbar from "./Navbar";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import "./Hamburger.css";
export default function NavMenu() {
  return (
    <div className="visibile sm:hidden">
      <Drawer direction="right">
        <DrawerTrigger className="HamButton">
          <svg
            viewBox="0 0 100 100"
            width="40"
            height="40"
            className="hamburger fill-none stroke-accent">
            <path
              className="line"
              stroke-width="7"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m 20 20 l 60 60 a 1 1 0 0 1 -60 -60 h 60 a 1 1 0 0 1 0 30 h -60 a 1 1 0 0 0 0 30 h 60 h -60 a 1 1 0 0 1 60 -60 l -60 60"
            />
          </svg>
        </DrawerTrigger>
        <DrawerContent>
          <div className="my-auto ">
            <Navbar isVert={true}></Navbar>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
