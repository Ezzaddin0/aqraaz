"use client";
import { useState, useEffect, useCallback } from "react";
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "./Toolbar";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import CharacterCount from "@tiptap/extension-character-count";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import Youtube from "@tiptap/extension-youtube";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Button } from "./ui/button";
import { BoldIcon, Heading1Icon, Heading2Icon, ItalicIcon, ListIcon, UnderlineIcon } from "lucide-react";

const Tiptap = ({ onChange, content, dir }) => {
  const handleChange = (newContent) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Start typing..." }),
      CharacterCount,
      Dropcursor,
      Image.configure({
        HTMLAttributes: {
          class: 'w-full my-8 aspect-video rounded-xl bg-gray-50 dark:bg-gray-950 object-cover border border-gray-200/60 dark:border-gray-700/60',
        },
      }),
      Link.configure({ openOnClick: false, autolink: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Underline,
      Heading.configure({ levels: [1, 2] }),
      Youtube.configure({ controls: true, autoplay: false })
    ],
    content: content,
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  const percentage = editor ? Math.round((100 / 1200) * editor.storage.characterCount.characters()) : 0
    
  if (!editor) {
    return null
  }
  return (
    <div className="w-full flex flex-col pt-1 border-r">
      <div className="py-1 px-2 flex shadow items-center bg-gray-100/35">
        <Toolbar editor={editor} />
      </div>
      <div className="flex flex-col h-full">
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          {/* <ToggleGroup  type="multiple">
            <ToggleGroupItem value="bold" onClick={() => editor.chain().focus().toggleBold().run()} aria-label="Toggle bold">
              <BoldIcon className="w-5 h-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" onClick={() => editor.chain().focus().toggleItalic().run()} aria-label="Toggle italic">
              <ItalicIcon className="w-5 h-5" />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" onClick={() => editor.chain().focus().toggleUnderline().run()} aria-label="Toggle underline">
              <UnderlineIcon className="w-5 h-5" />
            </ToggleGroupItem>
          </ToggleGroup> */}
          <div className="flex items-center gap-0.5">
            <Button onClick={() => editor.chain().focus().toggleBold().run()} aria-label="Toggle bold" variant="outline" size="icon">
              <BoldIcon className="w-5 h-5" />
            </Button>
            <Button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} aria-label="Toggle Heading" variant="outline" size="icon">
             <Heading1Icon className="w-5 h-5" />
            </Button>
            <Button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} aria-label="Toggle Heading" variant="outline" size="icon">
              <Heading2Icon className="w-5 h-5" />
            </Button>
            <Button onClick={() => editor.chain().focus().toggleBulletList().run()} aria-label="Toggle List" variant="outline" size="icon">
              <ListIcon className="w-5 h-5" />
            </Button>
          </div>
        </BubbleMenu>

        {/* <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <Button size="icon" variant="outline" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
            <Heading1Icon className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="outline" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
            <Heading2Icon className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="outline" onClick={() => editor.chain().focus().toggleBulletList().run()}>
            <ListIcon className="w-5 h-5" />
          </Button>
        </FloatingMenu> */}
        
        <div className="flex-1 border">
          <EditorContent dir={dir} className="h-full max-h-screen overflow-auto" editor={editor} />
        </div>
        <div className="character-count bg-gray-100/35 shadow">
          <div className={`items-center text-gray-400 flex text-xs gap-2 m-6 ${editor.storage.characterCount.characters() > 1200 ? 'text-red-600' : ''}`}>
          <svg height="20" width="20" viewBox="0 0 20 20" className={`${editor.storage.characterCount.characters() > 1200 ? 'text-red-600' : 'text-purple-500'}`}>
            <circle r="10" cx="10" cy="10" fill="#e9ecef" />
            <circle r="5" cx="10" cy="10" fill="transparent" stroke="currentColor" strokeWidth="10" strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`} transform="rotate(-90) translate(-20)" />
            <circle r="6" cx="10" cy="10" fill="white" />
          </svg>

          {editor.storage.characterCount.characters()} / {1200} characters
          <br />
          {editor.storage.characterCount.words()} words
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tiptap;