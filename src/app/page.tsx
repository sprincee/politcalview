import Link from 'next/link'
import Navbar from '@/components/ui/Navbar.jsx'

export default function Home() {
  return (
    <main className='min-h-screen bg-gradient-to-b from-white to-green-50'>
      <Navbar />
      <div className='relative isolate px-6 pt-14 lg:px-8'>
        <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
              Making Legislation <span className='text-green-800'>Accessible</span> for Everyone
            </h1>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              PoliView simplifies legislative information from federal and state governments,
              helping citizens stay informed and engaged with the demoncratic process.
            </p>
            <div className='mt-10 flex items-center justify-center gap-x-6'>
              <Link
                href='/bills'
                className='rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visable:outline focus-visable:outline-2 focus-visable:outline-offset-2 focus-visable:outline-green-800'>
                Explore Bills
              </Link>
              <Link
                href='/about'
                className='text-sm font-semibold leading-6 text-gray-900 hover:text-green-800 transition-colors'>
                Learn more <span aria-hidden="true">→</span>
                </Link>
            </div>
          </div>
        </div>


        <div className='mx-auto max-w-7xl pb-24'>
          <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
            <div className='rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow text-center'>
              <div className='flex items-center justify-center'>
                <div className='h-8 w-8 text-green-800'>
                🔔
                </div>
                <h3 className='ml-3 text-lg font-medium text-gray-900'>Search Legislation</h3>
              </div>
              <p className='mt-4 text-sm text-gray-500'>
                Browse and search through federal and state bills with our intuitive interface.
              </p>
            </div>

            <div className='rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow text-center'>
              <div className='flex items-center justify-center'>
                <div className='h-8 w-8 text-green-800'>
                🔔
                </div>
                <h3 className='ml-3 text-lg font-medium text-gray-900'>Track Repersentatives</h3>
              </div>
              <p className='mt-4 text-sm text-gray-500'>
                Follow your repersentatives and see their voting records on bills you care about.
              </p>
            </div>

            <div className='rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow text-center'>
              <div className='flex items-center justify-center'>
                <div className='h-8 w-8 text-green-800'>
                🔔
                </div>
                <h3 className='ml-3 text-lg font-medium text-gray-900'>Bill Notifications</h3>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Get notified when bills you are following change status or come up for a vote.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}