import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { mediaKit } from "@/data/media";
import { artist } from "@/data/artist";
import { ContactForm } from "@/components/contact/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Contact",
  description: `Booking, collaboration, production and media inquiries for ${artist.name}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const contactEmail = mediaKit.contactEmail || "[BOOKING_EMAIL]";

  return (
    <Container className="grid grid-cols-1 gap-16 py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
      <div className="flex flex-col gap-6">
        <SectionHeading
          eyebrow="Get In Touch"
          title="Work With Garv"
          description="Bookings, collaborations, production work and media inquiries — send a few details and expect a reply soon."
          as="h1"
        />
        <div className="flex items-center gap-3 text-sm text-paper/80">
          <Mail className="size-4 text-ember" aria-hidden="true" />
          <span>{contactEmail}</span>
        </div>
      </div>

      <ContactForm />
    </Container>
  );
}
