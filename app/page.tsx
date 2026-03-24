import { redirect } from 'next/navigation';

export default function Home() {
  // For the purpose of this setup, we'll redirect the root to our dummy page
  // In a full application, this might be a dashboard or section landing page
  redirect('/AERO/Aerodynamics/Incompressible-Flow/Thin-Airfoil-Theory');
}