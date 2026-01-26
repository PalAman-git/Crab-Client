'use client'
import { FormEvent, useState } from "react"
import { useRouter } from 'next/navigation'
import { Eye, EyeClosed } from "lucide-react"

export default function RegisterPage() {
    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name = formData.get('name')?.toString().trim();
        const email = formData.get('email')?.toString().trim();
        const password = formData.get('password')?.toString().trim();

        if (!name || !email || !password) {
            alert("Please enter required details");
            return;
        }

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({name, email, password }),
            })

            if (response.ok) {
                router.push('/dashboard')
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Signup failed')
            }
        } catch (err: any) {
            console.error('Signup error: ', err);
            alert('Network error - check console');
        }
    }

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

    return (


        <section className="grid text-center h-screen items-center p-8">
            <div>
                {/* Heading */}
                <h3 className="text-blue-gray-700 text-3xl font-semibold mb-2">
                    Sign Up
                </h3>

                {/* Form */}
                <form action="#" onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left">

                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-2 font-medium text-muted-foreground text-sm">
                            What should we call you?
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="w-full px-4 py-3 border border-blue-gray-200 rounded-md focus:border-t-primary focus:ring-1 focus:ring-t-primary placeholder-opacity-100"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 font-medium text-muted-foreground text-sm">
                            Your Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="w-full px-4 py-3 border border-blue-gray-200 rounded-md focus:border-t-primary focus:ring-1 focus:ring-t-primary placeholder-opacity-100"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block mb-2 font-medium text-muted-foreground text-sm">
                            Password
                        </label>

                        <div className="relative">

                            <input
                                id="password"
                                name="password"
                                type={passwordShown ? "text" : "password"}
                                className="w-full px-4 py-3 border border-blue-gray-200 rounded-md focus:border-t-primary focus:ring-1 focus:ring-t-primary placeholder-opacity-100"
                                required
                            />
                            <span
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-foreground"
                                onClick={togglePasswordVisiblity}
                            >
                                {passwordShown ? (
                                    <Eye className="h-5 w-5" />
                                ) : (
                                    <EyeClosed className="h-5 w-5" />
                                )}
                            </span>
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="w-full mt-6 py-3 bg-accent text-accent-foreground rounded-md hover:bg-accent-hover transition-colors cursor-pointer"
                    >
                        Sign In
                    </button>

                    <div className="mt-4! flex justify-end">
                        <a
                            href="#"
                            className="text-blue-gray-700 font-medium text-sm hover:underline"
                        >
                            Forgot password
                        </a>
                    </div>

                    <button
                        type="button"
                        className="w-full mt-6 flex h-12 items-center justify-center gap-2 border border-card rounded-md hover:bg-card transition-colors"
                    >
                        <img
                            src="https://www.material-tailwind.com/logos/logo-google.png"
                            alt="google"
                            className="h-6 w-6"
                        />{" "}
                        Sign in with Google
                    </button>

                    <p className="text-muted-foreground text-sm mt-4 text-center">
                        Not registered?{" "}
                        <a href="#" className="font-medium text-foreground hover:underline">
                            Create account
                        </a>
                    </p>
                </form>
            </div>
        </section>
    )
}