import React from "react"
import { Link } from "react-router-dom"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbsProps {
  items: {
    label: string
    path?: string
  }[]
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex py-4 text-xs font-semibold text-muted-foreground" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center hover:text-foreground transition-colors">
            <Home className="h-3.5 w-3.5 mr-1.5 shrink-0" />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            <ChevronRight className="h-3.5 w-3.5 mx-1 text-muted-foreground/60 shrink-0" />
            {item.path ? (
              <Link to={item.path} className="hover:text-foreground transition-colors truncate max-w-[120px] sm:max-w-none">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-bold truncate max-w-[120px] sm:max-w-none" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
