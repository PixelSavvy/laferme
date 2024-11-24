/* eslint-disable import/order */
import { ChevronDown, ShoppingBasket, ShoppingCart, Truck, Users2, VenetianMask } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { paths } from '@/config';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  SidebarSeparator,
} from './sidebar';

/** Type Definitions */
interface SubMenuItem {
  title: string;
  url: string;
}

interface MenuItem {
  title: string;
  icon: React.ComponentType;
  subMenu?: SubMenuItem[];
}

/** Menu Configuration */
const MENU_ITEMS: MenuItem[] = [
  {
    title: 'შეკვეთები',
    icon: ShoppingCart,
    subMenu: [
      {
        title: 'მიმდინარე',
        url: paths.app.orders.path,
      },
      {
        title: 'რეპორტები',
        url: paths.app.orders.path,
      },
    ],
  },
  {
    title: 'სუფთა ზონა',
    icon: VenetianMask,
    subMenu: [
      {
        title: 'მიმდინარე',
        url: paths.app.freezone.path,
      },
      {
        title: 'რეპორტები',
        url: paths.app.freezone.path,
      },
    ],
  },
  {
    title: 'დისტრიბუცია',
    icon: Truck,
    subMenu: [
      {
        title: 'მიმდინარე',
        url: paths.app.distribution.path,
      },
      {
        title: 'რეპორტები',
        url: paths.app.distribution.path,
      },
    ],
  },
];

/** Sidebar Header Component */
const SidebarHeaderComponent: React.FC = () => (
  <SidebarHeader className="flex-row items-center justify-between gap-0 p-0">
    <Avatar className="size-12 bg-neutral-200 md:size-16">
      <AvatarImage />
      <AvatarFallback className="typo-mobile-h4 md:typo-mobile-h3 lg:typo-desktop-h4">გმ</AvatarFallback>
    </Avatar>
    <div className="flex flex-col items-start justify-center">
      <h2 className="typo-paragraph-sm md:typo-paragraph-md">გიორგი მენაბდიშვილი</h2>
      <span className="text-neutral-700 typo-label-xs md:typo-label-sm">გაყიდვების დეპარტამენტი</span>
    </div>
  </SidebarHeader>
);

/** Sidebar Menu Item Component */
interface SidebarMenuItemProps {
  item: MenuItem;
  isOpen: boolean;
  toggle: (title: string) => void;
}

const SidebarMenuItemComponent: React.FC<SidebarMenuItemProps> = ({ item, isOpen, toggle }) => (
  <SidebarMenuItem key={item.title}>
    <Collapsible open={isOpen} onOpenChange={() => toggle(item.title)} className="group/collapsible">
      <CollapsibleTrigger asChild>
        <SidebarMenuButton className="h-12 pl-2 typo-label-md md:pl-3 lg:pl-4">
          <item.icon />
          <span>{item.title}</span>
          <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
        </SidebarMenuButton>
      </CollapsibleTrigger>
      {item.subMenu && (
        <CollapsibleContent>
          <SidebarMenuSub className="mx-6 my-1 gap-0">
            {item.subMenu.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild className="h-8 typo-label-sm">
                  <Link to={subItem.url}>{subItem.title}</Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      )}
    </Collapsible>
  </SidebarMenuItem>
);

/** Main Sidebar Component */
export const AppSidebar: React.FC = () => {
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});

  /** Toggles the open state of a menu item */
  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent className="gap-0 p-6 md:px-6 md:py-8">
        {/* Sidebar Header */}
        <SidebarHeaderComponent />

        {/* Separator */}
        <SidebarSeparator className="my-6" />

        {/* Sidebar Main Content */}
        <SidebarGroup className="gap-4 p-0">
          <SidebarGroupLabel className="text-neutral-700 typo-label-sm">მართვის პანელი</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Render Menu Items */}
              {MENU_ITEMS.map((item) => (
                <SidebarMenuItemComponent
                  key={item.title}
                  item={item}
                  isOpen={openItems[item.title] || false}
                  toggle={toggleItem}
                />
              ))}

              {/* Additional Static Menu Items */}
              <SidebarMenuItem>
                <SidebarMenuButton className="h-12 pl-2 typo-label-md md:pl-3 lg:pl-4" asChild>
                  <Link to={paths.app.customers.path}>
                    <Users2 />
                    <span>კლიენტები</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="h-12 pl-2 typo-label-md md:pl-3 lg:pl-4" asChild>
                  <Link to={paths.app.products.path}>
                    <ShoppingBasket />
                    <span>პროდუქტები</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Separator */}
        <SidebarSeparator className="mt-auto" />

        {/* Sidebar Footer */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="h-12 pl-4 typo-label-md"></SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        {/* Sidebar Rail */}
        <SidebarRail />
      </SidebarContent>
    </Sidebar>
  );
};
