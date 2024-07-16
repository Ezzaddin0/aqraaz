'use client'
/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/xUJYGiCZlOj
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
import { PostColumns } from "../../../../../helper/column-table"
import useSWR from "swr"
import DataTable from "../../../../../components/data-table"
import LoadingScreen from "../../../../../components/LoadingScreen"

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

export default function Page() {
  const { data, isLoading } = useSWR(
    `/api/posts`,
    fetcher
  );

  return (
    isLoading ? <LoadingScreen /> : <DataTable data={data.posts} columns={PostColumns} />
  );
}