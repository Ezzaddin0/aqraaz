"use client";
import classNames from "classnames";
import { Button } from "./ui/button";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BetweenHorizontalEndIcon, BoldIcon, Code2Icon, CopyIcon, Heading1Icon, Heading2Icon, Heading3Icon, Heading4Icon, Heading5Icon, Heading6Icon, HeadingIcon, ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon, LucideAlignStartVertical, PlusIcon, QuoteIcon, RedoIcon, SeparatorHorizontalIcon, StrikethroughIcon, TableIcon, TypeIcon, UnderlineIcon, UndoIcon, YoutubeIcon } from "lucide-react";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "./ui/menubar"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";
import ImagesCard from "./ImagesCard";
import { Label } from "./ui/label";

const Toolbar = ({ editor, addImage }) => {
  if (!editor) {
    return null;
  }
  const [media, setMedia] = useState("");
  const [mediaAlt, setMediaAlt] = useState("");


  useEffect(() => {
    if(media) {
      editor.commands.setImage({ src: media, alt: mediaAlt })
    }
  }, [media])



  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
    }
  };

  const [url, setUrl] = useState("")

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor, url]);
  
  const getClassName = (name, active) =>
    classNames({ "bg-gray-100": active, "": !active });

  return (
    <Menubar className="w-full overflow-x-auto p-0">
    <MenubarMenu>
      <MenubarTrigger>
        <LucideAlignStartVertical className="text-gray-500 w-5 h-5" />
      </MenubarTrigger>
      <MenubarContent>
      {[
        { align: "left", icon: <AlignLeftIcon className="w-4 h-4" /> },
        { align: "center", icon: <AlignCenterIcon className="w-4 h-4" /> },
        { align: "right", icon: <AlignRightIcon className="w-4 h-4" /> },
      ].map(({ align, icon }) => (
        <MenubarItem key={align} className={getClassName(align, editor.isActive({ textAlign: align }))} onClick={() => editor.chain().focus().setTextAlign(align).run()}>
          {icon}
        </MenubarItem>
      ))}
      </MenubarContent>
    </MenubarMenu>
    {[
      { format: "bold", method: "toggleBold", icon: <BoldIcon className="w-4 h-4" />, tooltip: "Bold" },
      { format: "italic", method: "toggleItalic", icon: <ItalicIcon className="w-4 h-4" />, tooltip: "Italic" },
      { format: "underline", method: "toggleUnderline", icon: <UnderlineIcon className="w-4 h-4" />, tooltip: "Underline" },
      { format: "strike", method: "toggleStrike", icon: <StrikethroughIcon className="w-4 h-4" />, tooltip: "Strikethrough" },
    ].map(({ format, method, icon, tooltip }) => (
      <Button key={format} className={getClassName(format, editor.isActive(format))} onClick={() => editor.chain().focus()[method]().run()} variant="ghost" size="sm">{icon}</Button>
    ))}
    <Button onClick={() => editor.chain().focus().setParagraph().run()} className={`${getClassName("paragraph", editor.isActive("paragraph"))}`} variant="ghost" size="sm">
      <TypeIcon className="w-5 h-5" />
    </Button>
    <MenubarMenu>
      <MenubarTrigger>
        <HeadingIcon className="w-5 h-5" />
      </MenubarTrigger>
      <MenubarContent>
      {[
        { format: "heading1", icon: <Heading1Icon className="w-5 h-5" /> },
        { format: "heading2", icon: <Heading2Icon className="w-5 h-5" /> },
        { format: "heading3", icon: <Heading3Icon className="w-5 h-5" /> },
        { format: "heading4", icon: <Heading4Icon className="w-5 h-5" /> },
        { format: "heading5", icon: <Heading5Icon className="w-5 h-5" /> },
        { format: "heading6", icon: <Heading6Icon className="w-5 h-5" /> },
      ].map(({ format, icon }, index) => (
        <MenubarItem key={format} className={editor.isActive("heading", { level: index + 1 }) ? "bg-gray-100" : ""} onClick={() => editor.chain().focus().toggleHeading({ level: index + 1 }).run()}>
          {icon}
        </MenubarItem>
      ))}
      </MenubarContent>
    </MenubarMenu>

    <MenubarMenu>
      <MenubarTrigger>
        <ListIcon className="w-5 h-5" />
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem className={editor.isActive("bulletList") ? "bg-gray-100" : ""} onClick={() => editor.chain().focus().toggleBulletList().run()}>
         <ListIcon className="w-5 h-5" />
        </MenubarItem>
        <MenubarItem className={editor.isActive("orderedList") ? "bg-gray-100" : ""} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrderedIcon className="w-5 h-5" />
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>

    <MenubarMenu>
      <MenubarTrigger>
        <PlusIcon className="w-5 h-5" />
      </MenubarTrigger>
      <MenubarContent>
      {[
        { format: "codeBlock", method: "toggleCodeBlock", icon: <Code2Icon className="w-5 h-5 mr-2" />, tooltip: "Code Block" },
        { format: "blockquote", method: "toggleBlockquote", icon: <QuoteIcon className="w-5 h-5 mr-2" />, tooltip: "Blockquote" },
        { format: "HorizontalRule", method: "setHorizontalRule", icon: <SeparatorHorizontalIcon className="w-5 h-5 mr-2" />, tooltip: "Horizontal Rule" },
        { format: "HardBreak", method: "setHardBreak", icon: <BetweenHorizontalEndIcon className="w-5 h-5 mr-2" />, tooltip: "Hard Break" },
      ].map(({ format, method, icon, tooltip }) => (
        <MenubarItem key={format} className={getClassName(format, editor.isActive(format))} onClick={() => editor.chain().focus()[method]().run()}>{icon}</MenubarItem>
      ))}
      </MenubarContent>
    </MenubarMenu>

    <ImagesCard setImage={setMedia} altImage={mediaAlt} setAltImage={setMediaAlt} />
    <Dialog>
      <DialogTrigger asChild>
        <LinkIcon className="w-5 h-5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">Link</Label>
            <Input id="link" value={url} onChange={(e) => setUrl(e.target.value)} defaultValue="https://ui.shadcn.com/docs/installation" />
          </div>
          <Button onClick={setLink} size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Button onClick={addYoutubeVideo} variant="ghost" size="sm">
      <YoutubeIcon className="w-5 h-5" />
    </Button>

    <MenubarMenu>
      <MenubarTrigger>
        <TableIcon className="w-5 h-5" />
      </MenubarTrigger>
      <MenubarContent>
        <MenubarItem onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
          <TableIcon className="w-5 h-5" /> 
          Add Table
        </MenubarItem>

        {[
          { format: "delete Table", method: "deleteTable", icon: <TableIcon className="w-5 h-5 mr-2" />, tooltip: "Delete Table" },
          { format: "add Column", method: "addColumnAfter", icon: <TableIcon className="w-5 h-5 mr-2" />, tooltip: "Add Column" },
          { format: "delete Column", method: "deleteColumn", icon: <TableIcon className="w-5 h-5 mr-2" />, tooltip: "Delete Column" },
          { format: "add Row", method: "addRowAfter", icon: <TableIcon className="w-5 h-5 mr-2" />, tooltip: "Add Row" },
          { format: "delete Row", method: "deleteRow", icon: <TableIcon className="w-5 h-5 mr-2" />, tooltip: "Delete Row" },
          { format: "merge Or Split", method: "mergeOrSplit", icon: <TableIcon className="w-5 h-5 mr-2" />, tooltip: "Merge or Split Cells" },
        ].map(({ format, method, icon, tooltip }) => (
          <MenubarItem key={format} onClick={() => editor.chain().focus()[method]().run()}>
            {icon} {tooltip}
          </MenubarItem>
        ))}
      </MenubarContent>
    </MenubarMenu>

    <div className="flex flex-1 justify-end items-center">
      <Button className="disabled:text-gray-400" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} variant="ghost" size="sm">
        <UndoIcon />
      </Button>
      <Button className="disabled:text-gray-400" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} variant="ghost" size="sm">
        <RedoIcon />
      </Button>
    </div>
  </Menubar>
  );
};

export default Toolbar;