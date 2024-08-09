"use client";

import { useRouter } from 'next/navigation';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../components/ui/select';

export default function SelectComponent({ defaultSort }) {
  const router = useRouter();

  const handleSortChange = (value) => {
    router.push(`?sort=${value}`);
  };

  return (
    <Select defaultValue={defaultSort} onValueChange={handleSortChange}>
      <SelectTrigger aria-label="Filter" className="w-[180px]">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="a-to-z">from A to Z</SelectItem>
        <SelectItem value="z-to-a">from Z to A</SelectItem>
        <SelectItem value="most-viewed">Most viewed</SelectItem>
      </SelectContent>
    </Select>
  );
}