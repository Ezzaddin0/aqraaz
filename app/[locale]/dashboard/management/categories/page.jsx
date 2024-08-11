// 'use client'
import DataTable from "../../../../../components/data-table"
import { CategoriesColumns } from "../../../../../helper/column-table"
// import useSWR from "swr"
// import LoadingScreen from "../../../../../components/LoadingScreen"
import { getCategories } from "../../../../../data/dataApi"
// import { useEffect } from "react"

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

// const fetcher = async (url) => {
//   const res = await getCategories(); // استدعاء الدالة للحصول على البيانات
//   return res;
// };

export default async function Page({ params: { locale } }) {
  // const includeParam = JSON.stringify({
  //   include: {
  //     posts: {
  //       include: {
  //         views: true,
  //         comments: true,
  //       },
  //     },
  //   }
  // }); 

  // const { data, isLoading } = useSWR(
  //   `/api/categories?${encodeURIComponent(includeParam)}`,
  //   fetcher
  // );

  const data = await getCategories({
    include: {
      posts: {
        include: {
          views: true,
          comments: true
        }
      },
    },
  }); // استدعاء الدالة للحصول على البيانات
  

  return (
    (<div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DataTable data={data} columns={CategoriesColumns} />
    </div>)
  );
}