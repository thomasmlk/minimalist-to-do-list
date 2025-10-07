import { Input } from "@/components/ui/input"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder, onSearch }: { placeholder: string, onSearch: (term: string) => void }) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        replace(`${pathname}?${params.toString()}`);
        onSearch(term);
    }

    return (
        <>
            <Input placeholder={placeholder} defaultValue={searchParams.get("query")?.toString()} onChange={(e) => { handleSearch(e.target.value) }} />
        </>
    )
}