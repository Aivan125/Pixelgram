import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IoMdClose } from "react-icons/io";

const DialogItem = React.forwardRef((props, forwardedRef) => {
  const { triggerChildren, children, onSelect, onOpenChange, ...itemProps } =
    props;

  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <DropdownMenu.Item
          {...itemProps}
          ref={forwardedRef}
          className="DropdownMenuItem"
          onSelect={(event) => {
            event.preventDefault();
            onSelect && onSelect();
          }}
        >
          {triggerChildren}
        </DropdownMenu.Item>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          {children}
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

DialogItem.displayName = "DialogItem";

export default DialogItem;
