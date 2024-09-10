'use client'

import { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Wand2, X, Search, Image } from 'lucide-react';
import InfiniteScroll from 'react-infinite-scroll-component'

const LocalUpload = ({ onImageUpload, setImage }) => {
  const [preview, setPreview] = useState(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
        onImageUpload(reader.result)
        setImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    (<div className="space-y-4">
      <Label htmlFor="picture">Upload Image</Label>
      <Input id="picture" type="file" accept="image/*" onChange={handleFileChange} />
      <div
        className="h-64 bg-muted rounded-md flex items-center justify-center relative">
        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="h-full w-full object-cover rounded-md" />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={() => {
                setPreview(null)
                onImageUpload(null)
              }}>
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Upload className="h-10 w-10 text-muted-foreground" />
        )}
      </div>
    </div>)
  );
}

const UnsplashGallery = ({ setImage }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false);

  const fetchImages = useCallback(async (query = '', pageNum = 1) => {
    if (loading) return;
    setLoading(true);
    try {
      const baseUrl = 'https://api.unsplash.com';
      const url = query ? `${baseUrl}/search/photos?query=${query}&per_page=50` : `${baseUrl}/photos?per_page=50`;
  
      const response = await fetch(url, {
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`,
        },
      });
  
      const data = await response.json();
      const newImages = query ? data.results : data;
  
      if (newImages.length === 0) {
        setHasMore(false);
      } else {
        setImages((prevImages) => pageNum === 1 ? newImages : [...prevImages, ...newImages]);
        setPage((prevPage) => prevPage + 1); // زيادة الصفحة بشكل صحيح
      }
    } catch (error) {
      console.error('Error fetching images from Unsplash:', error);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    fetchImages()
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    setImages([])
    setPage(1)
    setHasMore(true)
    fetchImages(searchQuery, 1)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="ابحث في Unsplash..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" size="icon">
          <Search className="h-4 w-4" />
        </Button>
      </form>
        <div className="grid grid-cols-3 h-64 overflow-auto gap-4">
          {images.map((image) => (
            <Card key={image.id} className="cursor-pointer hover:opacity-80">
              <CardContent className="p-0">
                <img
                  src={image.urls.small}
                  onClick={() => setImage(image.urls.regular)}
                  alt={image.alt_description}
                  className={`aspect-square object-cover rounded-md ${setImage == image.urls.regular && 'border border-blue-500'}`}
                />
              </CardContent>
            </Card>
          ))}
        </div>
    </div>
  )
}

const AIGenerate = () => (
  <div className="space-y-4">
    <Label htmlFor="prompt">Image Prompt</Label>
    <Input id="prompt" placeholder="Describe the image you want to generate..." />
    <Button className="w-full">Generate Image</Button>
    <div className="h-64 bg-muted rounded-md flex items-center justify-center">
      <Wand2 className="h-10 w-10 text-muted-foreground" />
    </div>
  </div>
)

const LastImages = ({ images }) => (
  <div className="grid grid-cols-3 gap-4">
    {images.map((image, i) => (
      <Card key={i} className="cursor-pointer hover:opacity-80">
        <CardContent className="p-0">
          <img
            src={image}
            alt={`Last uploaded ${i + 1}`}
            className="aspect-square object-cover rounded-md" />
        </CardContent>
      </Card>
    ))}
  </div>
)

export default function ImageUploadDialog({ setImage }) {
  const [open, setOpen] = useState(false)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [lastImages, setLastImages] = useState([
    '/placeholder.svg?height=100&width=100',
    '/placeholder.svg?height=100&width=100',
    '/placeholder.svg?height=100&width=100',
    '/placeholder.svg?height=100&width=100',
    '/placeholder.svg?height=100&width=100',
    '/placeholder.svg?height=100&width=100',
  ])

  const handleUpload = () => {
    if (uploadedImage) {
      setLastImages([uploadedImage, ...lastImages.slice(0, 5)])
      setUploadedImage(null)
    }
    setOpen(false)
  }

  return (
    (<Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full" variant="outline">Upload Image</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="local" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="local">Local</TabsTrigger>
            <TabsTrigger value="unsplash">Unsplash</TabsTrigger>
            <TabsTrigger value="ai">AI Generate</TabsTrigger>
            <TabsTrigger value="last">Last Images</TabsTrigger>
          </TabsList>
          <TabsContent value="local">
            <LocalUpload setImage={setImage} onImageUpload={setUploadedImage} />
          </TabsContent>
          <TabsContent value="unsplash">
            <UnsplashGallery setImage={setImage} />
          </TabsContent>
          <TabsContent value="ai">
            <AIGenerate setImage={setImage} />
          </TabsContent>
          <TabsContent value="last">
            <LastImages setImage={setImage} images={lastImages} />
          </TabsContent>
        </Tabs>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleUpload} disabled={!uploadedImage}>Upload</Button>
        </div>
      </DialogContent>
    </Dialog>)
  );
}