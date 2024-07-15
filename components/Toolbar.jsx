"use client";
import classNames from "classnames";
import { Button } from "./ui/button";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon, BetweenHorizontalEndIcon, BoldIcon, Code2Icon, Heading1Icon, Heading2Icon, Heading3Icon, Heading4Icon, Heading5Icon, Heading6Icon, HeadingIcon, ImageIcon, ItalicIcon, LinkIcon, ListIcon, ListOrderedIcon, LucideAlignStartVertical, PlusIcon, QuoteIcon, RedoIcon, SeparatorHorizontalIcon, StrikethroughIcon, TableIcon, TypeIcon, UnderlineIcon, UndoIcon, UploadCloudIcon, XIcon, YoutubeIcon } from "lucide-react";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger} from "./ui/menubar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../app/firebase";
import { Input } from "./ui/input";
import LoadingScreen from "./LoadingScreen";

const storage = getStorage(app);


const Toolbar = ({ editor, addImage, setLink }) => {
  if (!editor) {
    return null;
  }
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [searchImage, setSearchImage] = useState("");

  useEffect(() => {
    if(media) {
      editor.commands.setImage({ src: media })
    }
  }, [media])


  const fetchImageAsFile = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], "image_from_url.jpg", { type: blob.type });
    return file;
  };
  useEffect(() => {
    const upload = (fileToUpload) => {
      const name = new Date().getTime() + fileToUpload.name;
      const storageRef = ref(storage, name);
      const uploadTask = uploadBytesResumable(storageRef, fileToUpload);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    const handleUpload = async () => {
      if (file) {
        upload(file);
      } else if (searchImage) {
        const fileFromUrl = await fetchImageAsFile(searchImage);
        upload(fileFromUrl);
      }
    };

    handleUpload();
  }, [file, searchImage]);



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

  const getClassName = (name, active) =>
    classNames({ "bg-gray-100": active, "": !active });

  return (
    <Menubar className="w-full overflow-auto">
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

    {/* <Button onClick={addImage} variant="ghost" size="sm">
      <ImageIcon className="w-5 h-5" />
    </Button> */}
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" >
          <ImageIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Image Management</DialogTitle>
          <DialogDescription>Manage your images in this dialog.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="upload" className="border-b space-y-4">
          <TabsList className="grid grid-cols-3 gap-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="link">Link</TabsTrigger>
            {/* <TabsTrigger value="gallery">Gallery</TabsTrigger> */}
          </TabsList>
          <TabsContent value="upload" className="py-2">
          <div class="flex items-center justify-center w-full">
            <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
            {file ? 
              media ? <div className="w-full h-full"><img src={media} className="w-full h-full aspect-video" alt="" /> <p className="flex items-center">{file.name} <XIcon className="h-4 w-4 cursor-pointer ml-2 focus:outline-none text-gray-500" onClick={() => {setFile(null); setMedia("")}} /></p></div>  : <LoadingScreen />
            :
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <UploadCloudIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
            }
              <input id="dropzone-file" type="file" onChange={(e) => setFile(e.target.files[0])} class="hidden" />
            </label>
        </div> 
          </TabsContent>
          <TabsContent value="link" className="py-6">
          <div className="grid items-center gap-2">
            <Input className="w-full" type="text" value={searchImage} onChange={(e) => setSearchImage(e.target.value)} id="email" placeholder="Search..." />
            <img
              src={searchImage || "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"}
              alt="Photo by Drew Beamer"
              fill
              className="rounded-md object-cover aspect-video"
            />
          </div>
          </TabsContent>
          {/* <TabsContent value="gallery" className="py-1">
          <Input className="col-3 form-control-sm py-1 fs-4 text-capitalize border border-3 border-dark" type="text" placeholder="Search Anything..." value={img} onChange={(e) => setImg(e.target.value)} />;
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 h-[300px] overflow-auto">
                <div class="grid gap-4">
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg" alt="" />
                    </div>
                </div>
                <div class="grid gap-4">
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg" alt="" />
                    </div>
                </div>
                <div class="grid gap-4">
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg" alt="" />
                    </div>
                </div>
                <div class="grid gap-4">
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg" alt="" />
                    </div>
                    <div>
                        <img class="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg" alt="" />
                    </div>
                </div>
            </div>
          </TabsContent> */}
        </Tabs>
        <DialogFooter>
          <div>
            <Button variant="outline">Close</Button>
          </div>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <Button onClick={setLink} variant="ghost" size="sm">
      <LinkIcon className="w-5 h-5" />
    </Button>
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