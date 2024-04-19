"use client";
import Navbar from "./Navbar";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { MenuIcon } from "lucide-react";

export default function NavMenu() {
  return (
    <div className="visibile sm:hidden">
      <Drawer direction="right">
        <DrawerTrigger>
          <MenuIcon />
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
