import { useEffect } from "react";

interface PricingRedirectProps {
  target: string;
}

export default function PricingRedirect({ target }: PricingRedirectProps) {
  useEffect(() => {
    window.location.replace(target);
  }, [target]);

  return null;
}
