`use client`

import Navbar from '@/components/ui/Navbar';

export default function AboutPage() {
    return (
        <main className='min-h-screen bg-gray-50'>
            <Navbar />

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='mb-12 text-center'>
                    <h1 className='text-4xl font-bold text-gray-900 mb-4'>About PoliView</h1>
                    <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                        Making legislative information accessible and understandable for everyone.
                    </p>
                </div>

                <div className='bg-white shadow-sm rounded-lg p-8 mb-10'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-4'>Our Mission</h2>
                    <div className='prose max-w-none text-gray-600'>
                        <p>
                            PoliView seeks to address a critical information issue in our democracy: the growing levels of 
                            political disengagement perpetuated by a lack of unbiased, simple information regarding
                            legislative activities in the US at both federal and state levels.
                        </p>
                        <p className='mt-4'>
                            We believe that an informed citizenry is essential for a functioning democracy. By making
                            legislative information more accessible, we hope to encourage greater civic participation
                            and engagement.
                        </p>
                    </div>
                </div>

                <div className='mb-10'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-6'>Our Team</h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        <div className='bg-white shadow-sm rounded-lg p-6 text-center'>
                            <div className='w-24 h-24 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center'>
                                <span className='text-green-800 text-2xl'>MK</span>
                            </div>
                            <h3 className='text-xl font-medium text-gray-900'>Mahad Khan</h3>
                            <p className='text-gray-500 mb-3'>Lead Developer</p>
                            <p className='text-sm text-gray-600'>
                                University of Maryland student passionate about making websites. 
                            </p>
                        </div>

                        <div className='bg-white shadow-sm rounded-lg p-6 text-center'>
                            <div className='w-24 h-24 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center'>
                                <span className='text-green-800 text-2xl'>MK</span>
                            </div>
                            <h3 className='text-xl font-medium text-gray-900'>Mahad Khan</h3>
                            <p className='text-gray-500 mb-3'>Lead Front-End Engineer</p>
                            <p className='text-sm text-gray-600'>
                                University of Maryland student passionate about the front-end.
                            </p>
                        </div>

                        <div className='bg-white shadow-sm rounded-lg p-6 text-center'>
                            <div className='w-24 h-24 rounded-full bg-green-100 mx-auto mb-4 flex items-center justify-center'>
                                <span className='text-green-800 text-2xl'>MK</span>
                            </div>
                            <h3 className='text-xl font-medium text-gray-900'>Mahad Khan</h3>
                            <p className='text-gray-500 mb-3'>Lead Back-End Engineer</p>
                            <p className='text-sm text-gray-600'>
                                University of Maryland student passionate about the back-end. 
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-sm rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                    <p className="text-gray-600 mb-6">
                        Have questions or suggestions about PoliView? We'd love to hear from you!
                    </p>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <div className="text-center p-4 rounded-lg bg-green-50">
                            <h3 className="font-medium text-gray-900 mb-2">Email</h3>
                            <p className="text-gray-600">mkhan142@terpmail.umd.edu</p>
                        </div>
                        
                        <div className="text-center p-4 rounded-lg bg-green-50">
                            <h3 className="font-medium text-gray-900 mb-2">GitHub</h3>
                            <p className="text-gray-600">github.com/sprincee</p>
                        </div>
                        
                        <div className="text-center p-4 rounded-lg bg-green-50">
                            <h3 className="font-medium text-gray-900 mb-2">Twitter</h3>
                            <p className="text-gray-600">@poliview</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
