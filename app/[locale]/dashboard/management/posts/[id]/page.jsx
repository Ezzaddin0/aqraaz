"use client"
import { Button, buttonVariants } from "../../../../../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../../components/ui/tabs"
import { Input } from "../../../../../../components/ui/input"
import { Label } from "../../../../../../components/ui/label"
import { Textarea } from "../../../../../../components/ui/textarea"
import Tiptap from "../../../../../../components/Tiptap";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../../components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../../../../../components/ui/command";
import { CalendarIcon, Check, ChevronsUpDown, InfoIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { cn } from "../../../../../../lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../../../../firebase";
import useSWR from "swr";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../../../../components/ui/collapsible";
import LoadingScreen from "../../../../../../components/LoadingScreen";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../../../../components/ui/dialog";
import { Calendar } from "../../../../../../components/ui/calendar"
import { Card, CardHeader, CardTitle, CardContent } from "../../../../../../components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../../../../../../components/ui/chart"
import { CartesianGrid, XAxis, BarChart, Bar } from "recharts"
import { format } from "date-fns";
import Image from "next/image";
import ImagesCard from "../../../../../../components/ImagesCard"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../../../../../components/ui/accordion";
import { Badge } from "../../../../../../components/ui/badge"

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  views: {
    label: "views",
    color: "hsl(var(--chart-1))",
  },
  comments: {
    label: "comments",
    color: "hsl(var(--chart-2))",
  },
}

