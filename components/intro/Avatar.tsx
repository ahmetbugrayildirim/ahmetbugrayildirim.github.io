import photo from '@/assets/bugra-headshot.webp';

/**
 * Bugra, seated and typing.
 * The head and shoulders are his real photo with the background removed
 * (assets/bugra-headshot.webp). The chair, the shoulders beyond the photo's
 * edges and the typing arms are drawn here, in the shirt's own colour.
 * Coordinates match the photo: 1122 × 1402.
 */
const SHIRT = '#21253b';      // sampled from the photo's shirt
const SHIRT_LIGHT = '#2f3550';
const SHIRT_DARK = '#121522';

// Torso outline: traps slope from the neck into rounded shoulders, then the
// sides run down behind the desk. Mirrored around the photo's centre (x = 561).
const TORSO =
  'M-180 2100 C-215 1850 -270 1600 -262 1420 C-255 1250 -190 1140 -80 1100 ' +
  'C40 1065 200 1020 330 995 L792 995 C922 1020 1082 1065 1202 1100 ' +
  'C1312 1140 1377 1250 1384 1420 C1392 1600 1337 1850 1302 2100 Z';
const SKIN = '#dcae95';

export default function Avatar() {
  return (
    <svg className="avatar" viewBox="-340 0 1802 2100" aria-hidden="true">
      <defs>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        {/* Feather the photo's cut edges into the drawn shirt */}
        <linearGradient id="fadeX" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.05" stopColor="#fff" />
          <stop offset="0.95" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="photoFade" maskUnits="userSpaceOnUse" x="0" y="0" width="1122" height="1402">
          <rect width="1122" height="1402" fill="url(#fadeX)" />
        </mask>
        <linearGradient id="chairShine" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.15" />
        </linearGradient>
        <clipPath id="torsoClip">
          <path d={TORSO} />
        </clipPath>
      </defs>
      {/* Chair back */}
      <rect x="-40" y="830" width="1202" height="1330" rx="140" fill="var(--chair)" />
      <rect x="-40" y="830" width="1202" height="1330" rx="140" fill="url(#chairShine)" />

      <g className="avatar-body">
        {/* Athletic frame: sloped traps, rounded delts, broad chest */}
        <path d={TORSO} fill={SHIRT} />

        {/* Soft shading so the muscle reads under the shirt */}
        <g clipPath="url(#torsoClip)">
          <g filter="url(#soft)">
            {/* Light catching the top of the traps and delts */}
            <ellipse cx="-110" cy="1190" rx="120" ry="64" transform="rotate(-28 -110 1190)" fill={SHIRT_LIGHT} />
            <ellipse cx="1232" cy="1190" rx="120" ry="64" transform="rotate(28 1232 1190)" fill={SHIRT_LIGHT} />
            <ellipse cx="150" cy="1060" rx="140" ry="34" transform="rotate(-12 150 1060)" fill={SHIRT_LIGHT} opacity="0.7" />
            <ellipse cx="972" cy="1060" rx="140" ry="34" transform="rotate(12 972 1060)" fill={SHIRT_LIGHT} opacity="0.7" />
            {/* Chest */}
            <ellipse cx="330" cy="1340" rx="190" ry="105" fill={SHIRT_LIGHT} opacity="0.55" />
            <ellipse cx="792" cy="1340" rx="190" ry="105" fill={SHIRT_LIGHT} opacity="0.55" />
          </g>
          <g filter="url(#soft)" fill="none" stroke={SHIRT_DARK} strokeLinecap="round">
            {/* Where the delt meets the chest and arm */}
            <path d="M-20 1150 C-70 1260 -110 1380 -120 1520" strokeWidth="22" opacity="0.8" />
            <path d="M1142 1150 C1192 1260 1232 1380 1242 1520" strokeWidth="22" opacity="0.8" />
            {/* Under the chest */}
            <path d="M120 1470 C260 1540 430 1540 545 1480" strokeWidth="30" opacity="0.7" />
            <path d="M1002 1470 C862 1540 692 1540 577 1480" strokeWidth="30" opacity="0.7" />
            {/* Outer edges turn away from the light */}
            <path d="M-262 1420 C-270 1600 -215 1850 -180 2100" strokeWidth="60" opacity="0.7" />
            <path d="M1384 1420 C1392 1600 1337 1850 1302 2100" strokeWidth="60" opacity="0.7" />
          </g>
        </g>
        {/* Arms reaching to the keyboard */}
        <g className="arm arm-left">
          <path d="M-262 1440 C-300 1700 -200 1905 40 1992 L330 2060 L384 1946 L80 1872 C-80 1800 -126 1640 -106 1480 Z" fill={SHIRT} />
          <path d="M-230 1520 C-240 1660 -190 1780 -90 1850" stroke={SHIRT_DARK} strokeWidth="12" fill="none" opacity="0.6" filter="url(#soft)" />
          <ellipse className="hand" cx="400" cy="2010" rx="80" ry="45" fill={SKIN} />
        </g>
        <g className="arm arm-right">
          <path d="M1384 1440 C1422 1700 1322 1905 1082 1992 L792 2060 L738 1946 L1042 1872 C1202 1800 1248 1640 1228 1480 Z" fill={SHIRT} />
          <path d="M1352 1520 C1362 1660 1312 1780 1212 1850" stroke={SHIRT_DARK} strokeWidth="12" fill="none" opacity="0.6" filter="url(#soft)" />
          <ellipse className="hand" cx="722" cy="2010" rx="80" ry="45" fill={SKIN} />
        </g>
      </g>

      <g className="avatar-head">
        <image href={photo.src} x="0" y="0" width="1122" height="1402" mask="url(#photoFade)" />
      </g>
    </svg>
  );
}
