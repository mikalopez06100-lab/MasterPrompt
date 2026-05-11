import Image from "next/image";

type AvatarStackProps = {
  count: number;
  label: string;
};

const avatars = [
  { src: "https://vgdspxhuqdfilrkhipvx.supabase.co/storage/v1/object/public/assets/avatars/vignette-1.png", fallback: "JD" },
  { src: "https://vgdspxhuqdfilrkhipvx.supabase.co/storage/v1/object/public/assets/avatars/vignette-2.png", fallback: "LC" },
  { src: "https://vgdspxhuqdfilrkhipvx.supabase.co/storage/v1/object/public/assets/avatars/vignette-3.png", fallback: "SM" },
  { src: "https://vgdspxhuqdfilrkhipvx.supabase.co/storage/v1/object/public/assets/avatars/vignette-4.png", fallback: "AR" },
  { src: "https://vgdspxhuqdfilrkhipvx.supabase.co/storage/v1/object/public/assets/avatars/vignette-5.png", fallback: "+" },
];

export function AvatarStack({ count, label }: AvatarStackProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex -space-x-2">
        {avatars.map((avatar, idx) => (
          <div
            key={avatar.src}
            className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-navy"
            style={{ zIndex: avatars.length - idx }}
          >
            <Image
              src={avatar.src}
              alt="Avatar entrepreneur"
              fill
              sizes="32px"
              className="object-cover"
              unoptimized
            />
          </div>
        ))}
      </div>
      <div>
        <p className="text-xs tracking-[0.18em] text-amber-500">★★★★★</p>
        <p className="text-sm text-muted">
          <strong className="text-navy">+{count} entrepreneurs</strong> {label}
        </p>
      </div>
    </div>
  );
}
