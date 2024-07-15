'use client'
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pWLvRYHcTcW
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../ui/card"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { ResponsiveLine } from "@nivo/line"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsivePie } from "@nivo/pie"
import { ResponsiveScatterPlot } from "@nivo/scatterplot"

export default function DashboardCom() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* <header className="flex items-center h-16 px-4 border-b border-gray-200 dark:border-gray-700 shrink-0 md:px-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-50 md:text-base"
          prefetch={false}
        >
          <FrameIcon className="w-6 h-6" />
          <span className="sr-only">Acme Blog</span>
        </Link>
        <nav className="hidden font-medium text-gray-500 dark:text-gray-400 sm:flex flex-row items-center gap-5 text-sm lg:gap-6 ml-auto">
          <Link href="#" className="hover:text-gray-900 dark:hover:text-gray-50" prefetch={false}>
            Dashboard
          </Link>
          <Link href="#" className="hover:text-gray-900 dark:hover:text-gray-50" prefetch={false}>
            Articles
          </Link>
          <Link href="#" className="hover:text-gray-900 dark:hover:text-gray-50" prefetch={false}>
            Analytics
          </Link>
          <Link href="#" className="hover:text-gray-900 dark:hover:text-gray-50" prefetch={false}>
            Settings
          </Link>
        </nav>
        <Button variant="ghost" size="icon" className="rounded-full ml-auto">
          <img
            src="/placeholder.svg"
            width="32"
            height="32"
            className="rounded-full border dark:border-gray-700"
            alt="Avatar"
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </header> */}
      <main className="flex-1 p-4 md:p-10">
        <div className="grid gap-6 max-w-6xl mx-auto grid-cols-1 md:grid-cols-[3fr_1fr]">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
                  <FileTextIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,389</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
                  <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">145,678</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">+8% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Comments</CardTitle>
                  <MessageCircleIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12,345</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">+15% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
                  <HeartIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89,456</div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">+20% from last month</p>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Performance</CardTitle>
                  <CardDescription>Insights and visualizations about your blog's performance.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <LineChart className="aspect-[9/4]" />
                    </div>
                    <div>
                      <BarChart className="aspect-[9/4]" />
                    </div>
                    <div>
                      <PieChart className="aspect-square" />
                    </div>
                    <div>
                      <DotChart className="aspect-[9/4]" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Last Comments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <img src="https://generated.vusercontent.net/placeholder.svg" alt="Avatar" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">John Doe</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Great article! I learned a lot.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <img src="https://generated.vusercontent.net/placeholder.svg" alt="Avatar" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Sarah Anderson</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Awesome insights, thanks for sharing!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Avatar className="w-8 h-8 border">
                      <img src="https://generated.vusercontent.net/placeholder.svg" alt="Avatar" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">Michael Johnson</div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">This is really helpful, keep it up!</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Latest Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="flex items-start gap-4">
                    <img
                      src="https://generated.vusercontent.net/placeholder.svg"
                      width={64}
                      height={64}
                      alt="Article thumbnail"
                      className="rounded-md object-cover"
                    />
                    <div>
                      <div className="font-medium">
                        <Link href="#" className="hover:underline" prefetch={false}>
                          The Future of AI in Business
                        </Link>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Exploring the impact of AI on the corporate landscape.
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>May 15, 2023</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <EyeIcon className="w-4 h-4" />
                          <span>1.2K views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <HeartIcon className="w-4 h-4" />
                          <span>500 likes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircleIcon className="w-4 h-4" />
                          <span>50 comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <img
                      src="https://generated.vusercontent.net/placeholder.svg"
                      width={64}
                      height={64}
                      alt="Article thumbnail"
                      className="rounded-md object-cover"
                    />
                    <div>
                      <div className="font-medium">
                        <Link href="#" className="hover:underline" prefetch={false}>
                          The Art of Minimalist Living
                        </Link>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Decluttering your life for a more focused existence.
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>April 28, 2023</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <EyeIcon className="w-4 h-4" />
                          <span>800 views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <HeartIcon className="w-4 h-4" />
                          <span>300 likes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircleIcon className="w-4 h-4" />
                          <span>25 comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <img
                      src="https://generated.vusercontent.net/placeholder.svg"
                      width={64}
                      height={64}
                      alt="Article thumbnail"
                      className="rounded-md object-cover"
                    />
                    <div>
                      <div className="font-medium">
                        <Link href="#" className="hover:underline" prefetch={false}>
                          The Rise of Remote Work
                        </Link>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Exploring the impact of remote work on the modern workforce.
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          <span>March 10, 2023</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <EyeIcon className="w-4 h-4" />
                          <span>1.5K views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <HeartIcon className="w-4 h-4" />
                          <span>400 likes</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircleIcon className="w-4 h-4" />
                          <span>35 comments</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

function BarChart(props) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          { name: "Jan", count: 111 },
          { name: "Feb", count: 157 },
          { name: "Mar", count: 129 },
          { name: "Apr", count: 150 },
          { name: "May", count: 119 },
          { name: "Jun", count: 72 },
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({ id }) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  )
}


function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function DotChart(props) {
  return (
    <div {...props}>
      <ResponsiveScatterPlot
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear" }}
        blendMode="multiply"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}


function EyeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}


function FileTextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  )
}


function FrameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  )
}


function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function LineChart(props) {
  return (
    <div {...props}>
      <ResponsiveLine
        data={[
          {
            id: "Desktop",
            data: [
              { x: "Jan", y: 43 },
              { x: "Feb", y: 137 },
              { x: "Mar", y: 61 },
              { x: "Apr", y: 145 },
              { x: "May", y: 26 },
              { x: "Jun", y: 154 },
            ],
          },
          {
            id: "Mobile",
            data: [
              { x: "Jan", y: 60 },
              { x: "Feb", y: 48 },
              { x: "Mar", y: 177 },
              { x: "Apr", y: 78 },
              { x: "May", y: 96 },
              { x: "Jun", y: 204 },
            ],
          },
        ]}
        margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
        xScale={{
          type: "point",
        }}
        yScale={{
          type: "linear",
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 5,
          tickPadding: 16,
        }}
        colors={["#2563eb", "#e11d48"]}
        pointSize={6}
        useMesh={true}
        gridYValues={6}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}


function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}


function PieChart(props) {
  return (
    <div {...props}>
      <ResponsivePie
        data={[
          { id: "Jan", value: 111 },
          { id: "Feb", value: 157 },
          { id: "Mar", value: 129 },
          { id: "Apr", value: 150 },
          { id: "May", value: 119 },
          { id: "Jun", value: 72 },
        ]}
        sortByValue
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        cornerRadius={0}
        padAngle={0}
        borderWidth={1}
        borderColor={"#ffffff"}
        enableArcLinkLabels={false}
        arcLabel={(d) => `${d.id}`}
        arcLabelsTextColor={"#ffffff"}
        arcLabelsRadiusOffset={0.65}
        colors={["#2563eb"]}
        theme={{
          labels: {
            text: {
              fontSize: "18px",
            },
          },
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
        }}
        role="application"
      />
    </div>
  )
}


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}