"use client"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Input } from "./ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { useState } from "react"
import useSWR from "swr"
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "./ui/dialog"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command"

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

export default function DataTable({ data, columns, addPost }) {
  const pathname = usePathname();
  const isAfterCategories = pathname.startsWith('/en/dashboard/management/categories/');

  const [sorting, setSorting] = useState([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({
    desc: false, // Hide desc column by default
    slug: false, // Hide slug column by default
  })
  const [rowSelection, setRowSelection] = useState({});

  const { data: dataPost, isLoading } = useSWR(
    `https://aqraaz.com/api/posts?page=1&cat=`,
    fetcher
  );

  const [selectedStatus, setSelectedStatus] = useState('');

  const { data: postData, isLoading: LoadingPost } = useSWR(
    selectedStatus ? `https://aqraaz.com/api/posts/${selectedStatus}` : null,
    fetcher
  );

  const handleSubmit = async () => {
    const method = "PUT";

    const body = {
      catSlug: data[0].slug, //If not selected, choose the general category
    }
    
    if (method === "PUT" && postData.id) {
      body.id = postData.id;
    }

    const res = await fetch("https://aqraaz.com/api/posts", {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const data = await res.json();
      // Router.push(`/dashboard/management/categories`);
    }
  };

  const handleCheckboxChange = (value) => {
    setSelectedStatus((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // console.log(selectedStatus);

  const table = useReactTable({
    data: isAfterCategories ? data.length > 0 && data[0]?.posts : data,
    columns,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter, // --- new
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: (row, columnId, filterValue) => {
      return String(row.getValue(columnId))
        .toLowerCase()
        .includes(String(filterValue).toLowerCase())
    },
    state: {
      sorting,
      globalFilter, // --- new
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex flex-col justify-between md:flex-row py-4 gap-2">
        <Input
          placeholder="Filter emails..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
        <div className=" flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {pathname.endsWith('/management/categories') ? (
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          href={`categories/new`}
        >
          Add Category
        </Link>
      ) : pathname.endsWith('/management/posts') ? (
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          href="posts/new"
        >
          Add Post
        </Link>
      ) : addPost ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Add Post</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] px-1">
            <Command>
              <CommandInput placeholder="Change status..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {isLoading ? "Loading..." : dataPost.posts.map((status) => (
                    <CommandItem key={status.id} value={status.title.en}>
                      <Checkbox
                        checked={selectedStatus.includes(status.title.en)}
                        onCheckedChange={() => handleCheckboxChange(status.title.en)}
                      />
                      <span>{status.title.en}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
            <DialogFooter>
              <Button type="submit" onClick={handleSubmit}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : ""}

      </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-4">
        <div>
          <Button onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()} variant="outline" size="icon">
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button onClick={() => table.lastPage()} disabled={!table.getCanNextPage()} variant="outline" size="icon">
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <span className="flex items-center gap-1">
            Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                table.setPageIndex(page)
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            className="relative w-fit cursor-default rounded-md bg-white py-1.5 px-1.5 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            value={table.getState().pagination.pageSize}
            onChange={e => {
              table.setPageSize(Number(e.target.value))
            }}
          >
            {[25, 50, 75, 100].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <div>
            Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
            {table.getRowCount().toLocaleString()} Rows
          </div>
          <span className="w-2 h-full border"></span>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount().toLocaleString()}
            </strong>
          </span>
        </div>
      </div>
    </div>
  )
}