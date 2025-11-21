'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

const schema = z.object({
  email: z.string().email({ message: '???? ???????? ??? ????' }),
  password: z.string().min(6, { message: '???? ?????? 6 ????' }),
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (values: FormValues) => {
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      setError(error.message);
    } else {
      window.location.href = '/';
    }
  };

  const signInWithGoogle = async () => {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="mb-4 text-2xl font-bold">????? ??????</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm">?????? ??????????</label>
          <input
            dir="ltr"
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 outline-none ring-orange-200 focus:ring-2"
            placeholder="you@example.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1 block text-sm">???? ??????</label>
          <input
            type="password"
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 outline-none ring-orange-200 focus:ring-2"
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          disabled={isSubmitting}
          className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 disabled:opacity-60"
        >
          ????
        </button>
      </form>

      <div className="mt-4 grid gap-2">
        <button
          onClick={signInWithGoogle}
          className="w-full rounded-lg border border-zinc-200 px-4 py-2 hover:bg-zinc-50"
        >
          ?????? ??? Google
        </button>
        <Link
          href="/otp"
          className="w-full rounded-lg border border-zinc-200 px-4 py-2 text-center hover:bg-zinc-50"
        >
          ?????? ???? ??????
        </Link>
      </div>

      <div className="mt-4 flex justify-between text-sm">
        <Link href="/register" className="text-orange-600 hover:underline">
          ????? ???? ????
        </Link>
        <Link href="/forgot-password" className="text-zinc-700 hover:underline">
          ???? ???? ???????
        </Link>
      </div>
    </div>
  );
}

