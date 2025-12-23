import { supabase } from "@/api/supabase";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  const register = async ({
    email,
    password,
    first_name,
    last_name,
  }: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => {
    const { error: error1 } = await supabase.auth.signUp({
      email,
      password,
    });
    const { error: error2 } = await supabase.auth.updateUser({
      data: { first_name, last_name },
    });
    const { error: error3 } = await supabase.from("profiles").insert({
      first_name,
      last_name,
    });
    if (!error1 && !error2 && !error3) {
      router.push("/login");
    }
  };

  const logIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    const { data: user } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user?.id)
      .single();
    if (!error) {
      if (user.role === "admin") {
        router.push("/admin");
      } else if (user.role === "doctor") {
        router.push("/doctor");
      } else {
        router.push("/patient");
      }
    }
  };

  const logOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  return { register, logIn, logOut };
};
