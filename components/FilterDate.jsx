'use client'
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { ChevronDownIcon } from 'lucide-react';

export default function FilterDate() {
    const [dateFilter, setDateFilter] = useState("thisWeek");
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button className="flex items-center space-x-2" variant="outline">
        {dateFilter === "today" ? "Today" : dateFilter === "thisWeek" ? "This Week" : "This Year"}
        <ChevronDownIcon className="h-4 w-4" />
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setDateFilter("today")}>Today</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDateFilter("thisWeek")}>This Week</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setDateFilter("thisYear")}>This Year</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}