// 'use client'
import { PostColumns } from "@/helper/column-table"
// import useSWR from "swr"
import DataTable from "@/components/data-table"
import { fetchPosts, getPosts } from "@/data/dataApi";
// import LoadingScreen from "../../../../../components/LoadingScreen"

export default async function Page() {
  const fields = ['_id', 'title', 'desc', 'img', 'slug', 'keywords', 'createdAt', 'totalPostViews', 'posts', 'comments', 'catSlug', 'slug']; // يمكنك تغيير هذه الحقول حسب احتياجاتك

  const data = await fetchPosts('', fields);

  return (<DataTable data={data} columns={PostColumns} />);
}