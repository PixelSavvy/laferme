import { MoreVertical, Printer, Sheet } from 'lucide-react';

import { Button } from '../button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../dropdown-menu';

export const AppTableCellAction = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="size-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="p-2"
        side="bottom"
        sideOffset={4}
      >
        <DropdownMenuItem className="p-0">
          <Button variant={'ghost'}>
            <Printer />
            <span>ამობეჭდვა</span>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="w-full p-0">
          <Button variant={'ghost'} className="w-full px-2">
            <Sheet />
            <span>გაექსელება</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
