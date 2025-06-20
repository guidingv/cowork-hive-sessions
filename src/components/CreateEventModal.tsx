
import { useState } from "react";
import { X, Globe, Lock, Eye, Users, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSession: (sessionData: any) => void;
}

export const CreateEventModal = ({ isOpen, onClose, onCreateSession }: CreateEventModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    host: "You",
    maxParticipants: 10,
    startTime: "",
    endTime: "",
    visibility: "public" as "public" | "private" | "invite-only",
    tags: "",
    hostApproval: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const sessionData = {
      ...formData,
      tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
    };
    
    onCreateSession(sessionData);
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      host: "You",
      maxParticipants: 10,
      startTime: "",
      endTime: "",
      visibility: "public",
      tags: "",
      hostApproval: false
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Create Coworking Session</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="title">Session Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Morning Focus Session"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="What will people be working on? Any specific goals or rules?"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="maxParticipants">Maximum Participants</Label>
              <Select value={formData.maxParticipants.toString()} onValueChange={(value) => setFormData({ ...formData, maxParticipants: parseInt(value) })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 people</SelectItem>
                  <SelectItem value="10">10 people</SelectItem>
                  <SelectItem value="15">15 people</SelectItem>
                  <SelectItem value="20">20 people</SelectItem>
                  <SelectItem value="30">30 people</SelectItem>
                  <SelectItem value="50">50 people</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="visibility">Session Visibility</Label>
              <Select value={formData.visibility} onValueChange={(value: any) => setFormData({ ...formData, visibility: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Public - Anyone can find and join
                    </div>
                  </SelectItem>
                  <SelectItem value="invite-only">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Invite Only - Visible but requires invite
                    </div>
                  </SelectItem>
                  <SelectItem value="private">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Private - Completely hidden
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="e.g., Development, Writing, Study, Focus"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="hostApproval">Require Host Approval</Label>
                <p className="text-sm text-gray-500">Manually approve each person who wants to join</p>
              </div>
              <Switch
                id="hostApproval"
                checked={formData.hostApproval}
                onCheckedChange={(checked) => setFormData({ ...formData, hostApproval: checked })}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
              >
                Create Session
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
