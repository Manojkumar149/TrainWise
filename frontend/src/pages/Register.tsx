import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { Button, TextField, Flex, Heading } from '@radix-ui/themes'
import * as Label from '@radix-ui/react-label'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { Fragment } from 'react'
import { Transition } from '@headlessui/react'

const registerSchema = z
  .object({
    fullName: z.string().min(2, { message: 'Name is required' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  })

type RegisterData = z.infer<typeof registerSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterData>({ resolver: zodResolver(registerSchema) })

  const onSubmit = (data: RegisterData) => {
    console.log('register', data)
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
            Register
          </Heading>

          <div className="space-y-4">
            <div>
              <Label.Root htmlFor="fullName" className="mb-1 block text-sm font-medium">
                Full Name
              </Label.Root>
              <TextField.Root
                id="fullName"
                placeholder="Jane Doe"
                {...register('fullName')}
                className="w-full transition focus:ring-2 focus:ring-indigo-500"
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
              )}
            </div>

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

            <div>
              <Label.Root htmlFor="confirmPassword" className="mb-1 block text-sm font-medium">
                Confirm Password
              </Label.Root>
              <TextField.Root
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register('confirmPassword')}
                className="w-full transition focus:ring-2 focus:ring-indigo-500"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full transition hover:bg-indigo-600">
            Register
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
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </Transition>
    </div>
  )
}
