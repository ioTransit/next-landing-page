import axios from "axios";
import { downloadZip } from "client-zip";
import Head from "next/head";
import { env } from "~/env.mjs";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { z } from "zod";
import { Button } from "~/components/button";
import { Select, SelectItem } from "~/components/select";
import { agencies, states } from "~/config";

const gtfsToGeojsonFormId = "gtfs-to-geojson-form";
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
    url: z.string().url(),
  });
type CheckValidatorType = z.infer<typeof checkValidator>;

export default function GTFSToGeoJson() {
  // const [url, setUrl] = useState("https://www.metrostlouis.org/Transit/google_transit.zip");
  const { handleSubmit, formState: { errors }, register } = useForm();

  const [verified, setVerified] = useState(false);
  const [_agencies, setAgencies] = useState<typeof agencies | null>(null);
  const [agency, setAgency] = useState<SelectItem | null>(null);

  const onSubmit: SubmitHandler<CheckValidatorType> = async (data) => {
    try {

      const addContact = await axios.post("https://hook.us1.make.com/3rd3kck1q73jx0pq5ddu2nrygkrnx63a", {
        email: data.email,
        name: data.name,
        agency: agency?.name,
        city: agency?.city,
        state: agency?.state
      })

      const convertGTFS = await (await fetch('api/gtfs-to-geojson', { method: 'POST', body: JSON.stringify({ url: data.url }) })).json()
      console.log(convertGTFS)
      if (addContact.status === 200 && convertGTFS) {
        const stops = { name: "stops.json", lastModified: new Date(), input: JSON.stringify(convertGTFS.stopsGeojson) }
        const routes = { name: "routes.json", lastModified: new Date(), input: JSON.stringify(convertGTFS.routesGeojson) }
        const trips = { name: "trips.json", lastModified: new Date(), input: JSON.stringify(convertGTFS.tripsGeojson) }
        const blob = await downloadZip([stops, routes, trips]).blob()

        // make and click a temporary link to download the Blob
        const link = document.createElement("a")
        link.href = URL.createObjectURL(blob)
        link.download = "gtfs-geojson.zip"
        link.click()
        link.remove()
        toast.success("Thanks for signing up!")
      }
      else toast.error("Something went wrong")
    } catch (e) {
      console.error(e)
      toast.error("Something went wrong")

    }
  }

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
          Convert your GTFS files to GeoJSON
        </h2>
        <form
          id={gtfsToGeojsonFormId}
          className="mt-16 grid w-full sm:w-3/5 lg:w-2/5 inset-0 bg-gray-200 rounded-lg p-10 m-auto  text-gray-700"
          // @ts-expect-error idk what is going on 
          onSubmit={handleSubmit(onSubmit)} // eslint-disable-line
        >
          <div className="w-full  gap-5 grid">
            <label className="pb-2" htmlFor={'name'}>
              Name
              <input
                {...register('name')}
                type='string'
                name='name'
                className="h-6 py-6 px-4 w-full border rounded-md"
              />
            </label>
            {errors.name?.message && typeof errors.name?.message === "string" && <p className="text-red-500 px-3">{errors.name?.message}</p>}
            {/* <ValidatedInput type="email" name="email" label="Email" error={errors.email?.message} /> */}
            <label className="pb-2" htmlFor={'email'}>
              Email
              <input
                {...register('email')}
                type='email'
                name='email'
                className="h-6 py-6 px-4 w-full border rounded-md"
              />
            </label>
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


            <input {...register('verified')} value={verified.toString()} type="hidden" />
            <label className="pb-2" htmlFor={'email'}>
              GTFS URL
              <input {...register('url')} type="text" className="h-6 py-6 px-4 w-full border rounded-md"
              />
            </label>
            <div className="flex w-full justify-center items-center">
              <input
                type="checkbox"
                name="updateSignup"
                defaultChecked
                className="h-6 py-6 px-4 w-full border rounded-md"
              ></input>
              <label htmlFor="updateSignup">
                Would you like to get updates?
              </label>
            </div>
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
