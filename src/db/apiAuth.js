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
