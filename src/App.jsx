import { useMemo } from 'react'

function App() {
  const dateStr = useMemo(() => {
    try {
      return new Date().toLocaleDateString('sr-RS', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' })
    } catch {
      const d = new Date()
      const day = String(d.getDate()).padStart(2, '0')
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const year = d.getFullYear()
      return `${day}.${month}.${year}.`
    }
  }, [])

  // Example empty datasets (shows the graceful empty states)
  const activities = []
  const nextWeekActivities = []
  const lektire = []

  return (
    <div>
      {/* Christmas styles + snow animation */}
      <style>{`
        :root {
          --christmas-red: #d9534f;
          --christmas-green: #1a7e3a;
          --paper: #ffffff;
          --faint: #f8f9fa;
        }
        .xmas-body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 880px;
          margin: 0 auto;
          padding: 24px;
          background-color: #fdeaea; /* Light festive red */
          background-image: 
            /* Back snow layer (tiny dots) */
            radial-gradient(2px 2px at 20px 20px, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 51%),
            radial-gradient(2px 2px at 60px 40px, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 51%),
            /* Santa emoji SVG */
            url('https://twemoji.maxcdn.com/v/latest/svg/1f385.svg');
          background-repeat: repeat, repeat, no-repeat;
          background-size: 120px 120px, 160px 160px, 200px; 
          background-position: 0 0, 0 0, right 24px bottom 24px; 
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.08) inset;
        }
        /* Foreground snow layers for smooth falling effect */
        .xmas-body::before,
        .xmas-body::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: -100%;
          bottom: -100%;
          pointer-events: none;
          background-image:
            radial-gradient(3px 3px at 10px 10px, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 51%),
            radial-gradient(2px 2px at 30px 30px, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 51%),
            radial-gradient(1.5px 1.5px at 50px 50px, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 51%);
          background-repeat: repeat;
          background-size: 140px 140px, 180px 180px, 220px 220px;
          animation: snow-fall 18s linear infinite;
        }
        .xmas-body::after {
          opacity: 0.7;
          filter: blur(0.2px);
          animation-duration: 28s;
          background-size: 200px 200px, 260px 260px, 320px 320px;
        }
        @keyframes snow-fall {
          0% { transform: translateY(-40px); }
          100% { transform: translateY(120px); }
        }
        .xmas-container {
          background-color: var(--paper);
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          border: 2px solid var(--christmas-red);
          position: relative;
          z-index: 1;
        }
        .xmas-header {
          text-align: center;
          border-bottom: 3px solid var(--christmas-green);
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .xmas-title {
          color: var(--christmas-red);
          margin: 0;
          font-size: 32px;
          font-family: 'Georgia', serif;
          text-shadow: 0 1px 0 #fff;
        }
        .xmas-subtext { color: #7f8c8d; margin: 10px 0 0 0; font-size: 16px; }
        .xmas-section { margin-bottom: 40px; }
        .xmas-section h2 {
          color: var(--christmas-green);
          border-left: 4px solid var(--christmas-red);
          padding-left: 15px;
          margin-bottom: 20px;
          font-family: 'Georgia', serif;
        }
        .xmas-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          background-color: #fff;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .xmas-table th {
          background: linear-gradient(135deg, var(--christmas-green), #0f5b29);
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: 600;
        }
        .xmas-table td { padding: 12px; border-bottom: 1px solid #ecf0f1; }
        .xmas-table tr:nth-child(even) { background-color: #f8f9fa; }
        .xmas-table tr:hover { background-color: #e8f8f5; }
        .xmas-link { color: var(--christmas-red); text-decoration: none; font-weight: 600; }
        .xmas-link:hover { text-decoration: underline; }
        .xmas-empty { text-align: center; color: #7f8c8d; font-style: italic; padding: 20px; }
        .xmas-footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ecf0f1; color: #7f8c8d; font-size: 14px; }
        .xmas-greeting { text-align: center; font-size: 18px; color: var(--christmas-red); margin-bottom: 30px; font-style: italic; }
        .xmas-banner { margin:0 0 20px 0; padding:12px 16px; background-color:#f8f9fa; border:1px solid #ecf0f1; border-radius:8px; text-align:center; font-size:14px; color:#34495e; }
        @media (max-width: 640px) {
          .xmas-body { padding: 12px; }
          .xmas-container { padding: 20px; }
          .xmas-table { font-size: 14px; }
          .xmas-table th, .xmas-table td { padding: 8px; }
        }
      `}</style>

      <div className="xmas-body">
        <div className="xmas-container">
          <div className="xmas-banner">
            Možeš videti listu svih aktivnosti na{' '}
            <a href="https://provere.maksimmalbasa.in.rs" className="xmas-link">ovom linku</a>
          </div>

          <div className="xmas-header">
            <h1 className="xmas-title">Praznični bilten aktivnosti</h1>
            <p className="xmas-subtext">{dateStr}</p>
          </div>

          <div className="xmas-greeting">
            <p>Srećni praznici i sve najbolje u Novoj godini! ❄️🎄</p>
          </div>

          <div className="xmas-section">
            <h2>📚 Nedeljne aktivnosti</h2>
            {activities.length > 0 ? (
              <table className="xmas-table">
                <thead>
                  <tr>
                    <th>Datum</th>
                    <th>Predmet</th>
                    <th>Opis</th>
                    <th>Profesor</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, idx) => (
                    <tr key={idx}>
                      <td>{new Date(activity.date).toLocaleDateString('sr-RS', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                      <td>{activity?.subject?.subjectName || ''}</td>
                      <td>{activity?.description || ''}</td>
                      <td>{activity?.professor?.professorName || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="xmas-empty">Nema planiranih aktivnosti za ovu nedelju.</div>
            )}
          </div>

          <div className="xmas-section">
            <h2>📅 Sledeće nedelje aktivnosti</h2>
            {nextWeekActivities.length > 0 ? (
              <table className="xmas-table">
                <thead>
                  <tr>
                    <th>Datum</th>
                    <th>Predmet</th>
                    <th>Opis</th>
                    <th>Profesor</th>
                  </tr>
                </thead>
                <tbody>
                  {nextWeekActivities.map((activity, idx) => (
                    <tr key={idx}>
                      <td>{new Date(activity.date).toLocaleDateString('sr-RS', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                      <td>{activity?.subject?.subjectName || ''}</td>
                      <td>{activity?.description || ''}</td>
                      <td>{activity?.professor?.professorName || ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="xmas-empty">Nema planiranih aktivnosti za sledeću nedelju.</div>
            )}
          </div>

          <div className="xmas-section">
            <h2>📖 Mesečne lektire</h2>
            {lektire.length > 0 ? (
              <table className="xmas-table">
                <thead>
                  <tr>
                    <th>Naslov</th>
                    <th>Autor</th>
                    <th>Datum</th>
                    <th>PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {lektire.map((lektira, idx) => (
                    <tr key={idx}>
                      <td>{lektira?.title || ''}</td>
                      <td>{lektira?.author || ''}</td>
                      <td>{lektira?.date || ''}</td>
                      <td>
                        {lektira?.pdfUrl ? (
                          <a className="xmas-link" href={lektira.pdfUrl} target="_blank" rel="noreferrer">Preuzmi PDF</a>
                        ) : (
                          <span style={{ color: '#7f8c8d' }}>Nije dostupan</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="xmas-empty">Nema dostupnih lektira za ovaj mesec.</div>
            )}
          </div>

          <div className="xmas-footer">
            <p>Ovaj bilten se automatski šalje svakog ponedeljka u 08:00.</p>
            <p>
              <a href="#" className="xmas-link">Odjavite se od biltena</a>
            </p>
            <p style={{ marginTop: 20, padding: 15, backgroundColor: '#f8f9fa', borderRadius: 6, textAlign: 'center' }}>
              <strong>Ne vidite email pravilno?</strong><br />
              <a href="#" className="xmas-link">Kliknite ovde da otvorite u browseru</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
