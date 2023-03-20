'use client';

export default function NewMessage() {
  // function handleSubmit(e: any): void {
  //   e.preventDefault();
  //   const textValue = e.target.textarea.value;
  // }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <form>
        <textarea
          id='message'
          rows={4}
          name='textarea'
          placeholder='Leave a comment...'
          className='text-area'
          style={{ resize: 'vertical', margin: '20px', width: '600px' }}
        ></textarea>
        <button style={{ width: '160px', margin: '0px 20px 20px' }}>
          Click Me
        </button>
      </form>
    </div>
  );
}
