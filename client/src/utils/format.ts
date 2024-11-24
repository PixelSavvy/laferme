import dayjs from 'dayjs';
import 'dayjs/locale/en'; // import default locale as fallback
import 'dayjs/locale/ka'; // Georgian locale example
import localizedFormat from 'dayjs/plugin/localizedFormat';

// Helper function to format date based on HTML lang attribute
export const formatDate = (date: string | Date) => {
  // Get locale from the <html> lang attribute
  const locale = document.documentElement.lang || 'en'; // Fallback to 'en' if no lang is set

  // Extend localizedFormat plugin
  dayjs.extend(localizedFormat);

  // Set the locale in dayjs
  dayjs.locale(locale);

  // Parse the date input
  const parsedDate = dayjs(date);

  // Check if the date is valid
  if (!parsedDate.isValid()) {
    console.error('Invalid date:', date);
    return 'Invalid Date'; // Return a fallback string for invalid dates
  }

  // Return the formatted date
  return parsedDate.format('D MMMM, YYYY');
};

export const formatNumber = (phone: string): string => {
  const cleaned = phone.replace(/[^\d+]/g, ''); // Remove non-numeric characters except "+"

  // Mobile numbers with and without country code
  if (/^\+9955\d{8}$/.test(cleaned)) {
    return cleaned.replace(/^\+995(5\d{2})(\d{2})(\d{2})(\d{2})$/, '+995 $1 $2 $3 $4');
  } else if (/^5\d{8}$/.test(cleaned)) {
    return cleaned.replace(/^(5\d{2})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4');
  }

  // Landline numbers with and without country code
  else if (/^\+9950322\d{6}$/.test(cleaned)) {
    return cleaned.replace(/^\+995(0322)(\d{2})(\d{2})(\d{2})$/, '+995 $1 $2 $3 $4');
  } else if (/^0322\d{6}$/.test(cleaned)) {
    return cleaned.replace(/^(0322)(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4');
  }

  // Local landline numbers without country code
  else if (/^2\d{6}$/.test(cleaned)) {
    return cleaned.replace(/^(2\d{2})(\d{2})(\d{2})$/, '$1 $2 $3');
  }

  // If no pattern matches, return original input (can add further validation)
  return phone;
};
