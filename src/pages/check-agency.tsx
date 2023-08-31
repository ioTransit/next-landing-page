import { useState } from "react";
import { Select, type SelectItem } from "~/components/select";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "~/components/button";
import ReCAPTCHA from "react-google-recaptcha";
import { type SubmitHandler, useForm } from "react-hook-form";
import { agencies } from "~/config";
import axios from "axios";
import Head from "next/head";
import { env } from "~/env.mjs";

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


const states = [
  { "id": "AL", "name": "Alabama" },
  { "id": "AK", "name": "Alaska" },
  { "id": "AZ", "name": "Arizona" },
  { "id": "AR", "name": "Arkansas" },
  { "id": "CA", "name": "California" },
  { "id": "CO", "name": "Colorado" },
  { "id": "CT", "name": "Connecticut" },
  { "id": "DE", "name": "Delaware" },
  { "id": "FL", "name": "Florida" },
  { "id": "GA", "name": "Georgia" },
  { "id": "HI", "name": "Hawaii" },
  { "id": "ID", "name": "Idaho" },
  { "id": "IL", "name": "Illinois" },
  { "id": "IN", "name": "Indiana" },
  { "id": "IA", "name": "Iowa" },
  { "id": "KS", "name": "Kansas" },
  { "id": "KY", "name": "Kentucky" },
  { "id": "LA", "name": "Louisiana" },
  { "id": "ME", "name": "Maine" },
  { "id": "MD", "name": "Maryland" },
  { "id": "MA", "name": "Massachusetts" },
  { "id": "MI", "name": "Michigan" },
  { "id": "MN", "name": "Minnesota" },
  { "id": "MS", "name": "Mississippi" },
  { "id": "MO", "name": "Missouri" },
  { "id": "MT", "name": "Montana" },
  { "id": "NE", "name": "Nebraska" },
  { "id": "NV", "name": "Nevada" },
  { "id": "NH", "name": "New Hampshire" },
  { "id": "NJ", "name": "New Jersey" },
  { "id": "NM", "name": "New Mexico" },
  { "id": "NY", "name": "New York" },
  { "id": "NC", "name": "North Carolina" },
  { "id": "ND", "name": "North Dakota" },
  { "id": "OH", "name": "Ohio" },
  { "id": "OK", "name": "Oklahoma" },
  { "id": "OR", "name": "Oregon" },
  { "id": "PA", "name": "Pennsylvania" },
  { "id": "RI", "name": "Rhode Island" },
  { "id": "SC", "name": "South Carolina" },
  { "id": "SD", "name": "South Dakota" },
  { "id": "TN", "name": "Tennessee" },
  { "id": "TX", "name": "Texas" },
  { "id": "UT", "name": "Utah" },
  { "id": "VT", "name": "Vermont" },
  { "id": "VA", "name": "Virginia" },
  { "id": "WA", "name": "Washington" },
  { "id": "WV", "name": "West Virginia" },
  { "id": "WI", "name": "Wisconsin" },
  { "id": "WY", "name": "Wyoming" }
]


const agencySignupId = "agency-signup";

export default function JoinPage() {
  const [verified, setVerified] = useState(false);
  const [_agencies, setAgencies] = useState<typeof agencies | null>(null);
  const [agency, setAgency] = useState<SelectItem | null>(null);

  const { handleSubmit, formState: { errors }, register } = useForm();  const onSubmit: SubmitHandler<CheckValidatorType> = async (data) => {
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
      <Head>
        <title>TransitChat</title>
        <meta name="description"
          content="TransitChat is a platform that makes it easier for transit 
        agencies to communicate with their riders and improve 
        their services by organizing issues in one place."
        />
      </Head>
      <div className="h-full w-full relative pb-20">
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
        <h2 className=" text-center text-3xl pt-12 text-gray-700">
          Check to See if you agency is available
        </h2>
        <form
          id={agencySignupId}
          className="mt-16 grid w-full sm:w-3/5 lg:w-2/5 inset-0 bg-gray-200 rounded-lg p-10 m-auto  text-gray-700"
          // @ts-expect-error idk what is going on 
          onSubmit={handleSubmit(onSubmit)} // eslint-disable-line
        >
          <div className="w-full  gap-5 grid">

            {/* <ValidatedInput type="string" name="name" label="Name" error={errors.name?.message} /> */}
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
            {/* <ValidatedInput type="email" name="email" label="Email" error={errors.email?.message} /> */}
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
            {_agencies && <Select
              options={_agencies}
              name='agency'
              error={undefined}
              onChange={onAgencyChange}
              label='Agency' />}
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
