import Link from "next/link";
import { socials } from "@/data/portfolio";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Link href="/" className="footer-name">
          Bijay<span>.</span>
        </Link>
        <p>
          Built with curiosity.
          <br />
          From Pokhara, Nepal.
        </p>
        <div>
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Bijay Timilsina</span>
        <span>Code. Create. Play. Repeat.</span>
        <a href="#main">Back to top</a>
      </div>
    </footer>
  );
}
