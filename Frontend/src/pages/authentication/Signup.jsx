import { Link } from "react-router-dom";
function Signup() {
    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
                    {/* <!-- Header --> */}
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Create an account</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Already have an account?
                            <Link to='/Login' className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">Sign in</Link>
                        </p>
                    </div>

                    {/* <!-- Form --> */}
                    <form className="space-y-5">
                        {/* <!-- Name Field --> */}
                        <div>
                            <label for="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input type="text" id="name" name="name" required
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                placeholder="John Doe" />
                        </div>

                        {/*role*/}
                        <div>
                            <label for="role" className="block text-sm font-medium text-gray-700">Role</label>
                            <select id="role" name="role" required
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                                <option value="" className='text-gray-600'>Select Role</option>
                                <option value="customer" className='text-gray-600'>Customer</option>
                                <option value="provider" className='text-gray-600'>Provider</option>
                            </select>
                        </div>

                        {/* <!-- Email Field --> */}
                        <div>
                            <label for="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" id="email" name="email" required
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                placeholder="you@example.com" />
                        </div>



                        {/* <!-- Password Field --> */}
                        <div>
                            <label for="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input type="password" id="password" name="password" required
                                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                                placeholder="••••••••" />
                        </div>
                        {/* 
      <!-- Terms & Conditions Checkbox --> */}
                        <div className="flex items-center">
                            <input type="checkbox" id="terms" name="terms" required
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label for="terms" className="ml-2 block text-sm text-gray-600">
                                I agree to the
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">Terms of Service</a>
                                and
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">Privacy Policy</a>
                            </label>
                        </div>

                        {/* <!-- Submit Button --> */}
                        <div>
                            <button type="submit"
                                className="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-200">
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}

export default Signup;