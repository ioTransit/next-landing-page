import { useState } from "react";
import { Select, type SelectItem } from "~/components/select";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "~/components/button";
import ReCAPTCHA from "react-google-recaptcha";
import { type SubmitHandler, useForm } from "react-hook-form";
import { agencies, states } from "~/config";
import axios from "axios";
import { env } from "~/env.mjs";
import { MetaHeader } from "~/components/meta";

export const meta = () => [
  { title: "TransitChat - Let's make transit better" },
];


export const checkValidator =
  z.object({
    email: z
      .string()
      .min(5, { message: "Email is required" })
      .email("Must be a valid email"),
    name: z.string().min(3),
    state: z.string().transform((data) => z.object({ name: z.string(), id: z.string() }).parse(JSON.parse(data))),
    agency: z.string(),
    updateSignup: z.enum(["on"]).optional(),
    verified: z.enum(["true"]),
  });
type CheckValidatorType = z.infer<typeof checkValidator>;




const agencySignupId = "agency-signup";

export default function JoinPage() {
  const [verified, setVerified] = useState(false);
  const [_agencies, setAgencies] = useState<typeof agencies | null>(null);
  const [agency, setAgency] = useState<SelectItem | null>(null);

  const { handleSubmit, formState: { errors }, register } = useForm();
  const onSubmit: SubmitHandler<CheckValidatorType> = async (data) => {
    try {

      const resp = await axios.post("https://hook.us1.make.com/3rd3kck1q73jx0pq5ddu2nrygkrnx63a", {
        email: data.email,
        name: data.name,
        agency: agency?.name,
        city: agency?.city,
        state: agency?.state
      })
      if (resp.status === 200) toast.success("Thanks for signing up!")
      else toast.error("Something went wrong")
    } catch (e) {
      toast.error("Something went wrong")
    }
  };

  const onStateChange = (e: SelectItem) => {
    if (!e.id) {
      return
    } else {
      setAgencies(agencies.filter((agency) => agency.state === e.id))
    }
  }
  const onAgencyChange = (e: SelectItem) => {
    if (!e.name) {
      return
    } else {
      setAgency(e)
    }
  }


  return (
    <>
      <MetaHeader />
      <div className="h-full w-full relative pb-20 gap-10 grid md:flex md:flex-row-reverse md:items-start">
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
        <div className="grid w-3/4 max-w-[500px] mx-auto md:mt-10 gap-10">
          <h2 className="text-center text-4xl block text-tcOrange drop-shadow-md bold">
            {"We're just getting started"}
          </h2>
          <p className=" text-gray-700 text-center text-2xl">
            We're out here working hard to bring the best transit collaboration software to you and want to hear from you.
            We we want to hear from you about you about how we can make transit better.
            Sign up below to stay informed and we'll reach out when we are ready.
          </p>
        </div>
        <form
          id={agencySignupId}
          className="max-w-xl grid w-full sm:w-3/5 lg:w-2/5 inset-0 bg-gray-200 rounded-lg p-10 m-auto text-gray-700"
          // @ts-expect-error idk what is going on 
          onSubmit={handleSubmit(onSubmit)} // eslint-disable-line
        >
          <div className="w-full  gap-5 grid">
            <label className="mx-2 pb-2" htmlFor={'name'}>
              Name
            </label>
            <input
              {...register('name')}
              type='string'
              name='name'
              className="h-6 p-6 w-full border rounded-md"
            />
            {errors.name?.message && typeof errors.name?.message === "string" && <p className="text-red-500 px-3">{errors.name?.message}</p>}
            <label className="mx-2 pb-2" htmlFor={'email'}>
              Email
            </label>
            <input
              {...register('email')}
              type='email'
              name='email'
              className="h-6 p-6 w-full border rounded-md"
            />
            {errors.email?.message && typeof errors.email?.message === "string" && <p className="text-red-500 px-3">{errors.email?.message}</p>}
            <Select
              options={states}
              name="state"
              error={undefined}
              label='State'
              onChange={onStateChange}
            />
            <input hidden {...register('state')} value={agency ? agency?.state : undefined} />
            <Select
              options={_agencies ?? []}
              disabled={!_agencies || _agencies?.length === 0}
              name='agency'
              error={undefined}
              onChange={onAgencyChange}
              label='Agency' />
            <div className="flex w-full justify-center items-center">
              <input
                type="checkbox"
                name="updateSignup"
                defaultChecked
                className="h-4 w-4 mx-3 rounded-full shadow"
              ></input>
              <label htmlFor="updateSignup">
                Would you like to get updates?
              </label>
            </div>

            <input {...register('verified')} value={verified.toString()} type="hidden" />
            <ReCAPTCHA
              className="m-auto child:m-auto child:w-full"
              sitekey={env.NEXT_PUBLIC_RECAPTCHA}
              onChange={(e) => setVerified(e ? true : false)}
            />
            <Button disabled={!verified ? true : false} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
