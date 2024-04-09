"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import Navbar from "./Navbar";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import { MenuIcon } from "lucide-react";

export default function MainMenu() {
  const isNotMobile = useMediaQuery("(min-width: 768px)");
  return isNotMobile ? (
    <div>
      <Navbar isVert={false}></Navbar>
    </div>
  ) : (
    <Drawer direction="right">
      <DrawerTrigger>
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent>
        <div className="my-auto ">
          <Navbar isVert={true}></Navbar>
        </div>{" "}
      </DrawerContent>
    </Drawer>
  );
}
