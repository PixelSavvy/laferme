import * as React from 'react';

import { getCookie } from '@/utils';

import { AppSidebar, SIDEBAR_COOKIE_NAME, SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const match = getCookie(SIDEBAR_COOKIE_NAME);
  const defaultOpen = match ? match[2] === 'true' : false;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <div className="container flex h-full flex-col items-center justify-between ">
          <header className="my-8 flex h-16 w-full items-center justify-start gap-4">
            <SidebarTrigger variant={'ghost'} />
          </header>
          <main className="size-full flex-1">{children}</main>
          <footer>sidebar layout footer</footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
