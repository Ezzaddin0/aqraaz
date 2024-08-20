"use client"
import { Button, buttonVariants } from "../../../../../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../../components/ui/tabs"
import { Input } from "../../../../../../components/ui/input"
import { Label } from "../../../../../../components/ui/label"
import { Textarea } from "../../../../../../components/ui/textarea"
import Tiptap from "../../../../../../components/Tiptap";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../../components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../../../../../components/ui/command";
import { CalendarIcon, Check, ChevronsUpDown, XIcon } from "lucide-react";
import { cn } from "../../../../../../lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import LoadingScreen from "../../../../../../components/LoadingScreen";
import Link from "next/link";
import { Calendar } from "../../../../../../components/ui/calendar"
import { format } from "date-fns";
import Image from "next/image";
import ImagesCard from "../../../../../../components/ImagesCard"


const fetcher = async (url) => {
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
  const { data, isLoading } = useSWR(
    `/api/categories`,
    fetcher
  );
  const { data: postData } = useSWR(
    params.id ? `/api/posts/${params.id}` : null,
    fetcher
  );
  const [content, setContent] = useState('')
  const handleContentChange = (reason) => {
    setContent(reason)
  }
  const [contentAr, setContentAr] = useState('')
  const handleContentChangeAr = (reason) => {
    setContentAr(reason)
  }
  const [openCategory, setOpenCategory] = useState(false)
  const [valueCategory, setValueCategory] = useState("")
  const [media, setMedia] = useState("");
  const [mediaAlt, setMediaAlt] = useState("");
  const [title, setTitle] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [desc, setDesc] = useState("");
  const [descAr, setDescAr] = useState("");
  const [slug, setSlug] = useState(""); // new
  const [inputValue, setInputValue] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [inputValueAr, setInputValueAr] = useState('');
  const [keywordsAr, setKeywordsAr] = useState([]);
  const [date, setDate] = useState(new Date());
  const [isFormValid, setIsFormValid] = useState(false);
  const [suggestionsTitle, setSuggestionsTitle] = useState(false);
  const [suggestionsDesc, setSuggestionsDesc] = useState(false);
  useEffect(() => {
    if (postData) {
      setTitle(postData?.title?.en || "");
      setTitleAr(postData?.title?.ar || "");
      setContent(postData?.body?.en || "");
      setContentAr(postData?.body?.ar || "");
      setSlug(postData?.slug || "");
      setMedia(postData?.img || "");
      setDesc(postData?.desc?.en || "");
      setDescAr(postData?.desc?.ar || "");
      setKeywords(postData?.keywords?.en || []);
      setKeywordsAr(postData?.keywords?.ar || []);
      setDate(postData?.createdAt || new Date());
      setValueCategory(postData?.catSlug || "");
    }
  }, [postData]);
  useEffect(() => {
    if (title && titleAr && desc && descAr && slug && valueCategory) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [title, titleAr, desc, descAr, slug, valueCategory]);
  
  const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  const handleCreateSlug = () => {
    if (title) {
      setSlug(slugify(title));
    }
  }
  const handleSubmit = async () => {
    const method = postData && postData.id ? "PUT" : "POST";
    const body = {
      title: { "en": title, "ar": titleAr },
      desc: { "en": desc, "ar": descAr },
      body: { "en": content, "ar": contentAr },
      keywords: { "en": keywords, "ar": keywordsAr },
      img: media,
      slug: slug || (postData && postData.slug),
      catSlug: valueCategory, //If not selected, choose the general category
      createdAt: date,
    }

    if (method === "PUT" && postData.id) {
      body.id = postData.id;
    }
    const res = await fetch(`/api/posts`, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    });
    if (res.status === 200) {
      const data = await res.json();
      router.push(`/dashboard/management/posts`);
    }
  };
  // const handleSubmitGPT = async () => {
  //   const res = await fetch('/api/gpt', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ title }),
  //   });
  //   const data = await res.json();
  //   if (data.error) {
  //     setResponse('Error: ' + data.error);
  //   } else {
  //     setResponse(data.text);
  //   }
  // };
  if (isLoading) {
    return <LoadingScreen />
  }
  if (status === "loading") {
    return <LoadingScreen />;
  }
  if (status === "unauthenticated") {
    router.push("/");
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setKeywords([...keywords, inputValue.trim()]);
      setInputValue('');
    }
  };
  const handleRemoveBadge = (indexToRemove) => {
    setKeywords(keywords.filter((_, index) => index !== indexToRemove));
  };
  const handleKeyDownAr = (e) => {
    if (e.key === 'Enter' && inputValueAr.trim() !== '') {
      setKeywordsAr([...keywordsAr, inputValueAr.trim()]);
      setInputValueAr('');
    }
  };
  const handleRemoveBadgeAr = (indexToRemove) => {
    setKeywordsAr(keywordsAr.filter((_, index) => index !== indexToRemove));
  };
  return (
    <div className="flex flex-col md:flex-row gap-3 min-h-screen pt-4">
      <Tabs className="w-full" defaultValue="english">
        <TabsList>
          <TabsTrigger value="english">En</TabsTrigger>
          <TabsTrigger value="arabic">Ar</TabsTrigger>
        </TabsList>
        <TabsContent value="english">
          <Tiptap content={content} onChange={(newContent) => handleContentChange(newContent)} />
        </TabsContent>
        <TabsContent value="arabic">
          <Tiptap content={contentAr} dir="rtl" onChange={(newContent) => handleContentChangeAr(newContent)} />
        </TabsContent>
      </Tabs>

      {/* Right side */}
      <div className=" md:w-5/12">
        <Tabs defaultValue="english">
          <TabsList>
            <TabsTrigger value="english">English</TabsTrigger>
            <TabsTrigger value="arabic">Arabic</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          <TabsContent className="flex flex-col gap-4" value="english">
            <div className="grid w-full gap-2">
              <Input type="text" placeholder="Main Keywords" />
              <Button className="w-full" variant="outline">Ganertate</Button>
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
      
              <Input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug" />
              <Button onClick={handleCreateSlug} variant="outline">Create</Button>
              <Textarea onChange={(e) => setDesc(e.target.value)} value={desc} placeholder="Description" />

              <div className="border p-2 rounded w-full">
                <div className="flex flex-wrap gap-2">
                  {keywords.map((badge, index) => (
                    <div key={index} className="flex items-center bg-gray-200 text-gray-700 rounded-full px-3 py-1">
                      {badge}
                      <XIcon onClick={() => handleRemoveBadge(index)} className="h-4 w-4 cursor-pointer ml-2 focus:outline-none text-gray-500" />
                    </div>
                  ))}
                  <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Type something and press Enter" className="flex-grow p-2 focus:outline-none" />
                </div>
              </div>
              <Popover open={openCategory} onOpenChange={setOpenCategory}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={openCategory} className="justify-between w-full">
                    {valueCategory ? data.find((category) => category.slug === valueCategory)?.title.en : "Select Category..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full px-0 py-1">
                  <Command>
                    <CommandInput placeholder="Search Category..." />
                    <CommandList>
                      <CommandEmpty>No Category found.</CommandEmpty>
                      <CommandGroup>
                        {isLoading ? "Loading..." : data.map((category) => (
                          <CommandItem key={category.id} value={category.slug}
                            onSelect={(currentValue) => {
                              setValueCategory(currentValue);
                              setOpenCategory(false);
                            }}>
                            <Check className={cn("mr-2 h-4 w-4", valueCategory === category.slug ? "opacity-100" : "opacity-0")} />
                            {category.title.en}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <Link href="/dashboard/management/categories/new" target="_blank" className={buttonVariants({ variant: "outline" })}>Create</Link>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>

              <Label htmlFor="image">Main Image</Label>
              {media && (
              <div className="border w-full">
                <Image width={280} height={100} src={media} alt="photo" className="w-full max-h-40 object-cover" />
              </div>
              )}
              <ImagesCard altImage={mediaAlt} setAltImage={setMediaAlt} setImage={setMedia} />

              <Button className="mb-3" variant="outline" onClick={handleSubmit} disabled={!isFormValid}>Publish</Button>
            </div>
          </TabsContent>
          <TabsContent dir="rtl" className="flex flex-col gap-2" value="arabic">
            <div className="grid w-full gap-2">
              <Input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} placeholder="العنوان" />

              <div className="border p-2 rounded w-full">
                <div className="flex flex-wrap gap-2">
                  {keywordsAr.map((badge, index) => (
                    <div key={index} className="flex items-center bg-gray-200 text-gray-700 rounded-full px-3 py-1">
                      {badge}
                      <XIcon onClick={() => handleRemoveBadgeAr(index)} className="h-4 w-4 cursor-pointer ml-2 focus:outline-none text-gray-500" />
                    </div>
                  ))}
                  <input type="text" value={inputValueAr} onChange={(e) => setInputValueAr(e.target.value)} onKeyDown={handleKeyDownAr} placeholder="اكتب شي وضغط حسنا" className="flex-grow p-2 focus:outline-none" />
                </div>
              </div>
              <Label htmlFor="picture">صورة</Label>
              <Input id="picture" type="file" />
            </div>
          </TabsContent>
          <TabsContent value="analysis">
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}