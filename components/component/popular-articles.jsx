'use client'
import CardCustom from "./Card";
import { compareDesc, isThisMonth, isThisWeek, isToday, parseISO } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";

export default function PopularArticles({num, Posts, lang, page, cat}) {
const [filter, setFilter] = useState('weak');

  const filterPosts = (posts, filter) => {
    return posts.filter(post => {
      const postDate = parseISO(post._createdAt);
      if (filter === 'today') return isToday(postDate);
      if (filter === 'weak') return isThisWeek(postDate);
      if (filter === 'month') return isThisMonth(postDate);
      return true;
    });
  };

  // const sortedPosts = Posts.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)));
  const sortedPosts = Posts.sort((a, b) => compareDesc(parseISO(a._createdAt), parseISO(b._createdAt)));
  const filteredPosts = filterPosts(sortedPosts, filter);
  // const sortedByViews = filteredPosts.sort((a, b) => b.totalPostViews - a.totalPostViews);  
  return (
    <div className="py-12">
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <h2 className="text-3xl font-bold mb-4 md:mb-0">{cat}</h2>
        <div className="flex items-center justify-between flex-wrap gap-3 md:space-x-4">
        <Select defaultValue="weak" onValueChange={value => setFilter(value)}>
          <SelectTrigger aria-label="filter" className="w-[180px]">
            <SelectValue placeholder="This Week" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="weak">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
        </div>
      </div>
      {/* {sortedByViews.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedByViews.slice(0, num || 6).map((article, index) => (
            <CardCustom key={index} article={article} lang={lang} views time />
        ))}
      </div>
      ) : <h2 className="border rounded-lg py-8 text-center text-4xl font-bold mb-4">No articles in This {filter}</h2>
      } */}
      {filteredPosts.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.slice(0, num || 6).map((article, index) => (
            <CardCustom key={index} article={article} lang={lang} views time />
        ))}
      </div>
      ) : <h2 className="border rounded-lg py-8 text-center text-4xl font-bold mb-4">No articles in This {filter}</h2>
      }
    </div>
  )
}