import { Loader2Icon } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <Loader2Icon className="animate-spin text-blue-500 w-12 h-12" />
        <p>Loading</p>
    </div>
  )
}