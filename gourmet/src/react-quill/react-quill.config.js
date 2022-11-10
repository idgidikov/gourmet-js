export const modules = {
  resize: {
    locale: {
      // change them depending on your language
      altTip: "Hold down the alt key to zoom",
      floatLeft: "Left",
      floatRight: "Right",
      center: "Center",
      restore: "Restore",
    },
  },
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  }
export const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]