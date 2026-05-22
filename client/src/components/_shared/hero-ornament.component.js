export default function HeroOrnamentComponent() {
  return (
    <svg
      viewBox="0 0 160 170"
      fill="none"
      aria-hidden="true"
      className="la-ornament h-full w-full"
    >
      <path
        className="la-ornament__arc"
        d="M68 19C103 19 131 47 131 82V154"
        stroke="rgba(197,155,85,0.62)"
        strokeWidth="1.4"
      />
      <path
        className="la-ornament__arc"
        d="M79 28C105 28 126 49 126 75V154"
        stroke="rgba(197,155,85,0.52)"
        strokeWidth="1.1"
      />
      <path
        className="la-ornament__arc"
        d="M90 38C109 38 123 53 123 72V154"
        stroke="rgba(197,155,85,0.45)"
        strokeWidth="1.1"
      />
      <path
        className="la-ornament__arc"
        d="M100 48C114 48 123 59 123 73V154"
        stroke="rgba(197,155,85,0.36)"
        strokeWidth="1"
      />
      <circle
        className="la-ornament__center"
        cx="131"
        cy="53"
        r="3.8"
        fill="rgba(197,155,85,0.72)"
      />
      {[
        [131, 8],
        [103, 18],
        [88, 43],
        [88, 71],
        [104, 95],
        [131, 104],
        [156, 94],
        [158, 52],
        [156, 13],
      ].map(([x, y], index) => (
        <path
          key={`${x}-${y}-${index}`}
          className="la-ornament__ray"
          d={`M131 53L${x} ${y}`}
          stroke="rgba(197,155,85,0.48)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
