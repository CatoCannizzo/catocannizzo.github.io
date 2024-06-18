import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface linkContainer {
  grouping: string;
  list: {
    title: string;
    href: string;
    description: string;
  }[];
}
const components: linkContainer[] = [
  {
    grouping: "Case Studies",
    list: [
      {
        title: "GetGreen",
        href: "/casestudies/getgreen",
        description: "Studying user retention, for a habit-building app.",
      },
      {
        title: "ACES Misinformation Control",
        href: "/casestudies/acesinfosystem",
        description:
          "Developing a hypothetical system to combat misinformation.",
      },
      {
        title: "Portfolio Creation",
        href: "/casestudies/portfolioaccessibility",
        description: "Insight to my design methodology for this website.",
      },
    ],
  },
  {
    grouping: "Other Work",
    list: [
      // {
      //   title: "SILI",
      //   href: "/underconstruction",
      //   description:
      //     "Silly Ideas for Loony Issues - I make up problems, then make up solutions.",
      // },
      {
        title: "Product Teardown",
        href: "/underconstruction",
        description: "Analyzing the design process for other products.",
      },
      {
        title: "Digital Designs",
        href: "/underconstruction",
        description:
          "Fictitious websites designed to practice web development standards.",
      },
    ],
  },
];

export default function NavMenu({ isVert }: { isVert: boolean }) {
  return (
    <NavigationMenu isVert={isVert} className="h-5 py-10">
      <NavigationMenuList className={cn(isVert && "flex-col items-start")}>
        <NavigationMenuItem>
          <a className={navigationMenuTriggerStyle()} href="/">
            Home
          </a>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            {components[0].grouping}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              {/* <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/">
                    <div className="mb-2 mt-4 text-lg font-medium">
                      What is design?
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      "Outcomes mediated by constraints"
                    </p>
                  </a>
                </NavigationMenuLink>
              </li> */}

              {components[0].list.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>
            {components[1].grouping}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components[1].list.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>asd */}
        <NavigationMenuItem>
          <a
            className={navigationMenuTriggerStyle()}
            aria-label="Open P D F resume"
            title="Open PDF resume"
            href="/Cannizzo.pdf"
            data-astro-reload>
            Portfolio
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
            className,
          )}
          {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
