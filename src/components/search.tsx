"use client"

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function Search({ onSearch }: { onSearch: (term: string) => void }) {

    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {

        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
        onSearch(term);
    }

    return (
        <Input placeholder="Search a task..." onChange={(e) => handleSearch(e.target.value)} defaultValue={searchParams.get('query')?.toString()} />
    )
}