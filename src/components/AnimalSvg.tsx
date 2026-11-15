import type { AnimalId } from '../data/animals';

interface AnimalSvgProps {
  id: AnimalId;
  silhouette?: boolean;
  className?: string;
}

export function AnimalSvg({ id, silhouette = false, className = 'w-24 h-24' }: AnimalSvgProps) {
  const shadowColor = '#334155';

  if (silhouette) {
    return (
      <svg viewBox="0 0 120 120" className={className} aria-hidden="true" fill={shadowColor}>
        {id === 'kucing' && (
          <g>
            <polygon points="24,52 18,16 50,34" />
            <polygon points="96,52 102,16 70,34" />
            <ellipse cx="60" cy="68" rx="42" ry="38" />
          </g>
        )}
        {id === 'anjing' && (
          <g>
            <ellipse cx="21" cy="62" rx="14" ry="28" transform="rotate(14 21 62)" />
            <ellipse cx="99" cy="62" rx="14" ry="28" transform="rotate(-14 99 62)" />
            <circle cx="60" cy="62" r="38" />
            <ellipse cx="60" cy="82" rx="22" ry="18" />
          </g>
        )}
        {id === 'bebek' && (
          <g>
            <circle cx="56" cy="58" r="36" />
            <path d="M46 25 C50 13, 64 14, 62 26 Z" />
            <ellipse cx="86" cy="70" rx="24" ry="13" />
          </g>
        )}
        {id === 'sapi' && (
          <g>
            <path d="M28 36 C16 20, 26 12, 38 26 Z" />
            <path d="M92 36 C104 20, 94 12, 82 26 Z" />
            <ellipse cx="20" cy="48" rx="14" ry="9" transform="rotate(-15 20 48)" />
            <ellipse cx="100" cy="48" rx="14" ry="9" transform="rotate(15 100 48)" />
            <rect x="26" y="28" width="68" height="62" rx="28" />
            <ellipse cx="60" cy="84" rx="34" ry="21" />
          </g>
        )}
        {id === 'ayam' && (
          <g>
            <path d="M44 26 C44 10, 56 10, 58 22 C62 8, 74 12, 72 26 C78 16, 86 22, 80 34 Z" />
            <circle cx="58" cy="64" r="36" />
            <polygon points="88,60 112,68 88,76" />
            <ellipse cx="62" cy="96" rx="11" ry="14" />
          </g>
        )}
        {id === 'domba' && (
          <g>
            <ellipse cx="18" cy="56" rx="13" ry="8" transform="rotate(-15 18 56)" />
            <ellipse cx="102" cy="56" rx="13" ry="8" transform="rotate(15 102 56)" />
            <circle cx="60" cy="30" r="20" />
            <circle cx="38" cy="40" r="18" />
            <circle cx="82" cy="40" r="18" />
            <circle cx="32" cy="64" r="19" />
            <circle cx="88" cy="64" r="19" />
            <circle cx="44" cy="88" r="18" />
            <circle cx="76" cy="88" r="18" />
            <circle cx="60" cy="64" r="34" />
          </g>
        )}
        {id === 'katak' && (
          <g>
            <circle cx="36" cy="34" r="17" />
            <circle cx="84" cy="34" r="17" />
            <ellipse cx="60" cy="68" rx="46" ry="34" />
          </g>
        )}
        {id === 'singa' && (
          <g>
            <circle cx="60" cy="60" r="48" />
            <circle cx="28" cy="28" r="13" />
            <circle cx="92" cy="28" r="13" />
          </g>
        )}
        {id === 'gajah' && (
          <g>
            <ellipse cx="22" cy="54" rx="18" ry="28" />
            <ellipse cx="98" cy="54" rx="18" ry="28" />
            <circle cx="60" cy="56" r="34" />
            <path d="M53 64 Q53 96 72 96 Q80 96 78 86 Q68 88 67 64 Z" />
          </g>
        )}
        {id === 'burung_hantu' && (
          <g>
            <polygon points="28,40 22,16 46,28" />
            <polygon points="92,40 98,16 74,28" />
            <ellipse cx="60" cy="66" rx="36" ry="38" />
          </g>
        )}
        {id === 'lebah' && (
          <g>
            <ellipse cx="44" cy="36" rx="16" ry="22" transform="rotate(-25 44 36)" />
            <ellipse cx="76" cy="36" rx="16" ry="22" transform="rotate(25 76 36)" />
            <ellipse cx="60" cy="68" rx="36" ry="26" />
          </g>
        )}
        {id === 'lumba_lumba' && (
          <g>
            <path d="M18 76 C22 36, 62 24, 92 48 C102 56, 110 60, 108 66 C98 70, 90 68, 84 74 C70 92, 34 94, 18 76 Z" />
            <path d="M52 34 L62 16 L70 36 Z" />
          </g>
        )}
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      {id === 'kucing' && (
        <g>
          <polygon points="24,52 18,16 50,34" fill="#F59E0B" stroke="#92400E" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="96,52 102,16 70,34" fill="#F59E0B" stroke="#92400E" strokeWidth="3" strokeLinejoin="round" />
          <polygon points="27,45 23,24 44,35" fill="#FBCFE8" />
          <polygon points="93,45 97,24 76,35" fill="#FBCFE8" />
          <ellipse cx="60" cy="68" rx="42" ry="38" fill="#FBBF24" stroke="#92400E" strokeWidth="3" />
          <path d="M54 32 L54 43 M60 30 L60 44 M66 32 L66 43" stroke="#D97706" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="43" cy="62" r="6" fill="#1E293B" />
          <circle cx="77" cy="62" r="6" fill="#1E293B" />
          <circle cx="45" cy="60" r="2" fill="#FFFFFF" />
          <circle cx="79" cy="60" r="2" fill="#FFFFFF" />
          <ellipse cx="32" cy="74" rx="6" ry="4" fill="#FDA4AF" opacity="0.7" />
          <ellipse cx="88" cy="74" rx="6" ry="4" fill="#FDA4AF" opacity="0.7" />
          <polygon points="55,70 65,70 60,76" fill="#F43F5E" />
          <path d="M60 76 Q53 84 47 79 M60 76 Q67 84 73 79" fill="none" stroke="#92400E" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M16 66 L32 69 M15 76 L32 75 M104 66 L88 69 M105 76 L88 75" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {id === 'anjing' && (
        <g>
          <ellipse cx="21" cy="62" rx="14" ry="28" transform="rotate(14 21 62)" fill="#92400E" stroke="#451A03" strokeWidth="3" />
          <ellipse cx="99" cy="62" rx="14" ry="28" transform="rotate(-14 99 62)" fill="#92400E" stroke="#451A03" strokeWidth="3" />
          <circle cx="60" cy="62" r="38" fill="#D97706" stroke="#451A03" strokeWidth="3" />
          <circle cx="43" cy="54" r="12" fill="#92400E" opacity="0.45" />
          <ellipse cx="60" cy="80" rx="22" ry="17" fill="#FEF3C7" />
          <circle cx="44" cy="54" r="6" fill="#1E293B" />
          <circle cx="76" cy="54" r="6" fill="#1E293B" />
          <circle cx="46" cy="52" r="2" fill="#FFFFFF" />
          <circle cx="78" cy="52" r="2" fill="#FFFFFF" />
          <path d="M55 86 Q60 99 65 86 Z" fill="#FB7185" stroke="#9F1239" strokeWidth="2" />
          <ellipse cx="60" cy="72" rx="7.5" ry="5.5" fill="#1E293B" />
          <path d="M60 77 L60 83 M51 83 Q60 89 69 83" fill="none" stroke="#451A03" strokeWidth="2.8" strokeLinecap="round" />
        </g>
      )}

      {id === 'bebek' && (
        <g>
          <path d="M46 25 C50 13, 64 14, 62 26 Z" fill="#FACC15" stroke="#A16207" strokeWidth="2.5" />
          <circle cx="56" cy="58" r="36" fill="#FDE047" stroke="#A16207" strokeWidth="3" />
          <ellipse cx="38" cy="68" rx="7" ry="4.5" fill="#FDA4AF" opacity="0.7" />
          <circle cx="44" cy="52" r="5.5" fill="#1E293B" />
          <circle cx="68" cy="52" r="5.5" fill="#1E293B" />
          <circle cx="46" cy="50" r="2" fill="#FFFFFF" />
          <circle cx="70" cy="50" r="2" fill="#FFFFFF" />
          <ellipse cx="84" cy="70" rx="23" ry="12" fill="#F97316" stroke="#9A3412" strokeWidth="3" />
          <path d="M68 70 Q84 76 102 70" fill="none" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {id === 'sapi' && (
        <g>
          <path d="M28 36 C16 20, 26 12, 38 26 Z" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
          <path d="M92 36 C104 20, 94 12, 82 26 Z" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
          <ellipse cx="20" cy="48" rx="13" ry="8" transform="rotate(-15 20 48)" fill="#FFFFFF" stroke="#334155" strokeWidth="3" />
          <ellipse cx="100" cy="48" rx="13" ry="8" transform="rotate(15 100 48)" fill="#FFFFFF" stroke="#334155" strokeWidth="3" />
          <rect x="26" y="28" width="68" height="62" rx="28" fill="#FFFFFF" stroke="#334155" strokeWidth="3" />
          <path d="M32 34 C48 32, 50 50, 34 54 Z" fill="#334155" />
          <circle cx="82" cy="44" r="9" fill="#334155" />
          <circle cx="44" cy="55" r="5" fill="#0F172A" />
          <circle cx="76" cy="55" r="5" fill="#0F172A" />
          <circle cx="45.5" cy="53.5" r="1.8" fill="#FFFFFF" />
          <circle cx="77.5" cy="53.5" r="1.8" fill="#FFFFFF" />
          <ellipse cx="60" cy="83" rx="33" ry="20" fill="#FBCFE8" stroke="#BE185D" strokeWidth="3" />
          <circle cx="47" cy="79" r="3.5" fill="#9D174D" />
          <circle cx="73" cy="79" r="3.5" fill="#9D174D" />
          <path d="M48 90 Q60 97 72 90" fill="none" stroke="#9D174D" strokeWidth="2.8" strokeLinecap="round" />
        </g>
      )}

      {id === 'ayam' && (
        <g>
          <path d="M44 28 C44 11, 56 11, 58 23 C62 9, 74 13, 72 28 C78 17, 86 23, 80 35 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
          <circle cx="58" cy="64" r="35" fill="#FFFBEB" stroke="#B45309" strokeWidth="3" />
          <ellipse cx="62" cy="95" rx="9" ry="12" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
          <circle cx="46" cy="58" r="5.5" fill="#1E293B" />
          <circle cx="70" cy="58" r="5.5" fill="#1E293B" />
          <circle cx="48" cy="56" r="2" fill="#FFFFFF" />
          <circle cx="72" cy="56" r="2" fill="#FFFFFF" />
          <circle cx="38" cy="70" r="5.5" fill="#FDA4AF" opacity="0.7" />
          <polygon points="86,60 111,68 86,76" fill="#F59E0B" stroke="#92400E" strokeWidth="2.8" strokeLinejoin="round" />
        </g>
      )}

      {id === 'domba' && (
        <g>
          <ellipse cx="18" cy="56" rx="12" ry="7" transform="rotate(-15 18 56)" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
          <ellipse cx="102" cy="56" rx="12" ry="7" transform="rotate(15 102 56)" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="60" cy="30" r="19" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="38" cy="40" r="17" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="82" cy="40" r="17" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="33" cy="64" r="18" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="87" cy="64" r="18" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="45" cy="87" r="17" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="75" cy="87" r="17" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2.5" />
          <circle cx="60" cy="60" r="32" fill="#F8FAFC" />
          <ellipse cx="60" cy="66" rx="25" ry="23" fill="#FDE68A" stroke="#78350F" strokeWidth="2.5" />
          <circle cx="51" cy="42" r="11" fill="#FFFFFF" />
          <circle cx="63" cy="40" r="12" fill="#FFFFFF" />
          <circle cx="72" cy="44" r="10" fill="#FFFFFF" />
          <circle cx="49" cy="63" r="4.5" fill="#1E293B" />
          <circle cx="71" cy="63" r="4.5" fill="#1E293B" />
          <circle cx="50.5" cy="61.5" r="1.5" fill="#FFFFFF" />
          <circle cx="72.5" cy="61.5" r="1.5" fill="#FFFFFF" />
          <path d="M53 75 Q60 81 67 75" fill="none" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {id === 'katak' && (
        <g>
          <circle cx="36" cy="35" r="16" fill="#4ADE80" stroke="#166534" strokeWidth="3" />
          <circle cx="84" cy="35" r="16" fill="#4ADE80" stroke="#166534" strokeWidth="3" />
          <ellipse cx="60" cy="68" rx="45" ry="33" fill="#4ADE80" stroke="#166534" strokeWidth="3" />
          <ellipse cx="60" cy="80" rx="33" ry="18" fill="#BBF7D0" />
          <circle cx="36" cy="35" r="10" fill="#FFFFFF" />
          <circle cx="84" cy="35" r="10" fill="#FFFFFF" />
          <circle cx="37" cy="35" r="5.5" fill="#0F172A" />
          <circle cx="85" cy="35" r="5.5" fill="#0F172A" />
          <circle cx="39" cy="33" r="2" fill="#FFFFFF" />
          <circle cx="87" cy="33" r="2" fill="#FFFFFF" />
          <circle cx="31" cy="70" r="6" fill="#FDA4AF" opacity="0.7" />
          <circle cx="89" cy="70" r="6" fill="#FDA4AF" opacity="0.7" />
          <path d="M40 70 Q60 86 80 70" fill="none" stroke="#166534" strokeWidth="3.2" strokeLinecap="round" />
        </g>
      )}

      {id === 'singa' && (
        <g>
          <circle cx="28" cy="28" r="12" fill="#F59E0B" stroke="#92400E" strokeWidth="2.5" />
          <circle cx="92" cy="28" r="12" fill="#F59E0B" stroke="#92400E" strokeWidth="2.5" />
          <circle cx="60" cy="60" r="46" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
          <circle cx="60" cy="62" r="32" fill="#FBBF24" stroke="#92400E" strokeWidth="2.5" />
          <ellipse cx="60" cy="74" rx="16" ry="12" fill="#FEF3C7" />
          <circle cx="47" cy="56" r="5" fill="#1E293B" />
          <circle cx="73" cy="56" r="5" fill="#1E293B" />
          <circle cx="48.5" cy="54.5" r="1.8" fill="#FFFFFF" />
          <circle cx="74.5" cy="54.5" r="1.8" fill="#FFFFFF" />
          <polygon points="54,67 66,67 60,74" fill="#7C2D12" />
          <path d="M60 74 Q54 81 49 77 M60 74 Q66 81 71 77" fill="none" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {id === 'gajah' && (
        <g>
          {/* Large Ears */}
          <ellipse cx="22" cy="54" rx="17" ry="27" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
          <ellipse cx="98" cy="54" rx="17" ry="27" fill="#94A3B8" stroke="#334155" strokeWidth="3" />
          <ellipse cx="23" cy="55" rx="10" ry="17" fill="#FBCFE8" opacity="0.7" />
          <ellipse cx="97" cy="55" rx="10" ry="17" fill="#FBCFE8" opacity="0.7" />
          {/* Head */}
          <circle cx="60" cy="54" r="33" fill="#CBD5E1" stroke="#334155" strokeWidth="3" />
          {/* Tusks */}
          <path d="M40 68 Q34 80 42 82 Q48 76 47 68 Z" fill="#FFFBEB" stroke="#94A3B8" strokeWidth="2" />
          <path d="M80 68 Q86 80 78 82 Q72 76 73 68 Z" fill="#FFFBEB" stroke="#94A3B8" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="46" cy="49" r="4.8" fill="#0F172A" />
          <circle cx="74" cy="49" r="4.8" fill="#0F172A" />
          <circle cx="47.5" cy="47.5" r="1.6" fill="#FFFFFF" />
          <circle cx="75.5" cy="47.5" r="1.6" fill="#FFFFFF" />
          {/* Trunk */}
          <path d="M53 60 Q53 96 74 96 Q82 96 80 86 Q70 88 67 60" fill="#CBD5E1" stroke="#334155" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M57 70 L64 70 M58 78 L65 78" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        </g>
      )}

      {id === 'burung_hantu' && (
        <g>
          {/* Ear tufts */}
          <polygon points="28,40 20,16 46,28" fill="#7C3AED" stroke="#4C1D95" strokeWidth="2.8" strokeLinejoin="round" />
          <polygon points="92,40 100,16 74,28" fill="#7C3AED" stroke="#4C1D95" strokeWidth="2.8" strokeLinejoin="round" />
          {/* Body/Head */}
          <ellipse cx="60" cy="66" rx="36" ry="38" fill="#8B5CF6" stroke="#4C1D95" strokeWidth="3" />
          {/* Belly */}
          <ellipse cx="60" cy="84" rx="22" ry="17" fill="#EDE9FE" />
          <path d="M49 81 Q54 85 59 81 M61 81 Q66 85 71 81 M55 89 Q60 93 65 89" fill="none" stroke="#7C3AED" strokeWidth="2.2" strokeLinecap="round" />
          {/* Big Owl Eyes */}
          <circle cx="44" cy="50" r="14" fill="#FFFFFF" stroke="#4C1D95" strokeWidth="2.8" />
          <circle cx="76" cy="50" r="14" fill="#FFFFFF" stroke="#4C1D95" strokeWidth="2.8" />
          <circle cx="45" cy="50" r="7" fill="#F59E0B" />
          <circle cx="75" cy="50" r="7" fill="#F59E0B" />
          <circle cx="45" cy="50" r="4" fill="#0F172A" />
          <circle cx="75" cy="50" r="4" fill="#0F172A" />
          <circle cx="46.5" cy="48" r="1.8" fill="#FFFFFF" />
          <circle cx="76.5" cy="48" r="1.8" fill="#FFFFFF" />
          {/* Beak */}
          <polygon points="55,58 65,58 60,68" fill="#F59E0B" stroke="#92400E" strokeWidth="2.2" strokeLinejoin="round" />
        </g>
      )}

      {id === 'lebah' && (
        <g>
          {/* Wings */}
          <ellipse cx="44" cy="36" rx="15" ry="21" transform="rotate(-25 44 36)" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          <ellipse cx="76" cy="36" rx="15" ry="21" transform="rotate(25 76 36)" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
          {/* Body */}
          <ellipse cx="60" cy="68" rx="35" ry="26" fill="#FACC15" stroke="#713F12" strokeWidth="3" />
          {/* Stripes */}
          <path d="M52 43 L52 93 M66 43 L66 93 M79 48 L79 88" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
          {/* Face on left */}
          <circle cx="37" cy="63" r="4.5" fill="#0F172A" />
          <circle cx="38.5" cy="61.5" r="1.5" fill="#FFFFFF" />
          <path d="M32 74 Q38 80 44 74" fill="none" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />
          {/* Antennae */}
          <path d="M36 45 Q30 32 23 33 M43 44 Q42 30 37 28" fill="none" stroke="#713F12" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )}

      {id === 'lumba_lumba' && (
        <g>
          {/* Dorsal Fin */}
          <path d="M52 34 L62 15 L70 36 Z" fill="#0284C7" stroke="#0C4A6E" strokeWidth="2.8" strokeLinejoin="round" />
          {/* Body */}
          <path
            d="M18 76 C22 36, 62 24, 92 48 C102 56, 110 60, 108 66 C98 70, 90 68, 84 74 C70 92, 34 94, 18 76 Z"
            fill="#38BDF8"
            stroke="#0C4A6E"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Belly */}
          <path d="M30 78 C46 88, 72 86, 84 72 C70 74, 46 72, 30 78 Z" fill="#E0F2FE" />
          {/* Tail */}
          <path d="M22 76 L10 64 L16 78 L8 90 L24 81 Z" fill="#0284C7" stroke="#0C4A6E" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Eye & Smile */}
          <circle cx="80" cy="54" r="4.2" fill="#0F172A" />
          <circle cx="81.2" cy="52.8" r="1.4" fill="#FFFFFF" />
          <path d="M88 64 Q97 66 104 63" fill="none" stroke="#0C4A6E" strokeWidth="2.3" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
