'use client'
import React, { useCallback, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { ImageIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import Image from 'next/image';
import { Input } from './ui/input';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../app/firebase";
import LoadingScreen from './LoadingScreen';

const storage = getStorage(app);

export default function ImagesCard({setImage, altImage, setAltImage}) {
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState("");
  const [searchImage, setSearchImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const [page, setPage] = useState(1);
  const [altText, setAltText] = useState(altImage || "");

  useEffect(() => {
    if (media) {
      setImage(media);
      setAltImage(altText);
    }
  }, [media, altText]);

  const fetchImageFromUnsplash = async (query, page = 1) => {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=9&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}`
    );
    const data = await response.json();
    if (data.results.length > 0) {
      return data.results;
    }
    return [];
  };

  const debouncedSearch = useCallback(
    (query) => {
      clearTimeout(debounceTimeout);
      const newTimeout = setTimeout(async () => {
        if (query) {
          const images = await fetchImageFromUnsplash(query);
          setGalleryImages(images);
          setPage(2); // Reset page to 2 for subsequent fetches
        }
      }, 500); // Adjust the debounce delay as needed
      setDebounceTimeout(newTimeout);
    },
    [debounceTimeout]
  );

  const handleSearch = (e) => {
    const query = e.target.value;
    debouncedSearch(query);
  };

  const handleLoadMore = async () => {
    const query = document.getElementById("gallery-search-input").value;
    if (query) {
      const moreImages = await fetchImageFromUnsplash(query, page);
      setGalleryImages((prevImages) => [...prevImages, ...moreImages]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleImageSelect = async (imageUrl, altDescription) => {
    const fileFromUrl = await fetchImageAsFile(imageUrl);
    setFile(fileFromUrl);
    setAltText(altDescription);
  };

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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <ImageIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Image Management</DialogTitle>
          <DialogDescription>
            Manage your images in this dialog.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="upload" className="border-b space-y-4">
          <TabsList className="grid grid-cols-3 gap-2">
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="link">Link</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="py-2">
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                {file ? (
                  media ? (
                    <div className="w-full h-full">
                      <img src={media} className="w-full h-full aspect-video" alt={altText} />
                      <p className="flex items-center">
                        {file.name}
                        <XIcon className="h-4 w-4 cursor-pointer ml-2 focus:outline-none text-gray-500"
                          onClick={() => {
                            setFile(null);
                            setMedia("");
                            setAltText("");
                          }}
                        />
                      </p>
                    </div>
                  ) : (
                    <LoadingScreen />
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloudIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                )}
                <input id="dropzone-file" type="file" onChange={(e) => setFile(e.target.files[0])} className="hidden" />
              </label>
            </div>
            <Input
              className="mt-2"
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              placeholder="Enter alt text for the image"
            />
          </TabsContent>
          <TabsContent value="link" className="py-6">
            <div className="grid items-center gap-2">
              <Input
                className="w-full"
                type="text"
                value={searchImage}
                onChange={(e) => setSearchImage(e.target.value)}
                placeholder="Paste image URL here..."
              />
              {searchImage && (
                <img
                  width={550}
                  height={309}
                  src={searchImage}
                  alt={altText || "Linked image"}
                  className="rounded-md object-cover aspect-video"
                />
              )}
              <Input
                className="mt-2"
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="Enter alt text for the image"
              />
            </div>
          </TabsContent>
          <TabsContent value="gallery" className="py-1">
            <Input className="col-3 form-control-sm py-1 my-2 fs-4 text-capitalize border border-3 border-dark" type="text" id="gallery-search-input" placeholder="Search Anything..." onChange={handleSearch} />
            <div className="grid gap-4 h-[300px] overflow-auto">
              <div className="grid grid-cols-3 gap-4">
                {galleryImages.map((photo) => (
                  <div key={photo.id}>
                    <Image
                      id={photo.id}
                      width={photo.width}
                      height={photo.height}
                      className="h-auto max-w-full rounded-lg cursor-pointer"
                      src={photo.urls.regular}
                      alt={photo.alt_description}
                      onClick={() => handleImageSelect(photo.urls.regular, photo.alt_description)}
                    />
                  </div>
                ))}
              </div>
            </div>
            {galleryImages.length > 0 && (
              <Button variant="outline" className="mt-4" onClick={handleLoadMore}>Load More</Button>
            )}
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline">Close</Button>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}