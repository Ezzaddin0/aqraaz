"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PenLine, Bold, Italic, List, Save, Send, MoreHorizontal, Undo, Redo, Underline, CalendarIcon, ChevronsUpDown, Check, Upload, Search, Wand2, X } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Tiptap from "@/components/Tiptap";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import LoadingScreen from "@/components/LoadingScreen";
import useSWR from "swr";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
// import ImageUploadDialog from "@/components/image-upload-dialog"
import ImagesCard from "@/components/ImagesCard";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
const languages = ["English", "Arabic"];

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }  
  return data.documents;
};

const fetcherPost = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }  
  return data;
};

export default function Page({ params }) {
  const { status } = useSession();
  const router = useRouter();

  const { data: postData, isLoadingPost, errorPost } = useSWR(
    `/api/posts/${params.id}`,
    fetcherPost
  );

  const [title, setTitle] = useState({ en: "" });
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState({ en: "" });
  const [image, setImage] = useState("");
  const [mediaAlt, setMediaAlt] = useState("");
  const [keywords, setKeywords] = useState({ en: "" });
  const [content, setContent] = useState({ en: "" });

  const [open, setOpen] = useState(false)
  const [category, setCategory] = useState("");

  const [date, setDate] = useState();
  const [currentLang, setCurrentLang] = useState("en");
  const [useAI, setUseAI] = useState(false);

  useEffect(() => {
    // Ensure postData is available before trying to access its properties
    if (postData) {
      setTitle(postData.title || { en: "" });
      setSlug(postData.slug || "");
      setDescription(postData.desc || { en: "" });
      setImage(postData.img || "");
      setKeywords(postData.keywords || { en: "" });
      setContent(postData.body || { en: "" });
      setCategory(postData.category || "");
      setDate(postData.date || new Date());
    }
  }, [postData]);

  const { data: categories, isLoading, error } = useSWR(
    `/api/categories?fields=title,slug`,
    fetcher
  );
  
  if (isLoading) {
    return <LoadingScreen />;
  }
  
  if (error) {
    return <div>Error loading categories</div>;
  }
  
  if (isLoadingPost) {
    return <LoadingScreen />;
  }
  
  if (errorPost) {
    return <div>Error loading categories</div>;
  }

  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const handleCreateSlug = () => {
    if (title["en"]) {
      setSlug(slugify(title["en"]));
    }
  }

  const handleCreateProfessionalArticle = () => {
    console.log("Creating professional article...");
  };

  const handleSave = () => {
    console.log("Saving draft...");
  };

  const handlePublish = async (e) => {

    const isUpdate = postData && postData._id;

    const articleData = {
      ...(isUpdate && { _id: postData._id }), // Conditionally add _id if updating
      title: title,
      slug: slug,
      desc: description,
      img: image,
      keywords: keywords,
      body: content,
      catSlug: category,
      createdAt: date,  // Format the date or use null if not set
      // useAI: useAI
    };

    const response = await fetch("/api/posts", {
      method: isUpdate ? "PUT" : "POST", // Use PUT for updating, POST for new
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });

    if (response.ok) {
      // setTitle("");
      // setContent("");
      alert("Post added successfully!");
    } else {
      alert("Failed to add post");
    }
  
    // console.log("Publishing article:", JSON.stringify(articleData, null, 2));
  };

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    if (!content[lang]) {
      setContent({ ...content, [lang]: "" });
    }
    if (!title[lang]) {
      setTitle({ ...title, [lang]: "" });
    }
    if (!description[lang]) {
      setDescription({ ...description, [lang]: "" });
    }
    if (!keywords[lang]) {
      setKeywords({ ...keywords, [lang]: "" });
    }
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  const handleTiptapChange = (newContent) => {
    setContent({ ...content, [currentLang]: newContent });
  };
  
  // if (status === "loading") {
  //   return <LoadingScreen />;
  // }
  // if (status === "unauthenticated") {
  //   router.push("/");
  // }
  return (
    <div className="flex flex-col bg-background">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold">Article Editor</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={handlePublish}>
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Main content area */}
        <div className="flex-1 h-full flex flex-col pr-2 overflow-auto">
          {/* Editor area */}
          <Tiptap content={content[currentLang] || ""} onChange={handleTiptapChange} />
        </div>

        {/* Sidebar */}
        <div className="w-96 border-l p-2">
          <Tabs defaultValue="content">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="space-y-4">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={currentLang} onValueChange={handleLanguageChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang.toLowerCase().slice(0, 2)}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={title[currentLang] || ""} onChange={(e) => setTitle({ ...title, [currentLang]: e.target.value })} placeholder="Enter article title" />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={slug || ""} onChange={(e) => setSlug(e.target.value)} placeholder="Enter article slug" />
                <Button className="w-full mt-1" onClick={handleCreateSlug} variant="outline">Create</Button>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={description[currentLang] || ""} onChange={(e) => setDescription({ ...description, [currentLang]: e.target.value })} placeholder="Enter article description" />
              </div>
              <div className="grid w-full">
                {/* <ImageUploadDialog setImage={setImage} /> */}
                <ImagesCard altImage={mediaAlt} setAltImage={setMediaAlt} setImage={setImage} />
              </div>
              <div>
                <Label htmlFor="keywords">Keywords</Label>
                <Input id="keywords" value={keywords[currentLang] || ""} onChange={(e) => setKeywords({ ...keywords, [currentLang]: e.target.value })} placeholder="Enter keywords, separated by commas" />
              </div>
              <div>
                <Label htmlFor="language">Category</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox"aria-expanded={open} className="w-full justify-between">
                      {category ? categories.find((cate) => cate.slug === category)?.title.en : "Select Categories..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search Categories..." />
                      <CommandList>
                        <CommandEmpty>No Categories found.</CommandEmpty>
                        <CommandGroup>
                          {categories.map((cate) => (
                            <CommandItem key={cate.slug} value={cate.slug}
                              onSelect={(currentValue) => {
                                setCategory(currentValue === category ? "" : currentValue)
                                setOpen(false)
                              }}
                            >
                              <Check className={cn( "mr-2 h-4 w-4", category === cate.slug ? "opacity-100" : "opacity-0" )} />
                              {cate.title.en}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="language">CreatedAt</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="useAI" checked={useAI} onCheckedChange={(checked) => setUseAI(checked)} />
                <Label htmlFor="useAI">Use AI assistance</Label>
              </div>
              <Button type="button" className="w-full" onClick={handleCreateProfessionalArticle}>
                <PenLine className="mr-2 h-4 w-4" />
                Create Professional Article
              </Button>
            </TabsContent>
            <TabsContent value="analysis">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Content Analysis</h3>
                <p>Word count: {(content[currentLang] || "").split(/\s+/).filter(Boolean).length}</p>
                <p>Character count: {(content[currentLang] || "").length}</p>
                <p>Estimated read time: {Math.ceil((content[currentLang] || "").split(/\s+/).filter(Boolean).length / 200)} minutes</p>
                <p>Keyword density: Coming soon</p>
                <p>Readability score: Coming soon</p>
                <p>SEO score: Coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}