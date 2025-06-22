import { useState, useEffect } from "react";
import { Users, Clock, Globe, Lock, Eye, ArrowRight, MapPin, Coffee, Filter, Search } from "lucide-react";
import { CreateEventModal } from "@/components/CreateEventModal";
import { SessionCard } from "@/components/SessionCard";
import { JoinSessionModal } from "@/components/JoinSessionModal";
import { Header } from "@/components/Header";
import { Map } from "@/components/Map";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'live' | 'upcoming'>('all');

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

  // Get all unique tags
  const allTags = Array.from(new Set(sessions.flatMap(session => session.tags)));

  // Filter sessions based on all criteria
  const filteredSessions = sessions.filter(session => {
    const matchesLocation = !selectedLocationId || session.locationId === selectedLocationId;
    const matchesSearch = !searchTerm || 
      session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.host.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || session.tags.includes(selectedTag);
    const matchesView = viewMode === 'all' || 
      (viewMode === 'live' && session.isLive) ||
      (viewMode === 'upcoming' && !session.isLive);
    
    return matchesLocation && matchesSearch && matchesTag && matchesView;
  });

  const liveSessions = filteredSessions.filter(session => session.isLive);
  const upcomingSessions = filteredSessions.filter(session => !session.isLive);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header onStartSession={() => setIsCreateModalOpen(true)} />
      
      <main className="container mx-auto px-6 py-8">
        {/* Compact Hero Section */}
        <section className="relative overflow-hidden py-16 mb-12">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 left-10 w-48 h-48 bg-blue-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-green-200/20 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                coworking
              </span>
              <span className="text-gray-800">.live</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Join live coworking sessions at coffee shops. Connect with focused professionals and boost your productivity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3"
              >
                Start a Session
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="px-6 py-3 border-2 bg-white/80"
                onClick={() => document.getElementById('sessions')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Sessions
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-lg mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{liveSessions.length}</div>
                <div className="text-xs text-gray-600">Live Now</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{locations.length}</div>
                <div className="text-xs text-gray-600">Locations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{sessions.reduce((sum, s) => sum + s.participants, 0)}</div>
                <div className="text-xs text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">24/7</div>
                <div className="text-xs text-gray-600">Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section - Compact */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Discover Locations</h2>
          <Map 
            locations={locations} 
            onLocationSelect={handleLocationSelect}
          />
          {selectedLocationId && (
            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                Showing sessions for: <span className="font-semibold">
                  {locations.find(l => l.id === selectedLocationId)?.name}
                </span>
                <button 
                  onClick={() => setSelectedLocationId(null)}
                  className="ml-2 text-blue-600 underline text-sm"
                >
                  Show all
                </button>
              </p>
            </div>
          )}
        </section>

        {/* Search and Filter Section */}
        <section className="mb-8" id="sessions">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Browse Sessions</h2>
              
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  All ({sessions.length})
                </button>
                <button
                  onClick={() => setViewMode('live')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'live' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Live ({sessions.filter(s => s.isLive).length})
                </button>
                <button
                  onClick={() => setViewMode('upcoming')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'upcoming' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                  }`}
                >
                  Upcoming ({sessions.filter(s => !s.isLive).length})
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  placeholder="Search sessions, hosts, or descriptions..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  <Badge 
                    variant={selectedTag === null ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => setSelectedTag(null)}
                  >
                    All
                  </Badge>
                  {allTags.map(tag => (
                    <Badge 
                      key={tag}
                      variant={selectedTag === tag ? "default" : "secondary"}
                      className="cursor-pointer"
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="text-sm text-gray-600 mb-4">
              Showing {filteredSessions.length} of {sessions.length} sessions
              {searchTerm && ` matching "${searchTerm}"`}
              {selectedTag && ` tagged with "${selectedTag}"`}
              {selectedLocationId && ` at ${locations.find(l => l.id === selectedLocationId)?.name}`}
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedTag || selectedLocationId) && (
              <div className="flex gap-2 mb-6">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTag(null);
                    setSelectedLocationId(null);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Sessions Grid */}
        <section>
          {filteredSessions.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No sessions found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters or be the first to start a session!
              </p>
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
              >
                Start a Session
              </Button>
            </div>
          ) : (
            <>
              {/* Live Sessions */}
              {liveSessions.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <h3 className="text-xl font-bold text-gray-800">Live Now</h3>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
                      {liveSessions.length}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {liveSessions.map((session) => (
                      <SessionCard 
                        key={session.id} 
                        session={session} 
                        onJoin={() => handleJoinSession(session.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Sessions */}
              {upcomingSessions.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <h3 className="text-xl font-bold text-gray-800">Starting Soon</h3>
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {upcomingSessions.length}
                    </span>
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
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />

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
