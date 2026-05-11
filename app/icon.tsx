import { ImageResponse } from 'next/og';

export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '40px',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: '108px',
            fontWeight: '800',
            lineHeight: '1',
            fontFamily: 'sans-serif',
          }}
        >
          M
        </div>
      </div>
    ),
    { width: 192, height: 192 }
  );
}
