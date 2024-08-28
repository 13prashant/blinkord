
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogIn } from "lucide-react";
import { useUserStore } from '@/lib/contexts/zustand/userStore';

export default function OwnerFlow() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [discordConnected, setDiscordConnected] = useState(false);
  const [selectedServer, setSelectedServer] = useState<string | null>(null);
  const [hasBot, setHasBot] = useState(false);
  const [guilds, setGuilds] = useState<any[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const setToken = useUserStore((state) => state.setToken);
  const setUserData = useUserStore((state) => state.setUserData);

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      console.log("OAuth code received:", code);
      handleCodeCallback(code);
    }
  }, [searchParams]);

  useEffect(() => {
    if (discordConnected) {
      console.log("Discord connected. Fetching guilds...");
      fetchGuilds();
    }
  }, [discordConnected]);

  useEffect(() => {
    if (hasBot && selectedServer) {
      router.push(`/${selectedServer}/manage`);
    } else if (selectedServer && !hasBot) {
      router.push(`/${selectedServer}/edit`);
    }
  }, [hasBot, selectedServer, router]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleConnectDiscord = async () => {
    try {
      const response = await fetch('/api/discord/getLoginUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ owner: true }),
      });

      const data = await response.json();
      if (data.url) {
        console.log("Redirecting to Discord login URL:", data.url);
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Failed to connect Discord", error);
    }
  };

  const handleCodeCallback = async (code: string) => {
    try {
      const response = await fetch(`/api/discord/callback?code=${encodeURIComponent(code)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error from API:', errorData);
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (!data.userId || !data.username || !data.guilds || !data.token) {
        throw new Error('Incomplete data received from callback');
      }
  
      console.log("JWT Token received:", data.token);  // Log the token here
  
      // Store the token in Zustand store and localStorage
      setToken(data.token);
      localStorage.setItem('discordToken', data.token);
  
      setUserData(data);
      setDiscordConnected(true);
    } catch (error) {
      console.error("Failed to handle Discord callback", error);
    }
  };
  
  const fetchGuilds = async () => {
    const userData = useUserStore.getState().userData;
    const token = useUserStore.getState().token || localStorage.getItem('discordToken');

    if (userData && userData.guilds && token) {
      try {
        console.log("User data:", userData);
        const guildsData = await Promise.all(
          userData.guilds.map(async (guild: any) => {
            const response = await fetch(`/api/discord/guilds/${guild.id}/roles`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!response.ok) {
              if (response.status === 401) {
                console.warn("Token expired, prompting user to re-login.");
                localStorage.removeItem('discordToken');
                setIsLoggedIn(false);
                setDiscordConnected(false);
              } else {
                const errorData = await response.json();
                console.error(`Failed to fetch roles for guild ${guild.id}:`, errorData);
                return { ...guild, roles: [] };
              }
            }

            const rolesData = await response.json();
            console.log(`Roles for guild ${guild.id}:`, rolesData);
            return { ...guild, roles: rolesData.roles };
          })
        );
        console.log("All guilds data fetched:", guildsData);
        setGuilds(guildsData);
      } catch (error) {
        console.error("Failed to fetch guilds or roles", error);
      }
    }
  };

  const handleServerSelect = (serverId: string) => {
    console.log("Server selected:", serverId);
    const serverHasBot = guilds.find((guild) => guild.id === serverId)?.hasBot || false;
    console.log("Does server have bot?", serverHasBot);
    setSelectedServer(serverId);
    setHasBot(serverHasBot);
  };

  return (
    <div className="flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        {!isLoggedIn ? (
          <div className="text-center">
            <p className="mb-4">
              Create shareable links for premium Discord channels.
            </p>
            <div className="flex flex-row items-center justify-center gap-8">
              <div className="flex flex-col md:flex-row justify-start  items-center py-4"></div>
              <button
                onClick={handleLogin}
                className="w-full btn glow-on-hover flex items-center justify-center"
              >
                Get Started
              </button>
            </div>
          </div>
        ) : !discordConnected ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Connect Discord</h2>
            <p className="mb-4">
              To continue, you need to connect your Discord account.
            </p>

            <div className="flex flex-row items-center justify-center gap-8">
              <div className="flex flex-col md:flex-row justify-start  items-center py-4"></div>
              <button
                onClick={handleConnectDiscord}
                className="w-full btn glow-on-hover flex items-center justify-center"
              >
                <LogIn className="mr-2 h-4 w-4" /> Connect Discord
              </button>
            </div>
          </div>
        ) : !selectedServer ? (
          <div>
            <h2 className="text-3xl font-bold mb-8">Select a server</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {guilds.length > 0 ? (
                guilds.map((guild) => (
                  <Card
                    key={guild.id}
                    className="overflow-hidden bg-gray-800 border-0"
                  >
                    <CardContent className="p-0">
                      <div className="aspect-video relative">
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${guild.icon || '/default-icon.png'})`,
                            opacity: 0.3,
                          }}
                          aria-hidden="true"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={guild.icon || "/default-icon.png"}
                            alt={`${guild.name} icon`}
                            className="w-16 h-16 rounded-full border-4 border-white"
                          />
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {guild.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            Roles: {guild.roles.map((role: any) => role.name).join(', ')}
                          </p>
                        </div>
                        <Button
                          variant="secondary"
                          className="bg-gray-700 hover:bg-gray-600"
                          onClick={() => handleServerSelect(guild.id)}
                        >
                          {guild.hasBot ? "Go" : "Setup"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No servers available.</p>
              )}
            </div>
          </div>
        ) : (
          <p>Redirecting...</p>
        )}
      </main>
    </div>
  );
}