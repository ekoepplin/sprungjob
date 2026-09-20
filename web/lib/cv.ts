export type CVExperience = {
  title: string;
  company: string;
  dates: string;
  location: string;
  bullets: string[];
};

export type CVEducation = {
  degree: string;
  school: string;
  dates: string;
};

export type CVSkill = {
  name: string;
  rating: number; // 1-5
};

export type CVProfile = {
  name: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  homepage: string;
  photo: string; // data URL, empty string if none
  experience: CVExperience[];
  education: CVEducation[];
  skills: CVSkill[];
  strengths: string[];
};

export const emptyProfile: CVProfile = {
  name: "",
  tagline: "",
  email: "",
  phone: "",
  location: "",
  homepage: "",
  photo: "",
  experience: [
    { title: "", company: "", dates: "", location: "", bullets: [""] },
  ],
  education: [{ degree: "", school: "", dates: "" }],
  skills: [{ name: "", rating: 3 }],
  strengths: [],
};

export const CV_STORAGE_KEY = "jobby:cv-profile";
