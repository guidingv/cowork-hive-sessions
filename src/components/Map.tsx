import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

interface MapLocation {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number]; // [lng, lat]
  hasLiveEvents: boolean;
  hasFutureEvents: boolean;
  eventCount: number;
}

interface MapProps {
  locations: MapLocation[];
  onLocationSelect: (locationId: string) => void;
}

export const Map = ({ locations, onLocationSelect }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(true);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.006, 40.7128], // NYC default
      zoom: 12,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    // Add markers for each location
    locations.forEach((location) => {
      if (!map.current) return;
      
      // Create custom marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'custom-marker';
      markerEl.style.width = '20px';
      markerEl.style.height = '20px';
      markerEl.style.borderRadius = '50%';
      markerEl.style.cursor = 'pointer';
      markerEl.style.border = '2px solid white';
      markerEl.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      
      if (location.hasLiveEvents) {
        markerEl.style.backgroundColor = '#ef4444'; // red for live events
        markerEl.classList.add('animate-pulse');
      } else if (location.hasFutureEvents) {
        markerEl.style.backgroundColor = '#f59e0b'; // orange for future events
      } else {
        markerEl.style.backgroundColor = '#6b7280'; // gray for no events
      }

      // Add marker to map
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat(location.coordinates)
        .addTo(map.current);

      // Add popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-2">
            <h3 class="font-semibold text-sm">${location.name}</h3>
            <p class="text-xs text-gray-600">${location.address}</p>
            <p class="text-xs mt-1">
              ${location.eventCount} event${location.eventCount !== 1 ? 's' : ''}
              ${location.hasLiveEvents ? ' (Live now!)' : ''}
            </p>
          </div>
        `);

      markerEl.addEventListener('click', () => {
        popup.addTo(map.current!);
        onLocationSelect(location.id);
      });
    });

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, locations, onLocationSelect]);

  if (showTokenInput) {
    return (
      <div className="relative w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Setup Map</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Enter your Mapbox public token to view the coworking locations map.
            Get yours at <a href="https://mapbox.com/" target="_blank" className="text-blue-600 underline">mapbox.com</a>
          </p>
          <Input
            placeholder="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja..."
            value={mapboxToken}
            onChange={(e) => setMapboxToken(e.target.value)}
            className="mb-3"
          />
          <button
            onClick={() => setShowTokenInput(false)}
            disabled={!mapboxToken}
            className="w-full bg-blue-600 text-white py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Load Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 text-xs">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span>Live events</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span>Future events</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <span>No events</span>
        </div>
      </div>
    </div>
  );
};
