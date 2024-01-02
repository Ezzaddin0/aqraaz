import { urlFor } from "@/lib/createClient";
import Image from "next/image";
import Link from "next/link";

export const RichText = {
  types: {
    image: ({ value }: any) => {
      return (
        <div className="d-flex align-items-center justify-content-center">
          <Image
            src={urlFor(value).url()}
            alt="Post image"
            width={600}
            height={450}
            className="object-fit-cover w-100"
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="ms-2 py-5 list-disc space-y-5">{children}</ul>
    ),
  },
  number: ({ children }: any) => (
    <ol className="mt-2 list-decimal">{children}</ol>
  ),
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl py-4 font-bold">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl py-4 font-bold">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl py-4 font-bold">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-2xl py-4 font-bold">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-blue-600 border-l-4 ps-5 py-5 my-5">
        {children}
      </blockquote>
    ),
  },
  marks: {
  link: ({ children, value }: any) => {
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