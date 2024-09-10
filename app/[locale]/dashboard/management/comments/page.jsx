// 'use client'
// import useSWR from "swr"
import DataTable from "@/components/data-table"
import { fetchComments } from "@/data/dataApi";
import { CommentsColumns } from "@/helper/column-table"
// import LoadingScreen from "@/components/LoadingScreen"

export default async function Page({ params: { locale } }) {
  const data = await fetchComments()  

  return (
    (<div className="flex min-h-screen w-full flex-col bg-muted/40">
      {<DataTable data={data} columns={CommentsColumns} />}
    </div>)
  );
}