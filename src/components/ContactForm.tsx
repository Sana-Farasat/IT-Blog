"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { client } from "@/sanity/lib/client";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  Name: z.string().min(1).max(50),
  Email: z.string().email(),
  Message: z.string().min(1).max(500),
});

type FormType = z.infer<typeof formSchema>;

const ContactForm = () => {
  const form = useForm<FormType>({
    resolver: zodResolver(formSchema), // combining zod and react hook form through this line
    defaultValues: {
      Name: "",
      Email: "",
      Message: "",
    },
  });

  async function onSubmit(values: FormType) {
    try {
      await client.create({
        _type: "contactForm",
        name: values.Name,
        email: values.Email,
        message: values.Message,
      });

      toast.success("Message Sent!", {
        description: "Your message has been successfully sent.",
      });

      form.reset(); // ✅ Optionally reset the form
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast.error("Submission failed", {
        description: "Something went wrong. Please try again.",
      });
    }

    console.log(values);
  }

  return (
    <div className="max-w-screen-2xl mx-auto flex flex-col justify-center items-center min-h-screen bg-blue-50 rounded-xl">
      {/* <div className="text-blue-800 font-bold py-6 sm:py-8 text-2xl sm:text-5xl">
        GET IN TOUCH WITH US
      </div>
      <p className="text-gray-400 font-bold pb-2 sm:pb-4 text-sm sm:text-xl">
        For more interesting things about pakistan
      </p> */}
      {/* Center the form vertically and horizontally */}
      <div className="w-full max-w-lg p-6 bg-white border rounded-lg shadow-lg">
        <Form {...form}>
          {" "}
          {/*passing react hook form (...form) in shadecn (Form)--> for validation */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* form.handleSubmit is a method--->react hook form ne bnakr dya hai ye */}
            {/* Name Field */}
            <FormField
              control={form.control}
              name="Name" // "Name" jo zod k formSchema m lkha hai
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormLabel className="text-xl   text-blue-800 font-bold ">
                    Name
                  </FormLabel>
                  <div className="flex justify-center">
                    <FormControl className=" w-full max-w-lg border-blue-800 placeholder:text-blue-800 ">
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                  </div>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                  {/*Error message show krega jese field blank submit ki tw require ka error dega */}
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={form.control}
              name="Email" // "Email" jo zod k formSchema m lkha hai
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormLabel className="text-xl text-blue-800 font-bold ">
                    Email
                  </FormLabel>
                  <div className="flex justify-center">
                    <FormControl className="w-full max-w-lg border-blue-800 placeholder:text-blue-800">
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                  </div>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                  {/*Error message show krega jese field blank submit ki tw require ka error dega */}
                </FormItem>
              )}
            />

            {/* Message Field */}
            <FormField
              control={form.control}
              name="Message" // "Message" jo zod k formSchema m lkha hai
              render={({ field }) => (
                <FormItem className="text-center">
                  <FormLabel className="text-xl text-blue-800 font-bold ">
                    Message
                  </FormLabel>
                  <div className="flex justify-center">
                    <FormControl className=" w-full max-w-lg h-32 border-blue-800 placeholder:text-blue-800">
                      <Textarea
                        placeholder="Type your message here...."
                        //   className="resize-none"
                        {...field}
                      />

                      {/* <Input placeholder="Type your message here...." {...field} /> */}
                    </FormControl>
                  </div>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                  {/*Error message show krega jese field blank submit ki tw require ka error dega */}
                </FormItem>
              )}
            />

            <div className="flex justify-center">
              <Button
                type="submit"
                className="px-10 py-6 text-xl bg-blue-900 text-white hover:text-white hover:bg-blue-600"
              >
                Submit
              </Button>{" "}
              {/*  ye </form> k uper hona chaiye bahir nh warna form submit nahi hoga */}
            </div>
          </form>
        </Form>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default ContactForm;
