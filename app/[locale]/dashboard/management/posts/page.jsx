'use client'
import { PostColumns } from "../../../../../helper/column-table"
import useSWR from "swr"
import DataTable from "../../../../../components/data-table"
import LoadingScreen from "../../../../../components/LoadingScreen"

const fetcher = async (url) => {
  const res = await fetch(url, {
    include: {
      user: true,
      cat: true,
      comments: {
        include: {
          user: true,
        }
      },
      views: true,
    }
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

export default function Page() {
  const includeParam = JSON.stringify({
    include: {
      user: true,
      cat: true,
      comments: {
        include: {
          user: true,
        }
      },
      views: true,
    }
  });
  const { data, isLoading } = useSWR(
    `/api/posts?${encodeURIComponent(includeParam)}`,
    fetcher
  );

  return (
    isLoading ? <LoadingScreen /> : <DataTable data={data.posts} columns={PostColumns} />
  );
}