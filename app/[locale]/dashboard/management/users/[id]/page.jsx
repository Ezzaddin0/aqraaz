"use client"
import { Button } from "../../../../../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../../components/ui/tabs"
import { Input } from "../../../../../../components/ui/input"
import { Label } from "../../../../../../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../../../../../components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../../../../../../components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "../../../../../../lib/utils";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../../components/ui/avatar";
import { Calendar } from "../../../../../../components/ui/calendar"
import { format } from "date-fns";
import LoadingScreen from "../../../../../../components/LoadingScreen";
import DataTable from "../../../../../../components/data-table";
import { CommentsColumns, PostColumns } from "../../../../../../helper/column-table";
import { useRouter } from "next/navigation";

const fetcher = async (url) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
};

export default function Page({ params }) {
  const router = useRouter();
  const { data, isLoading } = useSWR(`http://localhost:3000/api/users/${params.id}`, fetcher);

  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (data) {
      setId(data.id);
      setName(data.name);
      setEmail(data.email);
      setImage(data.image);
      setRole(data.role);
      setDate(data.createdAt);
    }
  }, [data]);

  const handleSubmit = async () => {
    const body = {
      id,
      name,
      email,
      image,
      role,
      createdAt: date,
    };

    const res = await fetch(`http://localhost:3000/api/users/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      router.push(`/dashboard/management/users`);
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="flex min-h-screen pt-4">      
      <Tabs defaultValue="info" className="w-full">
        <TabsList>
          <TabsTrigger value="info">Info</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>
        <TabsContent className="container px-56 flex flex-col gap-2" value="info">
          <div className="flex items-center justify-center gap-2">
            <Avatar className="w-32 h-32">
              <AvatarImage src={image} title={name} alt={name} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name">Name</Label>
            <Input disabled type="text" defaultValue={name} id="name" placeholder="Name" />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="email">Email</Label>
            <Input disabled type="email" defaultValue={email} id="email" placeholder="email" />
          </div>
          <div className="flex w-full flex-col gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          </div>
          <div className="box">
          <Select onValueChange={(e) => setRole(e)} value={role}>
            <SelectTrigger>
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="USER">User</SelectItem>
            </SelectContent>
          </Select>
          </div>

          <Button variant="outline" onClick={handleSubmit}>Submit</Button>
        </TabsContent>

        <TabsContent className="flex flex-col gap-2" value="comments">
          {isLoading ? <LoadingScreen /> : <DataTable data={data.Comment} columns={CommentsColumns} />}
        </TabsContent>
        <TabsContent value="posts">{isLoading ? <LoadingScreen /> : <DataTable data={data.Post} columns={PostColumns} />}</TabsContent>
      </Tabs>
    </div>
  );
}