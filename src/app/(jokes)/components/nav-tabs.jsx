"use client";
import { Nav, NavList, NavTrigger } from "@/components/ui/nav";
import { Home, ChartArea, Trophy } from "lucide-react";
import { usePathname } from 'next/navigation';

const tabs = [
    { href: "/", label: "Accueil", icon: <Home /> },
    { href: "/stats", label: "Statistiques", icon: <ChartArea /> },
    { href: "/leaderboard", label: "Classement", icon: <Trophy /> },
];

export default function FilterTabs() {
    const pathname  = usePathname();
    return (
        <div className="flex justify-between p-2 rounded-xl border bg-card">
            <Nav defaultValue="recent" className="w-full">
                <NavList className="p-0 w-full">
                    {tabs.map((tab, index) => (
                        <NavTrigger
                            key={index}
                            href={tab.href}
                            label={tab.label}
                            icon={tab.icon}
                            className="h-9"
                            isActive={tab.href === pathname }
                        />
                    ))}
                </NavList>
            </Nav>
        </div>
    );
}
