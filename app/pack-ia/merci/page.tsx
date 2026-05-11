import Link from "next/link";
import { Syne, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/Navbar";

const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["300", "400", "500"] });

export default function PackMerciPage() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;
  return (
    <main className={`${dmSans.className} min-h-screen bg-ivory text-navy`}>
      <div className={syne.className}>
        <Navbar />
      </div>
      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-white p-8">
          <h1 className={`${syne.className} text-3xl font-bold`}>Merci pour votre commande</h1>
          <p className="mt-3 text-slate-700">
            Je vous contacte sous 24h pour planifier le brief de cadrage.
          </p>
          {bookingUrl ? (
            <Link href={bookingUrl} target="_blank" rel="noreferrer noopener" className="mt-5 inline-block rounded-md bg-amber-500 px-5 py-3 text-sm font-semibold text-navy">
              Planifier un créneau
            </Link>
          ) : (
            <Link href="mailto:hello@masterprompt.fr" className="mt-5 inline-block rounded-md bg-amber-500 px-5 py-3 text-sm font-semibold text-navy">
              Contacter hello@masterprompt.fr
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
