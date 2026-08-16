import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { CtaLink } from "@/components/ui/CtaLink";
import { SITE_NAME, SITE_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for ${SITE_NAME}'s official website.`,
  alternates: { canonical: "/terms" },
};

const LAST_UPDATED = "17 August 2026";

export default function TermsPage() {
  return (
    <Container className="flex flex-col gap-16 py-32">
      <SectionHeading eyebrow="Legal" title="Terms & Conditions" as="h1" />

      <div className="flex max-w-[70ch] flex-col gap-10">
        <p className="text-sm text-ash">Last updated: {LAST_UPDATED}</p>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-2xl text-paper">1. Acceptance of Terms</h2>
          <p className="text-pretty leading-relaxed text-paper/85">
            By accessing or using {SITE_URL} (the &quot;Website&quot;), operated by or on behalf of
            {" "}{SITE_NAME} and any affiliated business entities (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;), you agree to be bound by these Terms & Conditions. If you do not agree,
            please do not use the Website.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-2xl text-paper">2. Use of the Website</h2>
          <p className="text-pretty leading-relaxed text-paper/85">
            This Website is provided for informational purposes — including music releases, tour
            dates, press materials, and contact information. You agree to use the Website only for
            lawful purposes and in a manner that does not infringe the rights of, or restrict the
            use of, this Website by any third party.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-2xl text-paper">3. Intellectual Property</h2>
          <p className="text-pretty leading-relaxed text-paper/85">
            All content on this Website — including music, artwork, photographs, videos, logos,
            and written content — is the property of {SITE_NAME} or its respective licensors and
            is protected by applicable copyright and intellectual property laws. No content may be
            reproduced, distributed, or used commercially without prior written permission.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-2xl text-paper">4. Third-Party Links & Services</h2>
          <p className="text-pretty leading-relaxed text-paper/85">
            This Website may contain links to third-party platforms such as Spotify, Apple Music,
            and YouTube for streaming and viewing purposes. We are not responsible for the content,
            policies, or practices of any third-party website or service, and your use of those
            platforms is governed by their own terms and privacy policies.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-2xl text-paper">5. Limitation of Liability</h2>
          <p className="text-pretty leading-relaxed text-paper/85">
            The Website is provided on an &quot;as is&quot; and &quot;as available&quot; basis. We
            make no warranties, express or implied, regarding the accuracy, reliability, or
            availability of the Website, and shall not be liable for any damages arising from your
            use of, or inability to use, the Website.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-2xl text-paper">6. Changes to These Terms</h2>
          <p className="text-pretty leading-relaxed text-paper/85">
            We reserve the right to update or modify these Terms & Conditions at any time without
            prior notice. Continued use of the Website following any changes constitutes your
            acceptance of the revised Terms.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-2xl text-paper">7. Governing Law</h2>
          <p className="text-pretty leading-relaxed text-paper/85">
            These Terms & Conditions shall be governed by and construed in accordance with the laws
            of India, without regard to its conflict of law provisions. Any disputes arising from
            these Terms shall be subject to the exclusive jurisdiction of the courts of India.
          </p>
        </section>

        <section className="flex flex-col gap-3">
          <h2 className="font-display text-2xl text-paper">8. Contact</h2>
          <p className="text-pretty leading-relaxed text-paper/85">
            If you have any questions about these Terms & Conditions, please reach out via our
            contact page.
          </p>
          <div className="mt-2">
            <CtaLink href="/contact" variant="secondary" showArrow>
              Contact Us
            </CtaLink>
          </div>
        </section>
      </div>
    </Container>
  );
}