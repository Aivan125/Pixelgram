import { AiOutlineBook, AiOutlineHome, AiOutlineRocket } from "react-icons/ai";
import { IoCreateOutline, IoPeopleOutline } from "react-icons/io5";

export const bottombarLinks = [
  {
    icon: AiOutlineHome,
    route: "/",
    label: "Home",
  },
  {
    icon: AiOutlineRocket,
    route: "/explore",
    label: "Explore",
  },
  {
    icon: AiOutlineBook,
    route: "/saved",
    label: "Saved",
  },
  {
    icon: IoCreateOutline,
    route: "/create-post",
    label: "Create Post",
  },
  {
    icon: IoPeopleOutline,
    route: "people",
    label: "People",
  },
];
