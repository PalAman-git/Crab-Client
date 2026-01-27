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
                
                <h3 className="text-blue-gray-700 text-3xl font-semibold mb-10">
                    Sign Up
                </h3>
                
                <form action="#" onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left">

                    <div className="mb-6">
                        <label htmlFor="name" className="block mb-1 font-medium text-muted-foreground text-sm">
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

                    
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-1 font-medium text-muted-foreground text-sm">
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

                   
                    <div className="mb-6 relative">
                        <label htmlFor="password" className="block mb-1 font-medium text-muted-foreground text-sm">
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
                        className="w-full mt-4 py-3 bg-accent text-accent-foreground rounded-md hover:bg-accent-hover transition-colors cursor-pointer"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </section>
    )
}