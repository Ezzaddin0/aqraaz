'use client'
import DataTable from "../../../../../components/data-table"
import { CategoriesColumns } from "../../../../../helper/column-table"
import useSWR from "swr"
import LoadingScreen from "../../../../../components/LoadingScreen"

const fetcher = async (url) => {
  const res = await fetch(url, {
    include: {
      posts: {
        include: {
          views: true,
          comments: true
        }
      },
    },
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

export default function Page({ params: { locale } }) {
  const includeParam = JSON.stringify({
    posts: {
      include: {
        views: true,
        comments: true,
      },
    },
  });

  const { data, isLoading } = useSWR(
    `${process.env.NEXTAUTH_URL}/api/categories?include=${encodeURIComponent(includeParam)}`,
    fetcher
  );

  return (
    (<div className="flex min-h-screen w-full flex-col bg-muted/40">
      {isLoading ? <LoadingScreen /> : <DataTable data={data} columns={CategoriesColumns} />}
    </div>)
  );
}