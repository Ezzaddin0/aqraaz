"use client"
import { Button, buttonVariants } from "../../../../../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../../components/ui/tabs"
import { Input } from "../../../../../../components/ui/input"
import { Label } from "../../../../../../components/ui/label"
import { Textarea } from "../../../../../../components/ui/textarea"
import Tiptap from "../../../../../../components/Tiptap";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../../components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../../../../../components/ui/command";
import { CalendarIcon, Check, ChevronsUpDown, UploadCloudIcon, XIcon } from "lucide-react";
import { cn } from "../../../../../../lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const storage = getStorage(app);

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

      setValueCategory(postData?.catSlug || "");
    }
  }, [postData]);

  const [suggestionsTitle, setSuggestionsTitle] = useState(false);
  const [suggestionsDesc, setSuggestionsDesc] = useState(false);

  const [timeRange, setTimeRange] = useState("90d");

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
          <Tiptap content={contentAr} onChange={(newContent) => handleContentChangeAr(newContent)} />
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
          <div className="flex flex-col items-center gap-2">
            <Input type="text" placeholder="Main Keywords" />
            <Button className="w-full" variant="outline">Ganertate</Button>
          </div>
          <div className="box">
            <div className="flex items-center">
              <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            </div>
            <Collapsible
              open={suggestionsTitle}
              onOpenChange={setSuggestionsTitle}
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
          </div>

          <div className="box flex flex-col gap-2">
            <Input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug" />
            <Button onClick={handleCreateSlug} variant="outline">Create</Button>
          </div>
          
          <div className="box flex flex-col gap-2">
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
          </div>

          <div className="border p-2 rounded w-full max-w-lg">
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

          <div className="flex flex-col gap-2">
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
            <Link href="/dashboard/management/categories/new" className={buttonVariants({ variant: "outline" })}>Create</Link>
          </div>

          <div className="flex w-full flex-col gap-2">
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
          </div>

          <div>
            <Label htmlFor="image">Main Image</Label>
            {/* <Input type="file" id="image" onChange={(e) => setFile(e.target.files[0])} /> */}
          </div>
          <Dialog>
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

          <Button className="mb-3" variant="outline" onClick={handleSubmit}>Publish</Button>
        </TabsContent>

        <TabsContent dir="rtl" className="flex flex-col gap-2" value="arabic">
        <div className="box">
            <div className="flex items-center">
              <Input type="text" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} placeholder="العنوان" />
            </div>
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
          </div>
          <div className="box flex flex-col gap-2">
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
          </div>

          <div className="border p-2 rounded w-full max-w-lg">
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
          
          <div>
            <Label htmlFor="picture">صورة</Label>
            <Input id="picture" type="file" />
          </div>
        </TabsContent>
        <TabsContent value="analysis">
          <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
              <div className="grid flex-1 gap-1 text-center sm:text-left">
                <CardTitle>Area Chart</CardTitle>
                {/* <CardDescription>Showing total visitors for the last 3 months</CardDescription> */}
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
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}