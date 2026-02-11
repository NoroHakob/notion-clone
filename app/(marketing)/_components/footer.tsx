// import { Button } from "@/components/ui/button"
// import { Logo } from "./logo"

// export const Footer = () => {
//     return (
//         <div className="flex items-center w-full p-6 bg-background z-50 dark:bg-[#1c1a1a]">
//             <Logo />
//             <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
//                 <Button variant="ghost" size="sm">
//                     Privacy Policy
//                 </Button>
//                 <Button variant="ghost" size="sm">
//                     Terms & Conditions
//                 </Button>
//             </div>
//         </div>
//     )
// }



import { Button } from "@/components/ui/button"
import { Logo } from "./logo"
import { FaInstagram, FaTelegramPlane, FaFacebookMessenger, FaEnvelope } from "react-icons/fa"

export const Footer = () => {
  return (
    <footer className="relative flex items-center justify-between w-full p-6 bg-background dark:bg-[#1c1a1a] border-t border-gray-200 dark:border-neutral-800">
      <div className="flex items-center gap-x-2">
        <Logo />
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-6 text-2xl text-gray-600 dark:text-gray-400">
        <a
          href="https://www.instagram.com/hakobyanoro"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-600 transition"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com/nor.hakobyan.587/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 transition"
        >
          <FaFacebookMessenger />
        </a>
        <a
          href="https://t.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-sky-500 transition"
        >
          <FaTelegramPlane />
        </a>
        <a
          href="mailto:norohakobyan469@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-red-500 transition"
        >
          <FaEnvelope />
        </a>
      </div>

      <div className="hidden md:flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm">
          Terms & Conditions
        </Button>
      </div>
    </footer>
  )
}
