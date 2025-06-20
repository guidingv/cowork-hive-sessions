
import { Users, Clock, Globe, Lock, Eye, Play, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
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
}

interface SessionCardProps {
  session: CoworkingSession;
  onJoin: () => void;
}

export const SessionCard = ({ session, onJoin }: SessionCardProps) => {
  const getVisibilityIcon = () => {
    switch (session.visibility) {
      case 'public':
        return <Globe className="w-4 h-4" />;
      case 'private':
        return <Lock className="w-4 h-4" />;
      case 'invite-only':
        return <Eye className="w-4 h-4" />;
    }
  };

  const getVisibilityColor = () => {
    switch (session.visibility) {
      case 'public':
        return 'text-green-600 bg-green-50';
      case 'private':
        return 'text-red-600 bg-red-50';
      case 'invite-only':
        return 'text-blue-600 bg-blue-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {session.isLive && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-red-600">LIVE</span>
                </div>
              )}
              {!session.isLive && (
                <div className="flex items-center gap-1 text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span className="text-xs">Starting Soon</span>
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">{session.title}</h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{session.description}</p>
          </div>
          
          <div className={`p-2 rounded-lg ${getVisibilityColor()}`}>
            {getVisibilityIcon()}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {session.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {session.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{session.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* Session Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Host</span>
            <span className="font-medium text-gray-800">{session.host}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <Users className="w-3 h-3" />
              Participants
            </span>
            <span className="font-medium text-gray-800">
              {session.participants}/{session.maxParticipants}
            </span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Time
            </span>
            <span className="font-medium text-gray-800">
              {session.startTime} - {session.endTime}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(session.participants / session.maxParticipants) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Join Button */}
        <Button 
          onClick={onJoin}
          className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
          disabled={session.participants >= session.maxParticipants}
        >
          {session.isLive ? (
            <>
              <Play className="w-4 h-4 mr-2" />
              Join Session
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4 mr-2" />
              Get Notified
            </>
          )}
        </Button>

        {session.hostApproval && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Host approval required
          </p>
        )}
      </div>
    </div>
  );
};
