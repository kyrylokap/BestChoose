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
    const { data: authUser, error: error1 } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name, last_name },
      },
    });

    const { error: error3 } = await supabase.from("profiles").insert({
      id: authUser.user?.id,
      first_name: first_name,
      last_name: last_name,
      role: "patient",
    });
    if (!error1 && !error3) {
      router.push("/login");
    } else {
      console.log(error1, error3);
      alert("User already exists");
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
    if (!error && user) {
      if (user.role === "admin") {
        router.push("/admin");
      } else if (user.role === "doctor") {
        router.push("/doctor");
      } else {
        router.push("/patient");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  const logOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };
  return { register, logIn, logOut };
};
