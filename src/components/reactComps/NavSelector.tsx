"use client";
import Navbar from "./Navbar";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { MenuIcon } from "lucide-react";

import { useMediaQuery } from "@/hooks/use-media-query";
//   const isMobile = useMediaQuery("(min-width: 768px)");

export default function MainMenu(isMobile: boolean) {
  return isMobile ? (
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
  ) : (
    <div>
      <Navbar isVert={false}></Navbar>
    </div>
  );
}
