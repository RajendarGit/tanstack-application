import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRef } from "react";

export default function MoviePlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div className="relative z-50">
      <video
        ref={videoRef}
        src={src}
        autoPlay={false}
        loop={false}
        muted
        controls
        poster="https://example.com/poster.jpg"
        className="w-full h-dvh object-cover"
      />
      <Button
        variant="secondary"
        className="absolute top-4 left-4 rounded-full bg-black/30 hover:bg-black/50 text-white"
        onClick={() => window.history.back()}
      >
        <ArrowLeft /> Back
      </Button>
    </div>
  );
}
