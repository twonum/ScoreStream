// app/page.tsx
import Calculator from "../components/Calculator";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>UET GPA Calculator</title>
      </Head>
      <main className="container mx-auto p-4">
        <section id="calculator" className="py-12">
          <Calculator />
        </section>
      </main>
    </div>
  );
}
