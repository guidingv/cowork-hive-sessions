
import { useState, useEffect } from "react";
import { Plus, Users, Clock, Globe, Lock, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateEventModal } from "@/components/CreateEventModal";
import { SessionCard } from "@/components/SessionCard";
import { JoinSessionModal } from "@/components/JoinSessionModal";
import { Header } from "@/components/Header";
import { Map } from "@/components/Map";

interface CoworkingSession {
  id: string;
  title: string;
  description: string;
  host: string;
  participants: number;
  maxParticipants: number;
  isLive: boolean;
  startTime: string;
  endTime: string;
  visibility: 'public' | 'private' | 'invite-only';
  tags: string[];
  hostApproval: boolean;
  locationId: string;
  locationName: string;
  locationAddress: string;
}

interface MapLocation {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
  hasLiveEvents: boolean;
  hasFutureEvents: boolean;
  eventCount: number;
}

const Index = () => {
  const [sessions, setSessions] = useState<CoworkingSession[]>([]);
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState<CoworkingSession | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockLocations: MapLocation[] = [
      {
        id: "1",
        name: "Blue Bottle Coffee",
        address: "1 Ferry Building, San Francisco, CA",
        coordinates: [-122.3942, 37.7956],
        hasLiveEvents: true,
        hasFutureEvents: true,
        eventCount: 2
      },
      {
        id: "2", 
        name: "Philz Coffee",
        address: "201 Berry St, San Francisco, CA",
        coordinates: [-122.3959, 37.7765],
        hasLiveEvents: true,
        hasFutureEvents: false,
        eventCount: 1
      },
      {
        id: "3",
        name: "The Mill",
        address: "736 Divisadero St, San Francisco, CA", 
        coordinates: [-122.4376, 37.7764],
        hasLiveEvents: false,
        hasFutureEvents: true,
        eventCount: 1
      },
      {
        id: "4",
        name: "Four Barrel Coffee",
        address: "375 Valencia St, San Francisco, CA",
        coordinates: [-122.4215, 37.7668],
        hasLiveEvents: false,
        hasFutureEvents: false,
        eventCount: 0
      }
    ];

    const mockSessions: CoworkingSession[] = [
      {
        id: "1",
        title: "Morning Focus Session",
        description: "Deep work session for developers and designers. No meetings, just pure focus time.",
        host: "Sarah Chen",
        participants: 12,
        maxParticipants: 20,
        isLive: true,
        startTime: "09:00",
        endTime: "12:00",
        visibility: 'public',
        tags: ["Development", "Design", "Focus"],
        hostApproval: false,
        locationId: "1",
        locationName: "Blue Bottle Coffee",
        locationAddress: "1 Ferry Building, San Francisco, CA"
      },
      {
        id: "2",
        title: "Creative Writing Circle",
        description: "Writers working on their novels, articles, and creative projects together.",
        host: "Marcus Thompson",
        participants: 8,
        maxParticipants: 15,
        isLive: true,
        startTime: "10:00",
        endTime: "14:00",
        visibility: 'public',
        tags: ["Writing", "Creative", "Literature"],
        hostApproval: true,
        locationId: "2",
        locationName: "Philz Coffee",
        locationAddress: "201 Berry St, San Francisco, CA"
      },
      {
        id: "3",
        title: "Startup Grind Session",
        description: "Entrepreneurs working on their ventures. Great for networking and accountability.",
        host: "Alex Rivera",
        participants: 6,
        maxParticipants: 10,
        isLive: false,
        startTime: "14:00",
        endTime: "18:00",
        visibility: 'invite-only',
        tags: ["Startup", "Business", "Networking"],
        hostApproval: true,
        locationId: "1",
        locationName: "Blue Bottle Coffee",
        locationAddress: "1 Ferry Building, San Francisco, CA"
      },
      {
        id: "4",
        title: "Study Together",
        description: "Students and lifelong learners studying various subjects. Pomodoro style breaks included.",
        host: "Emma Wilson",
        participants: 25,
        maxParticipants: 30,
        isLive: false,
        startTime: "13:00",
        endTime: "17:00",
        visibility: 'public',
        tags: ["Study", "Learning", "Pomodoro"],
        hostApproval: false,
        locationId: "3",
        locationName: "The Mill",
        locationAddress: "736 Divisadero St, San Francisco, CA"
      }
    ];

    setLocations(mockLocations);
    setSessions(mockSessions);
  }, []);

  const handleCreateSession = (sessionData: Omit<CoworkingSession, 'id' | 'participants' | 'isLive'>) => {
    const newSession: CoworkingSession = {
      ...sessionData,
      id: Date.now().toString(),
      participants: 1,
      isLive: true
    };
    setSessions(prev => [newSession, ...prev]);
    setIsCreateModalOpen(false);
  };

  const handleJoinSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setSelectedSession(session);
      setIsJoinModalOpen(true);
    }
  };

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocationId(locationId);
  };

  // Filter sessions based on selected location
  const filteredSessions = selectedLocationId 
    ? sessions.filter(session => session.locationId === selectedLocationId)
    : sessions;

  const liveSessions = filteredSessions.filter(session => session.isLive);
  const upcomingSessions = filteredSessions.filter(session => !session.isLive);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            coworking.live
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Find and join live coworking sessions at coffee shops near you
          </p>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Start a Session
          </Button>
        </div>

        {/* Map Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Discover Locations</h2>
          <Map 
            locations={locations} 
            onLocationSelect={handleLocationSelect}
          />
          {selectedLocationId && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                Showing sessions for: <span className="font-semibold">
                  {locations.find(l => l.id === selectedLocationId)?.name}
                </span>
                <button 
                  onClick={() => setSelectedLocationId(null)}
                  className="ml-2 text-blue-600 underline text-sm"
                >
                  Show all locations
                </button>
              </p>
            </div>
          )}
        </section>

        {/* Live Sessions */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-3xl font-bold text-gray-800">Live Now</h2>
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
              {liveSessions.length} sessions
            </span>
          </div>
          
          {liveSessions.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {selectedLocationId 
                  ? "No live sessions at this location. Check other locations or start one!" 
                  : "No live sessions right now. Be the first to start one!"
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveSessions.map((session) => (
                <SessionCard 
                  key={session.id} 
                  session={session} 
                  onJoin={() => handleJoinSession(session.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Upcoming Sessions */}
        {upcomingSessions.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-800">Starting Soon</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingSessions.map((session) => (
                <SessionCard 
                  key={session.id} 
                  session={session} 
                  onJoin={() => handleJoinSession(session.id)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <CreateEventModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateSession={handleCreateSession}
      />

      <JoinSessionModal 
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        session={selectedSession}
      />
    </div>
  );
};

export default Index;
