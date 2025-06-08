"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/app-provider";
import ChatbotProvider from "@/contexts/chatbot-provider";
import { IconSidebar } from "@/lib/icons";
import { cn } from "@/lib/utils";

import ChatbotSidebar from "./_components/chatbot-sidebar";
import DashboardSidebar from "./_components/dashboard-sidebar";

function ChatbotLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { showSidebar, setShowSidebar } = useAppContext();
  const isChatbotRoute = pathname.startsWith("/chatbot");

  return (
    <ChatbotProvider>
      <div className="bg-background">
        <button
          type="button"
          className="fixed left-3 top-4 z-50 rounded-lg p-1 hover:bg-secondary/80"
          onClick={() => setShowSidebar((prev) => !prev)}
        >
          <IconSidebar className="h-5 w-5 text-muted-foreground" />
        </button>

        <div
          className={cn(
            "fixed left-0 top-0 z-20 h-screen w-64 flex-shrink-0 transition-all",
            !showSidebar && "-left-64",
          )}
        >
          <div className="flex h-full w-full flex-col border-r bg-card p-4 text-card-foreground">
            <Link href="/" className="w-full text-center font-medium">
              Vidhi7 AI
            </Link>

            <div className="py-4">
              {isChatbotRoute && <ChatbotSidebar />}
              {!isChatbotRoute && <DashboardSidebar />}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 z-20 w-full border-r bg-card p-4">
            <Button
              variant={"outline"}
              className="w-full"
              onClick={() =>
                router.push(isChatbotRoute ? "/dashboard" : "/chatbot")
              }
            >
              {isChatbotRoute ? "Consult a Lawyer" : "Chat with AI"} -&gt;
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "flex flex-grow flex-col pl-64 transition-all",
            !showSidebar && "pl-0",
            isChatbotRoute && "pb-[113px]",
          )}
        >
          {children}
        </div>
      </div>
    </ChatbotProvider>
  );
}

export default ChatbotLayout;
