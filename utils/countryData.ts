// Common country codes and timezone mapping
// We use a subset of common countries or a method to map standard timezones to countries.

export interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

export const countries: Country[] = [
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "Bangladesh", code: "BD", dialCode: "+880", flag: "🇧🇩" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳" },
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷" },
  { name: "Russia", code: "RU", dialCode: "+7", flag: "🇷🇺" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", flag: "🇸🇦" },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬" },
  // Add more as needed
];

// Simple heuristic to map Timezone to Country Code
export const getCountryFromTimezone = (): Country => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  if (timezone.startsWith("Asia/Dhaka")) return countries.find(c => c.code === "BD")!;
  if (timezone.startsWith("Asia/Kolkata")) return countries.find(c => c.code === "IN")!;
  if (timezone.startsWith("America/New_York")) return countries.find(c => c.code === "US")!;
  if (timezone.startsWith("Europe/London")) return countries.find(c => c.code === "GB")!;
  // ... more mappings ...
  
  // Default to US or generic fallback based on continent if possible, 
  // but for now let's strict match or fallback to US/first.
  
  // Generic fallback logic
  if (timezone.includes("Australia")) return countries.find(c => c.code === "AU")!;
  if (timezone.includes("Europe")) return countries.find(c => c.code === "DE")!; // Generic EU fallback
  if (timezone.includes("Asia")) return countries.find(c => c.code === "BD")!; // Prioritize user region if Asia
  
  return countries[0]; // Default to US
};
