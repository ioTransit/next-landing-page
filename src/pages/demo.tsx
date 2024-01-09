import { useState } from "react";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "~/components/button";
import ReCAPTCHA from "react-google-recaptcha";
import { type SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { env } from "~/env.mjs";
import { MetaHeader } from "~/components/meta";
import { useRouter } from "next/router";

export const meta = () => [
  { title: "TransitChat - Let's make transit better" },
];

export const checkValidator = z.object({
  email: z
    .string()
    .min(5, { message: "Email is required" })
    .email("Must be a valid email"),
  name: z.string().min(3),
  updateSignup: z.enum(["on"]).optional(),
  verified: z.enum(["true"]),
});
type CheckValidatorType = z.infer<typeof checkValidator>;

const agencySignupId = "agency-signup";

export default function JoinPage() {
  const [verified, setVerified] = useState(false);
  const { query: searchParams, push } = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const onSubmit: SubmitHandler<CheckValidatorType> = async (data) => {
    try {
      const resp = await axios.post(
        "https://hook.us1.make.com/gfs38jka9key0kg5es19t1299127stgr",
        {
          email: data.email,
          name: data.name,
        }
      );
      if (resp.status === 200) {
        toast.success("Thanks for signing up!");
        push("/demo?completed=true");
      } else toast.error("Something went wrong");
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <MetaHeader />
      <div className="mx-auto grid min-h-[80vh] w-full max-w-[1000px] gap-10 pb-20 md:flex md:flex-row-reverse md:items-start">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          pauseOnHover
          theme="light"
        />
        {!searchParams.completed ? (
          <>
            <div className="mx-auto flex w-full max-w-[500px] flex-col items-center justify-center gap-10 md:my-auto md:w-1/3">
              <h2 className="bold block text-center text-4xl text-tcOrange drop-shadow-md">
                {"We're just getting started"}
              </h2>
              <p className=" text-center text-2xl text-gray-700">
                We're dedicated to delivering top-notch transit collaboration
                software, and your feedback is essential in making transit
                better. Sign up below to stay updated, and we'll reach out when
                we're ready.
              </p>
            </div>
            <form
              id={agencySignupId}
              className="inset-0 m-auto grid w-full max-w-xl rounded-lg bg-gray-200 p-10 text-gray-700 sm:w-3/5 lg:w-1/2"
              // @ts-expect-error idk what is going on
              onSubmit={handleSubmit(onSubmit)} // eslint-disable-line
            >
              <h2 className="bold mb-6 block text-center text-3xl text-gray-600">
                {"Let's Stay in Touch!"}
              </h2>
              <div className="grid  w-full gap-5">
                <label htmlFor={"name"}>
                  Name
                  <input
                    {...register("name")}
                    type="string"
                    name="name"
                    className="h-6 w-full rounded-md border p-6"
                  />
                </label>

                {errors.name?.message &&
                  typeof errors.name?.message === "string" && (
                    <p className="px-3 text-red-500">{errors.name?.message}</p>
                  )}
                <label htmlFor={"email"}>
                  Email
                  <input
                    {...register("email")}
                    type="email"
                    name="email"
                    className="h-6 w-full rounded-md border p-6"
                  />
                </label>
                <div className="mx-auto flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="updateSignup"
                    defaultChecked
                    className="h-6 w-6 rounded-md border"
                  ></input>
                  <label htmlFor="updateSignup">
                    Would you like to get updates?
                  </label>
                </div>

                <input
                  {...register("verified")}
                  value={verified.toString()}
                  type="hidden"
                />
                <ReCAPTCHA
                  className="child:m-auto child:w-full m-auto"
                  sitekey={env.NEXT_PUBLIC_RECAPTCHA}
                  onChange={(e) => setVerified(e ? true : false)}
                />
                <Button disabled={!verified ? true : false} type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="m-auto flex h-[500px] w-[750px] max-w-[90%] items-center rounded-lg text-center md:max-w-[80%]">
            <h2 className="text-4xl">
              Thanks for your interest! We'll reach out soon!
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
