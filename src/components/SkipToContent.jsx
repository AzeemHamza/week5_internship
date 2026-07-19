export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-indigo-600 text-white px-4 py-2 rounded-lg"
    >
      Skip to content
    </a>
  );
}