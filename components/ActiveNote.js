const rawMarkup = (html) => ({ __html: html });

export const ActiveNote = ({ note }) => {
  if (!note) return null;

  return (
    <div style={{ maxHeight: 'calc(100vh - 60px)', overflowY: 'auto', borderRadius: '.28571429rem' }}>
      <div
        style={{ marginBottom: '20px' }}
      >
        <h3>{note.title}</h3>
        <div style={{ borderBottom: '2px solid lightgray' }} />
      </div>
      <div
        style={{ whiteSpace: 'pre-wrap' }}
        dangerouslySetInnerHTML={rawMarkup(note.description)}
      />
      {/* <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(note, null, 2)}</pre> */}
    </div>
  )
}