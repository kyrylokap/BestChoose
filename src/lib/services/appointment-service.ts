import { createClient } from "@/lib/supabase/server";

export type Appointment = {
  id: string; 
  first_name: string;
  last_name: string;
  specialization: string;
  date: string;
  time: string;
  duration: string;
  status: string;
  location: string;
};

const formatAppointment = (item: any): Appointment => {
  const dateObj = new Date(item.scheduled_time);
  return {
    id: item.id,
    first_name: item.doctors?.profiles?.first_name,
    last_name: item.doctors?.profiles?.last_name,
    specialization: item.doctors?.specialization,

    date: dateObj.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }),
    time: dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: false
    }),

    duration: item.duration,
    status: item.status,
    location: item.office_location,
  };
};

export const getAppointments = async (filter: 'all' | 'upcoming' = 'all') => {
  const supabase = await createClient();
  
  let query = supabase
    .from('appointments')
    .select(`
      id,
      scheduled_time,
      duration,
      status,
      office_location,
      doctors (
        specialization,
        profiles ( first_name, last_name )
      )
    `)
    .order('scheduled_time', { ascending: true });

  if (filter === 'upcoming') {
    const now = new Date().toISOString();
    query = query.gt('scheduled_time', now);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error('Error fetching appointments:', error);
    return [];
  }

  return data.map(formatAppointment);
};