const extractTextFromHtml = (html) => {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

const processText = (text) => {
  const words = text.split(/\s+/).map(word => word.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase());
  const totalWords = words.length;

  const wordCounts = words.reduce((acc, word) => {
    if (word && word.length >= 4) {  // تم إضافة شرط طول الكلمة هنا
      acc[word] = (acc[word] || 0) + 1;
    }
    return acc;
  }, {});

  const wordFrequencies = Object.entries(wordCounts)
    .map(([word, count]) => ({
      word,
      count,
      percentage: (count / totalWords) * 100
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return { wordFrequencies, totalWords, originalText: text };
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

  const [file, setFile] = useState(null);
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

  const [searchImage, setSearchImage] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const [isFormValid, setIsFormValid] = useState(false);

  const [suggestionsTitle, setSuggestionsTitle] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  // const [isLoadingTitle, setIsLoadingTitle] = useState(false);


  const [suggestionsDesc, setSuggestionsDesc] = useState(false);

  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');



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
    const method = postData && postData.id  ? "PUT" : "POST";

    const body = {
      title: { "en": title, "ar": titleAr },
      desc: { "en": desc, "ar": descAr },
      body: {"en": content, "ar": contentAr},
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

  const handleSubmitGPT = async () => {
    const res = await fetch('/api/gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    const data = await res.json();
    if (data.error) {
      setResponse('Error: ' + data.error);
    } else {
      setResponse(data.text);
      console.log(data.text);
      
    }
  };

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

  const words = content.trim().split(/\s+/).length;
  const characters = content.length;
  const paragraphs = content.split(/\n\s*\n/).length;
  const readingTimeMin = Math.floor(words / 275);
  const readingTimeSec = Math.round((words / 275 * 60) % 60);
  const speakingTimeMin = Math.floor(words / 180);
  const speakingTimeSec = Math.round((words / 180 * 60) % 60);

  const { wordFrequencies, totalWords } = useMemo(() => {
    const extractedText = extractTextFromHtml(content);
    return processText(extractedText);
  }, [content]);


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
            <Collapsible
              open={suggestionsTitle}
              onOpenChange={setSuggestionsTitle}
              className="space-y-2"
              onClick={handleSubmitGPT}
            >
              <div className="flex items-center justify-between space-x-4">
                <h4 className="text-sm font-semibold">
                  Suggestions from AI
                </h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              {/* <div className="rounded-md border px-4 py-3 font-mono text-sm">
                @radix-ui/primitives
              </div> */}
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                  @radix-ui/colors
                </div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                  @stitches/react
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug" />
            <Button onClick={handleCreateSlug} variant="outline">Create</Button>

            <Textarea onChange={(e) => setDesc(e.target.value)} value={desc} placeholder="Description" />
            <Collapsible
              open={suggestionsDesc}
              onOpenChange={setSuggestionsDesc}
              className="space-y-2"
            >
              <div className="flex items-center justify-between space-x-4">
                <h4 className="text-sm font-semibold">
                  Suggestions from AI
                </h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              {/* <div className="rounded-md border px-4 py-3 font-mono text-sm">
                @radix-ui/primitives
              </div> */}
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                  @radix-ui/colors
                </div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                  @stitches/react
                </div>
              </CollapsibleContent>
            </Collapsible>

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
                          <Check className={cn("mr-2 h-4 w-4",valueCategory === category.slug ? "opacity-100" : "opacity-0")} />
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
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Label htmlFor="image">Main Image</Label>
            {/* <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open Image Dialog</Button>
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
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
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
                  <TabsContent value="gallery" className="py-1">
                  <Input className="col-3 form-control-sm py-1 my-2 fs-4 text-capitalize border border-3 border-dark" type="text" placeholder="Search Anything..." onChange={handleSearch} />
                    <div class="grid gap-4 h-[300px] overflow-auto">
                        <div class="grid grid-cols-3 gap-4">
                          {searchImage && searchImage.map((photo) => (
                            <div>
                              <Image id={photo.id} width={photo.width} height={photo.height}  className="h-auto max-w-full rounded-lg cursor-pointer" src={photo.urls.regular} alt={photo.alt_description} onClick={() => handleImageSelect(photo.urls.regular)} />
                            </div>
                          ))}
                        </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <DialogFooter>
                  <div>
                    <Button variant="outline">Close</Button>
                  </div>
                  <Button>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog> */}
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
          <Collapsible open={suggestionsTitle} onOpenChange={setSuggestionsTitle} className="mt-2" >
              <div className="flex items-center justify-between space-x-4">
                <h4 className="text-sm font-semibold">
                  اقتراحات من الذكاء الاصطناعي
                </h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              {/* <div className="rounded-md border px-4 py-3 font-mono text-sm">
                @radix-ui/primitives
              </div> */}
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                  @radix-ui/colors
                </div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                  @stitches/react
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Textarea onChange={(e) => setDescAr(e.target.value)} value={descAr} placeholder="الوصف" />
            <Collapsible open={suggestionsDesc}onOpenChange={setSuggestionsDesc} className="space-y-2">
              <div className="flex items-center justify-between space-x-4">
                <h4 className="text-sm font-semibold">
                اقتراحات من الذكاء الاصطناعي
                </h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    <ChevronsUpDown className="h-4 w-4" />
                    <span className="sr-only">Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              {/* <div className="rounded-md border px-4 py-3 font-mono text-sm">
                @radix-ui/primitives
              </div> */}
              <CollapsibleContent className="space-y-2">
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                  @radix-ui/colors
                </div>
                <div className="rounded-md border px-4 py-3 font-mono text-sm">
                  @stitches/react
                </div>
              </CollapsibleContent>
            </Collapsible>

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
          {/* <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
              <div className="grid flex-1 gap-1 text-center sm:text-left">
                <CardTitle>Area Chart</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={postData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="createdAt"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="views" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="comments" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
            </CardContent>
          </Card> */}
          <Accordion type="multiple" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger><div className="flex items-center gap-3"><InfoIcon className="w-5 h-5"/> Details</div></AccordionTrigger>
              <AccordionContent>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center justify-between border-b py-1">
                  {params.locale === 'en' ? 'Words' : 'الكلمات'} <Badge variant="outline">{words}</Badge>
                </li>
                <li className="flex items-center justify-between border-b py-1">
                  {params.locale === 'en' ? 'Characters' : 'الحروف'} <Badge variant="outline">{characters}</Badge>
                </li>
                <li className="flex items-center justify-between border-b py-1">
                  {params.locale === 'en' ? 'paragraphs' : 'الفقرات' } <Badge variant="outline">{paragraphs}</Badge>
                </li>
                <li className="flex items-center justify-between border-b py-1">
                  {params.locale === 'en' ? 'Reading Time' : 'وقت القراءة' } <Badge variant="outline">{`${readingTimeMin} دقيقة ${readingTimeSec} ثانية`}</Badge>
                </li>
                <li className="flex items-center justify-between py-1">
                {params.locale === 'en' ? 'Speaking Time' : 'وقت التحدث' } <Badge variant="outline">{`${speakingTimeMin} دقيقة ${speakingTimeSec} ثانية`}</Badge>
                </li>
              </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Keywords list</AccordionTrigger>
              <AccordionContent>
              <ul className="flex flex-col gap-2">
              {wordFrequencies.map(({ word, count, percentage }) => (
                <li key={word} className="flex items-center justify-between border-b py-1">
                  <span className="font-semibold">{word}</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{count} ({percentage.toFixed(2)}%)</Badge>
                  </div>
                </li>
              ))}
              </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}