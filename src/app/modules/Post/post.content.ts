export const POST_CATEGORY = [
  'Adventure',
  'Business Travel',
  'Exploration',
  'Cultural',
  'Food & Drink',
  'Luxury Travel',
  'Nature',
  'Road Trips',
  'Solo Travel',
  'Family Travel',
  'Beach Getaways',
  'Historical Sites',
  'Backpacking',
  'Health & Wellness',
  'Photography',
  'Wildlife Safari',
  'Festival & Events',
  'Budget Travel',
] as const;
export const POST_STATUS = {
  FREE: 'FREE',
  PREMIUM: 'PREMIUM',
} as const;

export const PostSearchableFields = ['title', 'content'];
