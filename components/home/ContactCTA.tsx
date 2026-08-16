import { CtaLink } from "@/components/ui/CtaLink";
import { Waveform } from "@/components/ui/Waveform";
import { Container } from "@/components/ui/Container";

export function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-charcoal py-24 sm:py-32">
      <Waveform bars={70} className="absolute inset-x-0 top-0 h-20 w-full text-ember/[0.08]" />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <h2 className="font-display text-4xl text-paper sm:text-5xl">Work With Garv</h2>
        <p className="max-w-xl text-pretty text-base leading-relaxed text-ash">
          For bookings, collaborations, production work, or media inquiries — reach out directly
          and the team will follow up.
        </p>
        <CtaLink href="/contact" showArrow>
          Get In Touch
        </CtaLink>
      </Container>
    </section>
  );
}
