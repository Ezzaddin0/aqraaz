"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from "../ui/chart";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  Area,
  Tooltip,
  Legend,
  YAxis,
} from "recharts";
import { useState, useMemo } from "react";

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-2))",
  },
  comments: {
    label: "Comments",
    color: "hsl(var(--chart-3))",
  },
  posts: {
    label: "Posts",
    color: "hsl(var(--chart-4))",
  },
};

export default function AreaChartsCard({ data }) {
  const [timeRange, setTimeRange] = useState("90d");

  const filteredData = useMemo(() => {
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    now.setDate(now.getDate() - daysToSubtract);

    return data?.filter((item) => new Date(item.createdAt) >= now)
      .map((item) => {
        const views = item.views.map((view) => ({
          createdAt: new Date(view.createdAt).toLocaleDateString(),
          views: 1,
          comments: 0,
          posts: 0,
        }));
        const comments = item.comments.map((comment) => ({
          createdAt: new Date(comment.createdAt).toLocaleDateString(),
          views: 0,
          comments: 1,
          posts: 0,
        }));
        const posts = {
          createdAt: new Date(item.createdAt).toLocaleDateString(),
          views: 0,
          comments: 0,
          posts: 1,
        };
        return [...views, ...comments, posts];
      })
      .flat()
      .reduce((acc, curr) => {
        const date = curr.createdAt;
        if (!acc[date]) {
          acc[date] = { createdAt: date, views: 0, comments: 0, posts: 0 };
        }
        acc[date].views += curr.views;
        acc[date].comments += curr.comments;
        acc[date].posts += curr.posts;
        return acc;
      }, {});
  }, [data, timeRange]);

  const chartData = Object.values(filteredData).sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Area Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total views, comments, and posts for the selected time range
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-views)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-views)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillComments" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-comments)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-comments)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillPosts" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-posts)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-posts)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="createdAt"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis />
            <Tooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="posts"
              type="natural"
              fill="url(#fillPosts)"
              stroke="var(--color-posts)"
              stackId="a"
            />
            <Area
              dataKey="views"
              type="natural"
              fill="url(#fillViews)"
              stroke="var(--color-views)"
              stackId="a"
            />
            <Area
              dataKey="comments"
              type="natural"
              fill="url(#fillComments)"
              stroke="var(--color-comments)"
              stackId="a"
            />
            <Legend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
