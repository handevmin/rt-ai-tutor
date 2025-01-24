const API_URL = 'https://rt-ai-tutor-7b8e30c29fab.herokuapp.com';

export async function uploadImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/upload-image`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Image upload failed');
  }

  return response.json();
}

export async function sendDialog(question) {
  const response = await fetch(`${API_URL}/dialog`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error('Failed to send dialog');
  }

  return response.json();
}

export async function getTrySaying(question) {
  const response = await fetch(`${API_URL}/try-saying`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error('Failed to get example response');
  }

  return response.json();
}

export async function getTranscriptReview(question) {
  const response = await fetch(`${API_URL}/transcript-review`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ question }),
  });

  if (!response.ok) {
    throw new Error('Failed to get transcript review');
  }

  return response.json();
}

export async function translate(text, targetLanguage) {
  const response = await fetch(`${API_URL}/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, target_language: targetLanguage }),
  });

  if (!response.ok) {
    throw new Error('Failed to translate text');
  }

  return response.json();
}