import Link from "next/link";

export default function Header() {
  const getLinkStyle = () => {
    return "font-medium transition-colors hover:underline";
  };

  return (
    <header className="mb-16">
      <div className="flex justify-between items-center">
        <div>
          <Link href="/">
            <h1 
              className="font-bold transition-colors hover:underline cursor-pointer" 
              style={{ color: '#655cd6', fontSize: '20px' }}
            >
              Robin
            </h1>
          </Link>
        </div>
        <nav className="flex space-x-8">
          <Link
            href="/contact"
            className={getLinkStyle()}
            style={{ 
              color: '#655cd6',
              fontSize: '20px'
            }}
          >
            联系
          </Link>
          <Link
            href="/about"
            className={getLinkStyle()}
            style={{ 
              color: '#655cd6',
              fontSize: '20px'
            }}
          >
            关于
          </Link>
        </nav>
      </div>
    </header>
  );
}
