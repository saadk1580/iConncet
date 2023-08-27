
export const convertImageToBlob = (file: File, callback: (blob: Blob) => void) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataURL = event.target?.result;
      if (typeof dataURL === 'string') {
        // Convert data URL to ArrayBuffer
        const binaryString = atob(dataURL.split(',')[1]);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
  
        // Create Blob object
        const imageBlob = new Blob([bytes.buffer], { type: file.type });
        callback(imageBlob);
      }
    };
    reader.readAsDataURL(file);
  };
  