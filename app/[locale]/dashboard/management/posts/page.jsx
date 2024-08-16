// 'use client'
import { PostColumns } from "../../../../../helper/column-table"
// import useSWR from "swr"
import DataTable from "../../../../../components/data-table"
import { getPosts } from "../../../../../data/dataApi";
// import LoadingScreen from "../../../../../components/LoadingScreen"

// const fetcher = async (url) => {
//   const res = await fetch(url, {
//     include: {
//       user: true,
//       cat: true,
//       comments: {
//         include: {
//           user: true,
//         }
//       },
//       views: true,
//     }
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     const error = new Error(data.message);
//     throw error;
//   }

//   return data;
// };

export default async function Page() {
  // const includeParam = JSON.stringify({
  //   include: {
  //     user: true,
  //     cat: true,
  //     comments: {
  //       include: {
  //         user: true,
  //       }
  //     },
  //     views: true,
  //   }
  // });
  // const { data, isLoading } = useSWR(
  //   `/api/posts?${encodeURIComponent(includeParam)}`,
  //   fetcher
  // );
  const data = await getPosts();
  // const data = await getPosts({
  //   include: {
  //     user: true,
  //     cat: true,
  //     comments: {
  //       include: {
  //         user: true,
  //       }
  //     },
  //     views: true,
  //   }
  // })

  return (<DataTable data={data.posts} columns={PostColumns} />);
}