import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Button, TextField, Flex, Heading } from '@radix-ui/themes'
import * as Label from '@radix-ui/react-label'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { Fragment } from 'react'
import { Transition } from '@headlessui/react'

const signInSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
})

type SignInData = z.infer<typeof signInSchema>

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInData>({ resolver: zodResolver(signInSchema) })

  const onSubmit = (data: SignInData) => {
    console.log('sign in', data)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Transition
        show
        as={Fragment}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md"
        >
          <Heading size="6" as="h1" className="text-center">
            Sign In
          </Heading>

          <div className="space-y-4">
            <div>
              <Label.Root htmlFor="email" className="mb-1 block text-sm font-medium">
                Email
              </Label.Root>
              <TextField.Root
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className="w-full transition focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label.Root htmlFor="password" className="mb-1 block text-sm font-medium">
                Password
              </Label.Root>
              <TextField.Root
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className="w-full transition focus:ring-2 focus:ring-indigo-500"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full transition hover:bg-indigo-600">
            Sign In
          </Button>

          <Flex direction="column" gap="2">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-md border p-2 transition hover:bg-gray-100"
            >
              <FaGoogle /> Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-md border p-2 transition hover:bg-gray-100"
            >
              <FaFacebook /> Facebook
            </button>
          </Flex>

          <p className="text-center text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </Transition>
    </div>
  )
}
