import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-screen px-4 py-12 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl overflow-hidden rounded-lg">
        <div className="px-6 py-8">
          <h1 className="mb-6 text-3xl font-bold">Terms and Conditions</h1>

          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">1. Introduction</h2>
            <p className="mb-2">
              Welcome to [Your Company Name] (&quot;Company&quot;,
              &quot;we&quot;, &quot;our&quot;, &quot;us&quot;). These Terms and
              Conditions govern your use of our website located at [website URL]
              (together or individually &quot;Service&quot;) operated by [Your
              Company Name].
            </p>
            <p className="">
              By accessing or using our Service, you agree to be bound by these
              Terms. If you disagree with any part of the terms, then you may
              not access the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">2. Use License</h2>
            <p className="mb-2">
              Permission is granted to temporarily download one copy of the
              materials (information or software) on [Your Company Name]&apos;s
              website for personal, non-commercial transitory viewing only. This
              is the grant of a license, not a transfer of title, and under this
              license you may not:
            </p>
            <ul className="mb-2 ml-4 list-inside list-disc">
              <li>modify or copy the materials;</li>
              <li>
                use the materials for any commercial purpose, or for any public
                display (commercial or non-commercial);
              </li>
              <li>
                attempt to decompile or reverse engineer any software contained
                on [Your Company Name]&apos;s website;
              </li>
              <li>
                remove any copyright or other proprietary notations from the
                materials; or
              </li>
              <li>
                transfer the materials to another person or &quot;mirror&quot;
                the materials on any other server.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">3. Disclaimer</h2>
            <p className="mb-2">
              The materials on [Your Company Name]&apos;s website are provided
              on an &apos;as is&apos; basis. [Your Company Name] makes no
              warranties, expressed or implied, and hereby disclaims and negates
              all other warranties including, without limitation, implied
              warranties or conditions of merchantability, fitness for a
              particular purpose, or non-infringement of intellectual property
              or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">4. Limitations</h2>
            <p className="">
              In no event shall [Your Company Name] or its suppliers be liable
              for any damages (including, without limitation, damages for loss
              of data or profit, or due to business interruption) arising out of
              the use or inability to use the materials on [Your Company
              Name]&apos;s website, even if [Your Company Name] or a [Your
              Company Name] authorized representative has been notified orally
              or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">
              5. Revisions and Errata
            </h2>
            <p className="">
              The materials appearing on [Your Company Name]&apos;s website
              could include technical, typographical, or photographic errors.
              [Your Company Name] does not warrant that any of the materials on
              its website are accurate, complete or current. [Your Company Name]
              may make changes to the materials contained on its website at any
              time without notice. [Your Company Name] does not, however, make
              any commitment to update the materials.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">6. Governing Law</h2>
            <p className="">
              These terms and conditions are governed by and construed in
              accordance with the laws of [Your Country] and you irrevocably
              submit to the exclusive jurisdiction of the courts in that State
              or location.
            </p>
          </section>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              If you have any questions about these Terms, please{' '}
              <Link href="/" className="text-blue-600 hover:underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
