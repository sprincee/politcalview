import AuthForm from '@/components/AuthForm'
import Navbar from '@/components/ui/Navbar'

export default function LoginPage() {
    return (
        <main className='min-h-screen bg-gray-50'>
            <Navbar />
            <div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                    <h2 className='mt-6 text-center text-3xl font-bold text-gray-900'>
                        Sign into your account
                    </h2>
                    <p className='mt-2 text-center text-sm text-gray-600'>
                        Track legislation and get notfied about bills you care about
                    </p>
                </div>

                <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
                    <div className='bg-white py-8 px-4 shadow-sm sm:rounded-lg sm:px-10 border border-gray-200'>
                        <AuthForm mode="signin" />
                    </div>
                </div>
            </div>
        </main>
    )
}
    