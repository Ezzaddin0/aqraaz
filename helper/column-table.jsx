"use client" // new line
import { ArrowUpDown, MoreHorizontal, Trash2Icon } from "lucide-react"
import { Button } from "../components/ui/button"
import { Checkbox } from "../components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu"
import Link from "next/link"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"

async function deletePost(postId) {
  try {
    const response = await fetch(`/api/posts`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: postId }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete the post');
    }

    const data = await response.json();
    console.log('Post deleted successfully:', data.message);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function deleteCategory(categoryId) {
  try {
    const response = await fetch('/api/categories/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: categoryId }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete the post');
    }

    const data = await response.json();
    console.log('Post deleted successfully:', data.message);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function deleteComment(commentId) {
  try {
    const response = await fetch('/api/comments/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: commentId }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete the comment');
    }

    const data = await response.json();
    console.log('Comment deleted successfully:', data.message);
  } catch (error) {
    console.error('Error:', error);
  }
}


export const PostColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "img",
    header: "",
    cell: ({ row }) => (
      <img src={row.getValue("img")} height="64" width="64" className="aspect-square rounded-md object-cover" />
    ),
  },
  {
    accessorKey: "title.en",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div title={row.original.title.en} className="capitalize">{(row.original.title.en).substring(0, 40)}</div>
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Slug
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div>{row.getValue("slug")}</div>
    ),
  },
  {
    accessorKey: "desc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.getToggleSortingHandler()}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div title={row.original.desc.en} className="capitalize line-clamp-2">{(row.original.desc.en).substring(0, 30)}</div>
    ),
  },
  {
    accessorKey: "views",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Views
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize line-clamp-2">{row.original.views.length}</div>
    ),
  },
  {
    accessorKey: "cat.slug",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div title={row.original?.cat?.slug} className="capitalize">{(row.original?.cat?.slug || '').substring(0, 30)}</div>
    ),
  },
  {
    accessorKey: "keywords",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Keywords
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
        <div className="capitalize">{row.original.keywords.en.length + row.original.keywords.ar.length}</div>
    ),
  },
  {
    accessorKey: "comments",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comments
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.original.comments.length}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CreatedAt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{new Date(row.getValue("createdAt")).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</div>
    ),
  },
  {
    id: "id",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/en/dashboard/management/posts/${row.getValue("slug")}`} >View Post</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem> */}
              {/* <span onClick={() => deletePost(row.original.id)} title={row.original.id} >Delete Post</span> */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full" variant="destructive">Delete Post</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete Post</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this post?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={() => deletePost(row.original.id)} type="submit">Yes Delete</Button>
                  </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            {/* </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const CategoryColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "img",
    header: "",
    cell: ({ row }) => (
      <img src={row.getValue("img")} height="64" width="64" className="aspect-square rounded-md object-cover" />
    ),
  },
  {
    accessorKey: "title.en",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div title={row.original.title.en} className="capitalize">{(row.original.title.en).substring(0, 40)}</div>
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Slug
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div>{row.getValue("slug")}</div>
    ),
  },
  {
    accessorKey: "desc",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.getToggleSortingHandler()}>
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div title={row.original.desc.en} className="capitalize line-clamp-2">{(row.original.desc.en).substring(0, 30)}</div>
    ),
  },
  {
    accessorKey: "views",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Views
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {},
  },
  // {
  //   accessorKey: "cat.slug",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Category
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  //   cell: ({ row }) => (
  //     <div title={row.original?.cat?.slug} className="capitalize">{(row.original?.cat?.slug || '').substring(0, 30)}</div>
  //   ),
  // },
  {
    accessorKey: "keywords",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Keywords
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
        <div className="capitalize">{row.original.keywords.en.length + row.original.keywords.ar.length}</div>
    ),
  },
  {
    accessorKey: "comments",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
          Comments
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.original.comments?.length}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} >
          CreatedAt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{new Date(row.getValue("createdAt")).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</div>
    ),
  },
  {
    id: "id",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/en/dashboard/management/posts/${row.getValue("slug")}`} >View Post</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem> */}
              {/* <span onClick={() => deletePost(row.original.id)} title={row.original.id} >Delete Post</span> */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full" variant="destructive">Delete Post</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete Post</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this post?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={() => deletePost(row.original.id)} type="submit">Yes Delete</Button>
                  </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            {/* </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const CategoriesColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "img",
    header: "",
    cell: ({ row }) => (
      <img src={row.getValue("img")} height="64" width="64" className="aspect-square rounded-md object-cover" />
    ),
  },
  {
    accessorKey: "title.en",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original.title.en}</div>
    ),
  },
  {
    accessorKey: "desc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize line-clamp-2">{row.original.desc.en}</div>
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.getToggleSortingHandler()}
        >
          Slug
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("slug")}</div>
    ),
  },
  {
    accessorKey: "posts",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Post
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original.posts.length}</div>
    ),
  },
  {
    accessorKey: "keywords",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Keywords
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
        <div className="capitalize">{row.original.keywords.en.length + row.original.keywords.ar.length}</div>
    ),
  },
  {
    accessorKey: "posts.comments",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Comments
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
        <div className="capitalize">{row.original.posts.reduce((sum, post) => sum + post.comments.length, 0)}</div>
    ),
  },
  {
    accessorKey: "posts.views",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Views
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
        <div className="capitalize">{row.original.posts.reduce((sum, post) => sum + post.views.length, 0)}</div>
    ),
  },
//   {
//     accessorKey: "comments",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Comments
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       )
//     },
//     cell: ({ row }) => (
//       <div className="capitalize text-center">{row.original.comments.length}</div>
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("status")}</div>
//     ),
//   },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CreatedAt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{new Date(row.getValue("createdAt")).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</div>
    ),
  },
  {
    id: "id",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`categories/${row.getValue("slug")}`}>View Category</Link>
            </DropdownMenuItem>
            {/* <DropdownMenuItem> */}
              {/* <span onClick={() => deletePost(row.original.id)} title={row.original.id} >Delete Post</span> */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full" variant="destructive">Delete Category</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete Category</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this Category?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={() => deleteCategory(row.original.id)} type="submit">Yes Delete</Button>
                  </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            {/* </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const UsersColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "",
    cell: ({ row }) => (
      <img src={row.getValue("image")} height="64" width="64" className="aspect-square rounded-md object-cover" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("role")}</div>
    ),
  },
  {
    accessorKey: "Comment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total comments
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original.Comment.length}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CreatedAt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{new Date(row.getValue("createdAt")).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</div>
    ),
  },
  {
    id: "id",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {/* <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem>
              <Link href={`users/${payment.id}`} >View User</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem> */}
              {/* <span onClick={() => deletePost(row.original.id)} title={row.original.id} >Delete Post</span> */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full" variant="destructive">Delete User</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Delete User</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete this User?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                  <DialogClose asChild>
                    <Button onClick={() => deletePost(row.original.id)} type="submit">Yes Delete</Button>
                  </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            {/* </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export const CommentsColumns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "user.image",
    header: "",
    cell: ({ row }) => (
      <img src={row.original.user.image} height="64" width="64" className="aspect-square rounded-md object-cover" />
    ),
  },
  {
    accessorKey: "user.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original.user.name}</div>
    ),
  },
  {
    accessorKey: "postSlug",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Post Slug
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('postSlug')}</div>
    ),
  },
  {
    accessorKey: "desc",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize line-clamp-2">{row.getValue('desc')}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CreatedAt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{new Date(row.getValue("createdAt")).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</div>
    ),
  },
  {
    id: "id",
    cell: ({ row }) => {
      const payment = row.original

      return (
      <Dialog>
        <DialogTrigger asChild>
          <Trash2Icon className="h-5 w-5 cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Comment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this Comment?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => deleteComment(payment.id)} type="submit">Yes Delete</Button>
          </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      )
    },
  },
]