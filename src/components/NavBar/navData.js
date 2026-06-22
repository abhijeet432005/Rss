export const orgSubmenu = {
  "ABOUT US": [
    { label: "About Us", path: "/about" },
    { label: "Our Leadership", path: "/leadership" },
    { label: "Mission & vision", path: "/mission-vision" },
    { label: "Organization & Structure", path: "/structure" },
    { label: "Our Constitution", path: "/constitution" },
  ],
  "OUR WINGS": [
    { label: "Kisan", path: "/wings/kisan" },
    { label: "Mahila", path: "/wings/mahila" },
    { label: "Yuva", path: "/wings/yuva" },
    { label: "S.C", path: "/wings/sc" },
    { label: "S.T", path: "/wings/st" },
    { label: "OBC", path: "/wings/obc" },
    { label: "Minority", path: "/wings/minority" },
  ],
  MEDIA: [
    { label: "Gallery", path: "/gallery" },
    { label: "News Articles", path: "/news" },
    { label: "Press Release", path: "/press" },
  ],
  "SOCIAL WALL": [
    { label: "Instagram", path: "https://instagram.com" },
    { label: "Facebook", path: "https://facebook.com" },
    { label: "Twitter", path: "https://twitter.com" },
    { label: "Youtube", path: "https://youtube.com" },
  ],
};

export const joinSubmenu = [
  { label: "Become a Member", path: "/join/member" },
  { label: "Become a Volunteer", path: "/join/volunteer" },
];

export const navItems = [
  { label: "HOME", path: "/" },
  { label: "ORGANIZATION", path: "/organization", submenu: orgSubmenu, type: "mega" },
  { label: "JOIN THE MOMENT", path: "/join", submenu: joinSubmenu, type: "simple" },
  { label: "CONTACT US", path: "/contact" },
  { label: "DONATE", path: "/donate" },
];

export const languages = [
  { label: "English", code: "en" },
  { label: "Hindi", code: "hi" },
];

export const ORANGE = "#E07A2E";