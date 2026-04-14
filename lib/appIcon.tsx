type AppIconArtProps = {
  size: number;
};

export function AppIconArt({ size }: AppIconArtProps) {
  const clipWidth = Math.round(size * 0.3);
  const clipHeight = Math.round(size * 0.085);
  const cardWidth = Math.round(size * 0.64);
  const cardHeight = Math.round(size * 0.76);
  const cardRadius = Math.round(size * 0.12);
  const cardPaddingX = Math.round(size * 0.08);
  const cardPaddingTop = Math.round(size * 0.12);
  const smallGap = Math.round(size * 0.028);
  const mediumGap = Math.round(size * 0.04);
  const lineHeight = Math.max(10, Math.round(size * 0.038));
  const badgeSize = Math.round(size * 0.26);
  const badgeBorder = Math.max(6, Math.round(size * 0.028));
  const tickSize = Math.round(size * 0.075);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(160deg, #eff6ff 0%, #dbeafe 38%, #bfdbfe 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: Math.round(size * 0.07),
          borderRadius: Math.round(size * 0.22),
          background:
            "linear-gradient(135deg, rgba(37, 99, 235, 0.18) 0%, rgba(14, 165, 233, 0.28) 100%)",
        }}
      />
      <div
        style={{
          width: cardWidth,
          height: cardHeight,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          padding: `${cardPaddingTop}px ${cardPaddingX}px`,
          borderRadius: cardRadius,
          background: "#ffffff",
          boxShadow: "0 24px 60px rgba(30, 64, 175, 0.18)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -Math.round(size * 0.035),
            left: "50%",
            width: clipWidth,
            height: clipHeight,
            display: "flex",
            transform: "translateX(-50%)",
            borderRadius: Math.round(size * 0.05),
            background: "#2563eb",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: mediumGap,
            marginBottom: Math.round(size * 0.075),
          }}
        >
          <div
            style={{
              width: Math.round(size * 0.13),
              height: Math.round(size * 0.13),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              background: "#1d4ed8",
              color: "#ffffff",
              fontSize: Math.round(size * 0.065),
              fontWeight: 700,
            }}
          >
            A
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: smallGap,
            }}
          >
            <div
              style={{
                width: "100%",
                height: lineHeight,
                display: "flex",
                borderRadius: 999,
                background: "#1d4ed8",
              }}
            />
            <div
              style={{
                width: "72%",
                height: lineHeight,
                display: "flex",
                borderRadius: 999,
                background: "#60a5fa",
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: mediumGap,
          }}
        >
          <div
            style={{
              width: "100%",
              height: lineHeight,
              display: "flex",
              borderRadius: 999,
              background: "#93c5fd",
            }}
          />
          <div
            style={{
              width: "88%",
              height: lineHeight,
              display: "flex",
              borderRadius: 999,
              background: "#93c5fd",
            }}
          />
          <div
            style={{
              width: "76%",
              height: lineHeight,
              display: "flex",
              borderRadius: 999,
              background: "#93c5fd",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            right: -Math.round(size * 0.09),
            bottom: -Math.round(size * 0.07),
            width: badgeSize,
            height: badgeSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 999,
            background: "#ffffff",
            border: `${badgeBorder}px solid #2563eb`,
            boxShadow: "0 18px 35px rgba(37, 99, 235, 0.18)",
          }}
        >
          <div
            style={{
              width: tickSize,
              height: Math.round(tickSize * 0.55),
              display: "flex",
              borderLeft: `${Math.max(6, Math.round(size * 0.022))}px solid #0ea5e9`,
              borderBottom: `${Math.max(6, Math.round(size * 0.022))}px solid #0ea5e9`,
              transform: "rotate(-45deg) translateY(-10%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
