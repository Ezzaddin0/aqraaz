"use client"
import { Button } from "../../../../../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../../components/ui/tabs"
import { Input } from "../../../../../../components/ui/input"
import { Label } from "../../../../../../components/ui/label"
import { Textarea } from "../../../../../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../../../components/ui/select"
import { ChevronsUpDown, File, UploadCloudIcon, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../../../../../firebase";
import { Card, CardContent, CardHeader, CardTitle } from "../../../../../../components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../../../../../../components/ui/collapsible"
import { ResponsivePie } from "@nivo/pie"
import useSWR from "swr";
import DataTable  from "../../../../../../components/data-table"
import { CategoryColumns } from "../../../../../../helper/column-table"
import LoadingScreen from "../../../../../../components/LoadingScreen";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../../../../components/ui/dialog";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../../../../../../components/ui/chart"
import { AreaChart, CartesianGrid, XAxis, Area } from "recharts"

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

// const fetcher = async (url) => {
//   const res = await fetch(url, {
//     include: {
//       posts: {
//         include: {
//           views: true,
//           comments: true
//         }
//       },
//     },
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     const error = new Error(data.message);
//     throw error;
//   }

//   return data;
// };

// const fetcher = (...args) => fetch(...args).then(res => res.json())

const storage = getStorage(app);

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  posts: {
    label: "posts",
    color: "hsl(var(--chart-1))",
  },
  views: {
    label: "views",
    color: "hsl(var(--chart-2))",
  },
  comments: {
    label: "comments",
    color: "hsl(var(--chart-3))",
  },
}

