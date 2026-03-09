import { ImageResponse } from 'next/og';
import { asUiText, loadMessages, normalizeLang } from '../../lib/i18n';

export const runtime = 'nodejs';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default async function OpenGraphImage({
  params
}: {
  params: { lang: string };
}) {
  const lang = normalizeLang(params.lang);
  const ui = asUiText(await loadMessages(lang));
  const eyebrow = lang === 'en' ? 'Cinematic map' : 'Mapa cinematográfico';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #120811 0%, #1b0f1a 48%, #09070b 100%)',
          color: '#fff',
          padding: '56px',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            width: '100%',
            borderRadius: '36px',
            padding: '52px',
            background: 'rgba(9, 8, 13, 0.84)',
            border: '1px solid rgba(255,255,255,0.10)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '180px',
                height: '180px',
                borderRadius: '40px',
                background: 'linear-gradient(135deg, #da2e52 0%, #611327 100%)'
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="124"
                height="124"
                viewBox="0 0 128 128"
                fill="none"
              >
                <defs>
                  <linearGradient id="shoe" x1="24" y1="56" x2="108" y2="96" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ff8ca3" />
                    <stop offset="55%" stopColor="#f03a60" />
                    <stop offset="100%" stopColor="#8c1027" />
                  </linearGradient>
                  <linearGradient id="heel" x1="82" y1="78" x2="108" y2="118" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#bf1732" />
                    <stop offset="100%" stopColor="#4f0714" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 78C34 72 50 64 66 56C80 49 95 49 104 56C112 62 110 70 100 72L88 74C78 76 68 82 58 86C46 92 32 94 24 90C18 88 16 82 20 78Z"
                  fill="url(#shoe)"
                />
                <path
                  d="M90 76L104 110C106 114 104 118 100 118H92C88 118 86 115 85 112L78 86L90 76Z"
                  fill="url(#heel)"
                />
                <path
                  d="M32 84C48 76 66 70 84 68"
                  stroke="rgba(255,255,255,0.42)"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '760px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  color: '#ff9eb1',
                  fontSize: '24px',
                  fontWeight: 700,
                  letterSpacing: '0.24em',
                  textTransform: 'uppercase'
                }}
              >
                {eyebrow}
              </div>
              <div
                style={{
                  display: 'flex',
                  marginTop: '18px',
                  fontSize: '66px',
                  lineHeight: 1.02,
                  fontWeight: 800
                }}
              >
                {ui.filmTitle}
              </div>
              <div
                style={{
                  display: 'flex',
                  marginTop: '24px',
                  color: '#ddd6e5',
                  fontSize: '30px',
                  lineHeight: 1.25
                }}
              >
                {ui.meta.home.description}
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '24px',
              color: '#c8bfd1'
            }}
          >
            <div style={{ display: 'flex' }}>Nueva York y París, escena por escena</div>
            <div style={{ display: 'flex', color: '#ff9eb1' }}>thedevilwearspradamap.afachile.cl</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
