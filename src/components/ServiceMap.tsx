import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from './ui/input';
import { Button } from './ui/button';

const ServiceMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [tempApiKey, setTempApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [73.0479, 33.6844], // Center between Islamabad and Rawalpindi
      zoom: 10,
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    map.current.on('load', () => {
      if (!map.current) return;

      // Add a data source for Rawalpindi and Islamabad areas
      map.current.addSource('service-areas', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              properties: { name: 'Islamabad', color: '#3b82f6' },
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [72.9, 33.5],
                  [73.2, 33.5],
                  [73.2, 33.8],
                  [72.9, 33.8],
                  [72.9, 33.5]
                ]]
              }
            },
            {
              type: 'Feature',
              properties: { name: 'Rawalpindi', color: '#8b5cf6' },
              geometry: {
                type: 'Polygon',
                coordinates: [[
                  [72.9, 33.55],
                  [73.15, 33.55],
                  [73.15, 33.7],
                  [72.9, 33.7],
                  [72.9, 33.55]
                ]]
              }
            }
          ]
        }
      });

      // Add a layer to highlight the areas
      map.current.addLayer({
        id: 'service-areas-fill',
        type: 'fill',
        source: 'service-areas',
        paint: {
          'fill-color': ['get', 'color'],
          'fill-opacity': 0.3
        }
      });

      // Add border to the areas
      map.current.addLayer({
        id: 'service-areas-outline',
        type: 'line',
        source: 'service-areas',
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 2
        }
      });

      // Add markers for Islamabad and Rawalpindi
      const islamabadMarker = new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([73.0479, 33.6844])
        .setPopup(new mapboxgl.Popup().setHTML('<h3 class="font-semibold">Islamabad</h3><p class="text-sm">We serve all areas</p>'))
        .addTo(map.current);

      const rawalpindiMarker = new mapboxgl.Marker({ color: '#8b5cf6' })
        .setLngLat([73.0551, 33.5651])
        .setPopup(new mapboxgl.Popup().setHTML('<h3 class="font-semibold">Rawalpindi</h3><p class="text-sm">We serve all areas</p>'))
        .addTo(map.current);
    });
  };

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempApiKey.trim()) {
      setApiKey(tempApiKey);
      setShowApiInput(false);
      initializeMap(tempApiKey);
    }
  };

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden border border-border">
      {showApiInput ? (
        <div className="absolute inset-0 flex items-center justify-center bg-card z-10 p-6">
          <form onSubmit={handleApiKeySubmit} className="w-full max-w-md space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Mapbox Access Token Required</h3>
              <p className="text-sm text-muted-foreground">
                Please enter your Mapbox public token to view the service areas map.
                Get your token at{' '}
                <a
                  href="https://mapbox.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  mapbox.com
                </a>
              </p>
            </div>
            <Input
              type="text"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="pk.eyJ1Ijoi..."
              className="w-full"
              required
            />
            <Button type="submit" className="w-full">
              Load Map
            </Button>
          </form>
        </div>
      ) : null}
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default ServiceMap;
