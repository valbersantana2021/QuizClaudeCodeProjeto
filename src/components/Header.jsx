import logo from '../assets/logo.jpg'

export default function Header() {
  return (
    <div className="w-full flex justify-center pt-6 pb-2">
      <img src={logo} alt="Quiz Claude Code" className="h-12 w-auto object-contain rounded-lg" />
    </div>
  )
}
