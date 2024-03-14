import { SiteHeader } from "../src/components/ui/SiteHeader"

interface LayoutProps {
  children: React.ReactNode
}
export const dynamic = "force-static"

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background font-sans antialiased w-screen overflow-x-hidden">
      <main className="mt-8 mb-16 px-3">{children}</main>
    </div>
  )
}
