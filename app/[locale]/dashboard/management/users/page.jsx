// 'use client'
import { UsersColumns } from "@/helper/column-table"
// import useSWR from "swr"
import DataTable from "@/components/data-table"
import LoadingScreen from "@/components/LoadingScreen"
import { fetchUsers } from "@/data/dataApi";

// const fetcher = async (url) => {
//   const res = await fetch(url);

//   const data = await res.json();

//   if (!res.ok) {
//     const error = new Error(data.message);
//     throw error;
//   }

//   return data;
// };

export default async function Page({ params: { locale } }) {
  // const { data, isLoading } = useSWR(
  //   `/api/users`,
  //   fetcher
  // );
  const data = await fetchUsers();

  return (
    (<div className="flex min-h-screen w-full flex-col bg-muted/40">
      {<DataTable data={data} columns={UsersColumns} />}
    </div>)
  );
}