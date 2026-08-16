import type { Metadata } from "next";
import { Compass } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { CtaLink } from "@/components/ui/CtaLink";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-32">
      <EmptyState
        icon={Compass}
        title="Page Not Found"
        description="The page you're looking for doesn't exist or may have moved."
        action={<CtaLink href="/">Back to Home</CtaLink>}
      />
    </Container>
  );
}
