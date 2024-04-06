export function dateFormat(dateString: Date | string) {
  const dateTimeInParts = dateString.toString().split("T"); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
  const date = dateTimeInParts[0]; // "2021-08-31"
  return date;
}

export const getCurrentYear = () => {
  const today = new Date();
  const startDate = new Date(today.getFullYear(), 0, 1);
  const endDate = new Date(today.getFullYear(), 11, 31);
  return { startDate, endDate };
};

// export const API_URL = import.meta.env.VITE_API_URL;
export const API_URL = "trelleborg.mnsushi.se";
