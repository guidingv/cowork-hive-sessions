
import { useState } from "react";
import { X, Users, Clock, Globe, Lock, Eye, Mic, Video, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

interface JoinSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: CoworkingSession | null;
}

export const JoinSessionModal = ({ isOpen, onClose, session }: JoinSessionModalProps) => {
  const [joinData, setJoinData] = useState({
    displayName: "",
    message: "",
    micEnabled: false,
    videoEnabled: false,
    chatEnabled: true
  });

  const handleJoin = () => {
    // Here you would handle the actual joining logic
    console.log("Joining session:", session?.id, "with data:", joinData);
    onClose();
  };

  if (!isOpen || !session) return null;

  const getVisibilityIcon = () => {
    switch (session.visibility) {
      case 'public':
        return <Globe className="w-4 h-4 text-green-600" />;
      case 'private':
        return <Lock className="w-4 h-4 text-red-600" />;
      case 'invite-only':
        return <Eye className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Join Session</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Session Info */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 mb-1">{session.title}</h3>
                <p className="text-sm text-gray-600">{session.description}</p>
              </div>
              {getVisibilityIcon()}
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{session.participants}/{session.maxParticipants}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{session.startTime}-{session.endTime}</span>
              </div>
              <div>
                <span className="font-medium">Host: {session.host}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {session.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Join Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={joinData.displayName}
                onChange={(e) => setJoinData({ ...joinData, displayName: e.target.value })}
                placeholder="How should others see you?"
                required
              />
            </div>

            {session.hostApproval && (
              <div>
                <Label htmlFor="message">Message to Host</Label>
                <Textarea
                  id="message"
                  value={joinData.message}
                  onChange={(e) => setJoinData({ ...joinData, message: e.target.value })}
                  placeholder="Tell the host why you'd like to join..."
                  rows={3}
                />
              </div>
            )}

            {/* Session Preferences */}
            <div className="space-y-3">
              <Label>Session Preferences</Label>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="mic"
                    checked={joinData.micEnabled}
                    onCheckedChange={(checked) => setJoinData({ ...joinData, micEnabled: !!checked })}
                  />
                  <Label htmlFor="mic" className="flex items-center gap-2 text-sm">
                    <Mic className="w-4 h-4" />
                    Enable microphone (for voice chat)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="video"
                    checked={joinData.videoEnabled}
                    onCheckedChange={(checked) => setJoinData({ ...joinData, videoEnabled: !!checked })}
                  />
                  <Label htmlFor="video" className="flex items-center gap-2 text-sm">
                    <Video className="w-4 h-4" />
                    Enable camera (for video chat)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="chat"
                    checked={joinData.chatEnabled}
                    onCheckedChange={(checked) => setJoinData({ ...joinData, chatEnabled: !!checked })}
                  />
                  <Label htmlFor="chat" className="flex items-center gap-2 text-sm">
                    <MessageSquare className="w-4 h-4" />
                    Enable text chat
                  </Label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                onClick={handleJoin}
                className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                disabled={!joinData.displayName}
              >
                {session.hostApproval ? "Request to Join" : "Join Session"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
