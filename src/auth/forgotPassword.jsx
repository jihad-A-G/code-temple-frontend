import { Link,useFetcher } from "react-router-dom"
import logo from '../assets/svgs/logo.svg'

const ForgotPassword = () =>{
    const fetcher = useFetcher()
    return(
        <>
        <div className="bg-main text-white flex min-h-screen flex-col items-center pt-16 sm:justify-center sm:pt-0">
  <Link to="/">
    <div className="text-foreground font-semibold text-2xl tracking-tighter mx-auto flex items-center gap-2">
      <div>
        <img src={logo} alt="" />
      </div>
      Code Temple
    </div>
  </Link>
  <div className="relative mt-12 w-full max-w-lg sm:mt-10">
    <div className="bg-secondary mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
      <div className="flex flex-col p-6">
        <h3 className="text-xl font-semibold leading-6 tracking-tighter">
          Enter your email
        </h3>
        <p className="mt-1.5 text-sm font-medium text-white/50">
          We'll send you an email to reset your password
        </p>
      </div>
      <div className="p-6 pt-0">
        <fetcher.Form method="POST">
          <div>
            <div>
              <div className="group relative rounded-lg border focus-within:border-sky-200 px-3 pb-1.5 pt-2.5 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                <div className="flex justify-between">
                  <label className="text-xs font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                    Email
                  </label>
                  <div className="absolute right-3 translate-y-2 text-green-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  autoComplete="off"
                  className="block w-full border-0 bg-transparent p-0 text-sm file:my-1 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:font-medium placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                />
              </div>
            </div>
          </div>
          
          
          <div className="mt-4 flex items-center justify-end gap-x-2">
           
            <button
              className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-10 px-4 py-2"
              type="submit"
            >
              Send
            </button>
          </div>
        </fetcher.Form>
      </div>
    </div>
  </div>
</div>

        </>

    )
}

export default ForgotPassword