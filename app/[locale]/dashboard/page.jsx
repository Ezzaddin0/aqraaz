// 'use client'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pWLvRYHcTcW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card"
import { Avatar, AvatarFallback } from "../../../components/ui/avatar"
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, EyeIcon, FileTextIcon, MessageCircleIcon, Users2Icon } from "lucide-react"
import AreaChartsCard from "../../../components/component/area-charts-card"
import Image from "next/image";
import { sortPostsByDate } from "../../../helper/sorted";

const getComments = async () => {
  const res = await fetch(
    `https://aqraaz.com/api/comments`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const getPosts = async () => {
  const res = await fetch(
    `https://aqraaz.com/api/posts`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};

const getUsers = async () => {
  const res = await fetch(
    `https://aqraaz.com/api/users`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};


export default async function Dashboard() {
  const comments = await getComments();
  const posts = await getPosts();
  const users = await getUsers();

  const sortedPosts = sortPostsByDate(posts.posts);

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="flex-1 py-4">
        <div className="grid gap-6 w-full mx-auto grid-cols-1 md:grid-cols-[3fr_2fr]">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                  <FileTextIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{posts.posts.length}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                  <Users2Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">4% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                  <MessageCircleIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{comments.length}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <EyeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{posts.posts.reduce((totalViews, post) => totalViews + post.views.length, 0)}</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">12% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6">
              <AreaChartsCard />
            </div>
          </div>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Last Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {comments.slice(0, 6).map((comment) => {
                    return (
                    <div className="flex items-start gap-4">
                      <Avatar className="w-8 h-8 border">
                        <Image width={32} height={32} src={comment.user.image} alt="Avatar" />
                        <AvatarFallback>{comment.user.name}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{comment.user.name}</div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{comment.desc}</p>
                      </div>
                    </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Latest Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {sortedPosts.slice(0, 4).map((post) => {
                    return (
                    <div className="flex items-start gap-4">
                      <Image src={post.img} width={64} height={64} alt={post.title.en} className="rounded-md aspect-square object-cover"/>
                      <div>
                        <div className="font-medium">
                          <Link href={`dashboard/management/posts/${post.slug}`} className="hover:underline" prefetch={false}>{post.title.en}</Link>
                        </div>
                        <p className="text-sm line-clamp-2 text-gray-500 dark:text-gray-400">{post.desc.en}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <EyeIcon className="w-4 h-4" />
                            <span>{post.views.length} views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircleIcon className="w-4 h-4" />
                            <span>{post.comments.length} comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}