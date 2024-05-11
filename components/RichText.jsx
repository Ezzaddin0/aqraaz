import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../lib/createClient";

export const RichText = {
  types: {
    image: ({ value }) => {
      return (
        <div className="">
          <Image
            src={urlFor(value).url()}
            alt="Post image"
            width={600}
            height={450}
            className="w-full my-8 aspect-video rounded-xl bg-gray-50 dark:bg-gray-950 object-cover border border-gray-200/60 dark:border-gray-700/60"
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-8 text-gray-600 dark:text-gray-200 ms-2 py-3 px-8 list-disc space-y-5">{children}</ul>
    ),
  },
  number: ({ children }) => (
    <ol className="mt-8 text-gray-600 dark:text-gray-200 list-decimal">{children}</ol>
  ),
  block: {
    h1: ({ children }) => (
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-4xl">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-200">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl py-4 font-bold">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-2xl py-4 font-bold">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l border-indigo-600 pl-9 my-4 font-semibold text-gray-900 dark:text-gray-200">
        {children}
      </blockquote>
    ),
  },
  marks: {
  link: ({ children, value }) => {
    const rel = !value.href.startsWith("/")
      ? "noreferrer noopener"
      : undefined;
    return (
      <Link href={value.href} rel={rel} className="underline">
        {children}
      </Link>
    );
  },
},
};