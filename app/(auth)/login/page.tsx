'use client'
import { FormEvent, useState } from "react"
import { Eye, EyeClosed } from "lucide-react"
import { useLoginMutation } from "@/queries/auth/auth.mutations"

export default function LoginPage() {
    const { mutate:login,isPending,error } = useLoginMutation();
    const [passwordShown, setPasswordShown] = useState(false);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email')?.toString().trim();
        const password = formData.get('password')?.toString().trim();

        if (!email || !password)  return;

        login({email,password});
    }

    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

    return (
        <section className="grid text-center h-screen items-center p-8">
            <div>
                {/* Heading */}
                <h3 className="text-blue-gray-700 text-3xl font-semibold mb-2">
                    Login
                </h3>

                {/* Form */}
                <form action="#" onSubmit={handleSubmit} className="mx-auto max-w-[24rem] text-left">
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
                        disabled={isPending}
                        className="w-full mt-6 py-3 bg-accent text-accent-foreground rounded-md hover:bg-accent-hover transition-colors cursor-pointer"
                    >
                       {isPending ? "Logging in..." : "Log In"}
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