import Navbar from "./Navbar";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { MenuIcon } from "lucide-react";
// !!! Make this icon apear in theme

export default function NavMenu() {
  return (
    <div className="visibile sm:hidden">
      <Drawer direction="right">
        <DrawerTrigger>
          <MenuIcon aria-label="Menu" />
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
