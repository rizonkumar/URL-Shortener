import supabase from "./supabase";

export async function login({ email, password, confirmPasword }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    confirmPasword,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) return null;
  if (error) throw new Error(error.message);
  return session.session?.user;
}
