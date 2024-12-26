import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SigninValidation } from "@/lib/validation"

import welcomeImage from '@/assets/images/welcome.png';
import Loader from "@/components/shared/Loader"


const SigninForm = () => {
  const isLoading = false;

   // 1. Define your form.
   const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SigninValidation>) {
    //const newUser = await createUserAccount(values);
    console.log(values)
  }

  return (
      <Form {...form}>
       <div className="sm:w-420 flex-center flex-col">
       <img src={welcomeImage} alt="Welcome" className = 'w-48'/>

       <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Login to your account.</h2>
       <p className='text-dark-3 small-medium md:base-regular mt-2'>Welcome back!</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" className='shad-input' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className='shad-input' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="shad-button_primary">
          {isLoading ? (
            <div className="flex-center gap-2">
              <Loader/>Loading...
            </div>

          ): "Sign up"}
        </Button>
        <p className="text-small-regular text-dark-2 text-center mt-2">
          Don't have an account?
          <Link to="/sign-up" className="text-primary-500 text-small-semibold ml-1">Sign up</Link>
        </p>
      </form>
    </div>
    </Form>
  )
}

export default SigninForm