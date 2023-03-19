export default function NewMessage() {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <textarea
        id='message'
        rows={4}
        placeholder='Leave a comment...'
        className="text-area"
        style={{resize: 'vertical', margin: '20px', width: '600px'}}
      ></textarea>
      <button style={{width: '160px', margin: '0px 20px 20px'}}>
        Click Me
      </button>
    </div>
  );
}