export default function Page({ params }) {
  const { status } = useSession();
  const router = useRouter();  

  const includeParam = JSON.stringify({
    posts: {
      include: {
        views: true,
        comments: true,
      },
    },
  });

  const { data: categoryData, isLoading } = useSWR(
    params.id ? `https://www.aqraaz.com/api/categories?slug=news&include=${encodeURIComponent(includeParam)}` : null,
    fetcher
  );  

  const [timeRange, setTimeRange] = useState("90d");

  const [suggestionsTitle, setSuggestionsTitle] = useState(false);
  const [suggestionsDesc, setSuggestionsDesc] = useState(false);

  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [title, setTitle] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [slug, setSlug] = useState("");
  const [desc, setDesc] = useState("");
  const [descAr, setDescAr] = useState("");
  const [inputValue, setInputValue] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [inputValueAr, setInputValueAr] = useState('');
  const [keywordsAr, setKeywordsAr] = useState([]);

  const [searchImage, setSearchImage] = useState("");


  useEffect(() => {
    if (categoryData && categoryData.length > 0) {
      setTitle(categoryData[0].title.en || "");
      setTitleAr(categoryData[0].title.ar || "");
      setSlug(categoryData[0].slug || "");
      setMedia(categoryData[0].img || "");
      setDesc(categoryData[0].desc.en || "");
      setDescAr(categoryData[0].desc.ar || "");
      setKeywords(categoryData[0].keywords.en || []);
      setKeywordsAr(categoryData[0].keywords.ar || []);
    }
  }, [categoryData]);

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
    const method = categoryData && categoryData.length > 0 ? "PUT" : "POST";

    const body = {
      title: { "en": title, "ar": titleAr },
      slug: slug || (categoryData[0] && categoryData[0].slug),
      desc: { "en": desc, "ar": descAr },
      img: media,
      keywords: { "en": keywords, "ar": keywordsAr },
    };
  
    if (method === "PUT" && categoryData[0]?.id) {
      body.id = categoryData[0].id;
    }

    const res = await fetch(`/api/categories`, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/dashboard/management/categories`);
    }
  };

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

  if (isLoading) {
    return <LoadingScreen />;
  }
  

  // const filteredData = categoryData[0]?.posts.filter((item) => {
  //   const date = new Date(item.createdAt);
  //   const now = new Date();
  //   let daysToSubtract = 90;
  //   if (timeRange === "30d") {
  //     daysToSubtract = 30;
  //   } else if (timeRange === "7d") {
  //     daysToSubtract = 7;
  //   }
  //   now.setDate(now.getDate() - daysToSubtract);
  //   return date >= now;
  // }).map((item) => ({
  //   ...item,
  //   comments: item.comments.length,
  // })) || [];

  if (status === "loading") {
    return <LoadingScreen />;
  }

  if (status === "unauthenticated") {
    router.push("/");
    return null;
  }

  return (
    <div className="flex gap-4 min-h-screen pt-4">
      <Card className="flex-1" x-chunk="dashboard-05-chunk-3">
        <CardContent>
          {isLoading ? <LoadingScreen /> : <DataTable data={categoryData} columns={CategoryColumns} addPost />}
        </CardContent>
      </Card>
      
      {/* Right side */}
      {isLoading ? <LoadingScreen /> : <div className="w-5/12 hidden lg:block">
      <Tabs defaultValue="english">
        <TabsList>
          <TabsTrigger value="english">English</TabsTrigger>
          <TabsTrigger value="arabic">Arabic</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        <TabsContent className="flex flex-col gap-2" value="english">
          <div className="box">
            <div className="flex items-center">
              <Input type="text" value={title || categoryData[0]?.title.en} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
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
            <Input type="text" value={slug || categoryData[0]?.slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug" />
            <Button onClick={handleCreateSlug} variant="outline">Create</Button>
          </div>
          <div className="box flex flex-col gap-2">
            <Textarea onChange={(e) => setDesc(e.target.value)} value={desc || categoryData[0]?.desc.en} placeholder="Description" />
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
                <div
                  key={index}
                  className="flex items-center bg-gray-200 text-gray-700 rounded-full px-3 py-1"
                >
                  {badge}
                  <button
                    onClick={() => handleRemoveBadge(index)}
                    className="ml-2 focus:outline-none"
                  >
                    <XIcon className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type something and press Enter"
                className="flex-grow p-2 focus:outline-none"
              />
            </div>
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
                    media ? <div className="w-full h-full"><Image src={media} className="w-full h-full aspect-video" alt="" /> <p className="flex items-center">{file.name} <XIcon className="h-4 w-4 cursor-pointer ml-2 focus:outline-none text-gray-500" onClick={() => {setFile(null); setMedia("")}} /></p></div>  : <LoadingScreen />
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
              </Tabs>
              <DialogFooter>
                <div>
                  <Button variant="outline">Close</Button>
                </div>
                <Button>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={handleSubmit}>Publish</Button>
        </TabsContent>

        <TabsContent className="flex flex-col gap-2" value="arabic">
          <div className="box">
            <div className="flex items-center">
              <Input type="text" value={titleAr || categoryData[0]?.title.ar} onChange={(e) => setTitleAr(e.target.value)} placeholder="Title" />
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
            <Textarea onChange={(e) => setDescAr(e.target.value)} value={descAr || categoryData[0]?.desc.ar} placeholder="Description" />
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
          <div>
            <Label htmlFor="picture">Main Image</Label>
            <Input id="image" type="file" />
          </div>

          <div className="border p-2 rounded w-full max-w-lg">
            <div className="flex flex-wrap gap-2">
              {keywordsAr.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 text-gray-700 rounded-full px-3 py-1"
                >
                  {badge}
                  <button
                    onClick={() => handleRemoveBadgeAr(index)}
                    className="ml-2 focus:outline-none"
                  >
                    <XIcon className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={inputValueAr}
                onChange={(e) => setInputValueAr(e.target.value)}
                onKeyDown={handleKeyDownAr}
                placeholder="Type something and press Enter"
                className="flex-grow p-2 focus:outline-none"
              />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="analysis">
          {/* <Card>
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
              <div className="grid flex-1 gap-1 text-center sm:text-left">
                <CardTitle>Area Chart</CardTitle>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
                  <SelectValue placeholder="Last 3 months" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="90d" className="rounded-lg">
                    Last 3 months
                  </SelectItem>
                  <SelectItem value="30d" className="rounded-lg">
                    Last 30 days
                  </SelectItem>
                  <SelectItem value="7d" className="rounded-lg">
                    Last 7 days
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
              <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                <AreaChart data={filteredData || []}>
                  <defs>
                    <linearGradient id="fillPosts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-posts)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-posts)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-views)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-views)" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-comments)" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="var(--color-comments)" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="createdAt"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                      const date = new Date(value)
                      return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        labelFormatter={(value) => {
                          return new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        }}
                        indicator="dot"
                      />
                    }
                  />
                  <Area dataKey="posts" type="natural" fill="url(#fillMobile)" stroke="var(--color-posts)" stackId="a" />
                  <Area dataKey="comments" type="natural" fill="url(#fillMobile)" stroke="var(--color-mobile)" stackId="a" />
                  <Area dataKey="views" type="natural" fill="url(#fillDesktop)" stroke="var(--color-views)" stackId="a" />
                  <ChartLegend content={<ChartLegendContent />} />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card> */}
        </TabsContent>
      </Tabs>
      </div>}
    </div>
  );
}