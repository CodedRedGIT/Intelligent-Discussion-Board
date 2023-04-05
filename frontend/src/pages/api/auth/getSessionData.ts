
export type SessionData = {
  token: string;
  email: string;
  user_id: string;
};

export const getSessionData = async (session_id: string | undefined): Promise<SessionData | null> => {
  if (!session_id) {
    return null;
  }

  try {
    const response = await fetch('http://localhost:8000/api/session/', {
        headers: { 'Authorization': `Bearer ${session_id}` },
      });
      
    const data = await response.json();
    console.log(data);

    if (response.ok) {
      return { token: data.access_token, email: data.email, user_id: data.user_id };
    } else {
      return null;
    }
  } catch (err: any) {
    console.error(err);
    return null;
  }
};
