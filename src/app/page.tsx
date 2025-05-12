import Link from 'next/link'
import Navbar from '@/components/ui/Navbar.jsx'

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Making Legislation Acccessible for Everyone.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              PoliView simplifies legislative infomration from federal and state governments,
              helping citizens stay informed and engaged with the democratic process.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/bills"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visable:outline focus-visable:outline-2 focus-visable:outline-offset-2 focus-visable:outline-blue-600">
                  Explore Bills
                </Link>
                <Link href="about" className="text-sm font-semibold leading-6 text-gray-900">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}