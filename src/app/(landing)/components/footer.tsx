import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-10 border-t bg-background py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between text-sm md:flex-row">
          <div className="space-x-4">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms">Terms of Use</Link>
          </div>
          <div className="mt-4 md:mt-0">
            <p>© {currentYear} ClipSync. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
