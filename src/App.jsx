import { Hero, Highlights, Model, Navbar, Features, HowItWorks, Footer } from "./components"
import * as Sentry from "@sentry/react";

function App() {

  // return <button onClick={() => {throw new Error("This is your first error!");}}>Break the world</button>;

  return (
    <main className="bg-black">

      <Navbar />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
      <Footer />

    </main>
  )
}

export default Sentry.withProfiler(App)
