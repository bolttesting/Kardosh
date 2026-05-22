<template>
  <div ref="mapEl" class="w-full h-full min-h-[480px] rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  markers: { type: Array, default: () => [] },
  selectedId: { type: Number, default: null },
})

const emit = defineEmits(['select'])

function escapeHtml(text) {
  return String(text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const mapEl = ref(null)
let markerById = new Map()
let map = null
let layerGroup = null

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

function focusMarker(id) {
  if (!map || id == null) return
  const marker = markerById.get(id)
  const m = props.markers.find((x) => x.id === id)
  if (marker && m?.latitude && m?.longitude) {
    map.flyTo([m.latitude, m.longitude], 13, { duration: 0.6 })
    marker.openPopup()
  }
}

function renderMarkers() {
  if (!map || !layerGroup) return
  layerGroup.clearLayers()
  markerById = new Map()

  const bounds = []
  props.markers.forEach((m) => {
    if (!m.latitude || !m.longitude) return
    const marker = L.marker([m.latitude, m.longitude], { icon: defaultIcon })
    const area = m.location?.district || m.location?.region || 'UAE'
    const title = m.title || m.name || 'Project'
    marker.bindPopup(
      `<div class="reelly-map-popup" style="min-width:12.5rem;max-width:16rem;font-family:inherit;line-height:1.45;padding:2px 0">
        <strong style="display:block;margin:0 0 6px;font-size:14px;font-weight:600;color:#0f172a;line-height:1.35">${escapeHtml(title)}</strong>
        <span style="display:block;font-size:12px;color:#64748b">${escapeHtml(area)}</span>
        <a href="/property-detail/${m.id}" style="display:inline-block;margin-top:10px;font-size:12px;font-weight:600;color:#0f172a;text-decoration:underline">View project →</a>
      </div>`,
      { className: 'reelly-map-popup-wrap', maxWidth: 280 }
    )
    marker.on('click', () => emit('select', m.id))
    layerGroup.addLayer(marker)
    markerById.set(m.id, marker)
    bounds.push([m.latitude, m.longitude])
  })

  if (bounds.length) {
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 })
  } else {
    map.setView([25.2048, 55.2708], 10)
  }
}

onMounted(() => {
  map = L.map(mapEl.value, { scrollWheelZoom: true }).setView([25.2048, 55.2708], 10)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap',
    maxZoom: 19,
  }).addTo(map)
  layerGroup = L.layerGroup().addTo(map)
  renderMarkers()
})

watch(() => props.markers, renderMarkers, { deep: true })

watch(
  () => props.selectedId,
  (id) => {
    if (id != null) focusMarker(id)
  }
)

onUnmounted(() => {
  map?.remove()
  map = null
})
</script>

<style>
.leaflet-container {
  z-index: 0;
  font: inherit;
}

:deep(.reelly-map-popup-wrap .leaflet-popup-content) {
  margin: 12px 14px;
  line-height: 1.45;
}

:deep(.reelly-map-popup-wrap .leaflet-popup-content-wrapper) {
  border-radius: 10px;
  box-shadow: 0 4px 20px rgb(15 23 42 / 0.18);
}
</style>
