// Enhanced Weather Knowledge Base with Categories and Specific Conditions
// Each entry is structured for better semantic matching and precise retrieval

export const weatherKnowledgeBase = [
    // ==================== RAIN & PRECIPITATION ====================

    // Light Rain (drizzle, light rain)
    "LIGHT_RAIN: In light rain or drizzle, carry a compact umbrella and wear water-resistant jacket. Regular shoes are fine but avoid suede.",
    "LIGHT_RAIN_DRIVING: Light rain creates slippery roads. Reduce speed by 5-10 km/h and increase following distance to 3 seconds.",
    "LIGHT_RAIN_ACTIVITY: Light rain is perfect for indoor activities like museums, cafes, or shopping. Outdoor exercise is still safe with proper gear.",

    // Moderate to Heavy Rain
    "HEAVY_RAIN: In heavy rain, wear waterproof jacket and pants. Use sturdy umbrella or raincoat with hood. Waterproof boots recommended.",
    "HEAVY_RAIN_DRIVING: Heavy rain reduces visibility to 100m. Use headlights, reduce speed by 30%, and avoid cruise control. Watch for hydroplaning.",
    "HEAVY_RAIN_FLOODING: Never walk or drive through floodwater. Just 15cm of moving water can knock you down; 60cm can sweep away a car.",
    "RAIN_HYDROPLANING: If hydroplaning occurs above 50km/h, ease off accelerator, don't brake hard, and steer straight until traction returns.",

    // Thunderstorms
    "THUNDERSTORM_INDOOR: During thunderstorms, stay indoors, unplug electronics, avoid plumbing and landline phones. Stay away from windows.",
    "THUNDERSTORM_OUTDOOR: If caught outside in thunderstorm, avoid trees, water, and metal objects. Crouch low in a valley or ditch, but don't lie flat.",
    "THUNDERSTORM_30_30_RULE: When you see lightning, count seconds until thunder. If less than 30 seconds, seek shelter immediately. Wait 30 minutes after last thunder.",
    "THUNDERSTORM_CAR: Your car is safe during lightning due to metal frame. Keep windows closed and don't touch metal surfaces.",

    // ==================== SNOW & ICE ====================

    // Light Snow
    "LIGHT_SNOW: In light snow, wear insulated jacket, gloves, and winter boots with good tread. Layer clothing for temperature regulation.",
    "LIGHT_SNOW_DRIVING: Light snow requires gentle acceleration and braking. Increase following distance to 8-10 seconds. Use low gear on hills.",

    // Heavy Snow & Blizzards
    "HEAVY_SNOW: Heavy snow requires thermal base layer, insulated jacket, waterproof outer layer, insulated gloves, warm hat, and snow boots rated to -20°C.",
    "BLIZZARD_SAFETY: In blizzard conditions, avoid travel. If stranded in car, stay inside, run engine 10 minutes per hour, keep exhaust clear of snow.",
    "SNOW_VISIBILITY: In heavy snow with visibility under 50m, use low-beam headlights and fog lights. Pull over safely if visibility becomes zero.",

    // Ice & Freezing Conditions
    "BLACK_ICE: Black ice forms when temperature is 0°C to -4°C, especially on bridges and shaded areas. It's invisible. Reduce speed to 40% of normal.",
    "BLACK_ICE_RECOVERY: If you hit black ice, don't brake or steer suddenly. Ease off gas, keep steering straight, and let car slow naturally.",
    "FREEZING_TEMP: Below 0°C, cover all exposed skin. Frostbite can occur in 30 minutes at -10°C, in 10 minutes at -20°C.",
    "FROSTBITE_SIGNS: Frostbite symptoms: numbness, white or grayish skin, hard or waxy skin. Warm affected area gradually with body heat, never with direct heat.",
    "HYPOTHERMIA: Hypothermia symptoms: shivering, confusion, slurred speech, drowsiness. Move to warm place, remove wet clothes, warm center of body first.",
    "FROZEN_PIPES: When temperature drops below -6°C, let faucets drip slightly, open cabinet doors under sinks, and keep thermostat at 18°C minimum.",

    // ==================== HEAT & SUN ====================

    // Moderate Heat (25-30°C)
    "MODERATE_HEAT: At 25-30°C, wear light-colored, loose-fitting cotton or linen clothes. Drink 2-3 liters of water daily. Use SPF 30+ sunscreen.",
    "MODERATE_HEAT_ACTIVITY: At 25-30°C, exercise is safe but avoid peak sun hours (11am-3pm). Take breaks every 20-30 minutes and hydrate.",

    // High Heat (30-35°C)
    "HIGH_HEAT: At 30-35°C, wear minimal light-colored clothing, wide-brimmed hat, and sunglasses. Drink 3-4 liters of water. Apply sunscreen every 2 hours.",
    "HIGH_HEAT_ACTIVITY: At 30-35°C, limit outdoor activities to early morning (before 9am) or evening (after 6pm). Take 10-minute breaks every 20 minutes.",

    // Extreme Heat (35°C+)
    "EXTREME_HEAT: Above 35°C, stay indoors with AC if possible. If outside, wear UV-protective clothing and hat. Drink water every 15 minutes even if not thirsty.",
    "EXTREME_HEAT_DANGER: Above 35°C, avoid strenuous activity entirely. Heat stroke can occur within 15 minutes. Stay in shade or AC.",
    "HEAT_EXHAUSTION: Heat exhaustion symptoms: heavy sweating, weakness, cold/clammy skin, nausea, fast pulse. Move to cool place, drink water, apply cool cloths.",
    "HEAT_STROKE: Heat stroke symptoms: temperature above 40°C, hot dry skin, rapid pulse, confusion, unconsciousness. Call emergency services immediately.",
    "CAR_HEAT_DANGER: Car interior can reach 60°C in 10 minutes when outside temp is 30°C. Never leave children, pets, or elderly in parked car, even with windows cracked.",

    // UV & Sun Protection
    "UV_INDEX_LOW: UV Index 0-2 is low. Sunscreen recommended for extended outdoor time. Sunglasses optional.",
    "UV_INDEX_MODERATE: UV Index 3-5 is moderate. Use SPF 30+ sunscreen, wear hat and sunglasses. Seek shade during midday.",
    "UV_INDEX_HIGH: UV Index 6-7 is high. SPF 30+ sunscreen mandatory, reapply every 2 hours. Wear protective clothing, hat, and sunglasses. Minimize sun exposure 10am-4pm.",
    "UV_INDEX_VERY_HIGH: UV Index 8-10 is very high. SPF 50+ sunscreen, UV-protective clothing, wide-brimmed hat, and sunglasses required. Avoid sun 10am-4pm.",
    "UV_INDEX_EXTREME: UV Index 11+ is extreme. Minimize outdoor time. If outside, full protection: SPF 50+, long sleeves, pants, hat, sunglasses. Seek shade.",

    // ==================== COLD WEATHER ====================

    // Cool (10-15°C)
    "COOL_WEATHER: At 10-15°C, wear light jacket or sweater. Long pants recommended. No special precautions needed.",

    // Cold (0-10°C)
    "COLD_WEATHER: At 0-10°C, wear insulated jacket, long pants, closed-toe shoes. Gloves and hat recommended for extended outdoor time.",

    // Very Cold (-10 to 0°C)
    "VERY_COLD: At -10 to 0°C, wear thermal base layer, insulated jacket, winter coat, gloves, warm hat covering ears, and insulated boots.",

    // Extreme Cold (Below -10°C)
    "EXTREME_COLD: Below -10°C, wear multiple layers: thermal underwear, fleece mid-layer, down jacket, windproof outer layer. Cover all skin. Limit outdoor time to 30 minutes.",
    "EXTREME_COLD_BREATHING: Below -20°C, cover mouth and nose with scarf to warm air before breathing. Cold air can damage lungs.",

    // ==================== WIND ====================

    // Moderate Wind (20-40 km/h)
    "MODERATE_WIND: Wind 20-40 km/h can blow away lightweight objects. Secure patio furniture, umbrellas, and trash cans. Cycling is challenging.",

    // Strong Wind (40-60 km/h)
    "STRONG_WIND: Wind 40-60 km/h makes walking difficult and cycling dangerous. Avoid high-profile vehicles. Watch for falling branches and debris.",
    "STRONG_WIND_DRIVING: In strong crosswinds (40-60 km/h), grip steering wheel firmly, reduce speed by 20%, and be extra cautious on bridges and open areas.",

    // Very Strong Wind (60+ km/h)
    "VERY_STRONG_WIND: Wind above 60 km/h is dangerous. Stay indoors. Flying debris can cause injury. Avoid trees and power lines.",
    "WIND_CHILL: Wind chill makes it feel colder. At -10°C with 30 km/h wind, it feels like -20°C. Frostbite risk increases significantly.",

    // ==================== HUMIDITY ====================

    "HIGH_HUMIDITY: Humidity above 70% makes it feel 5-10°C hotter. Sweat doesn't evaporate well. Drink extra water and wear moisture-wicking fabrics.",
    "LOW_HUMIDITY: Humidity below 30% causes dry skin, chapped lips, and static electricity. Use moisturizer, lip balm, and drink extra water. Run humidifier indoors.",
    "HUMIDITY_BREATHING: High humidity (80%+) can make breathing difficult for people with asthma or respiratory issues. Stay in air-conditioned spaces.",

    // ==================== VISIBILITY & FOG ====================

    "LIGHT_FOG: In light fog (visibility 200-500m), use low-beam headlights and reduce speed by 20%. Avoid high beams as they reflect off fog.",
    "HEAVY_FOG: In heavy fog (visibility under 100m), use fog lights if available, reduce speed to 40 km/h or less, and use road markings as guide.",
    "DENSE_FOG: In dense fog (visibility under 50m), pull over safely with hazard lights on. Driving is extremely dangerous.",

    // ==================== SPECIAL CONDITIONS ====================

    // Air Quality
    "AIR_QUALITY_MODERATE: Air Quality Index (AQI) 51-100 is moderate. Sensitive individuals should limit prolonged outdoor exertion.",
    "AIR_QUALITY_UNHEALTHY_SENSITIVE: AQI 101-150 is unhealthy for sensitive groups. People with asthma, children, and elderly should reduce outdoor activity.",
    "AIR_QUALITY_UNHEALTHY: AQI 151-200 is unhealthy. Everyone should reduce outdoor exertion. Wear N95 mask if going outside.",
    "AIR_QUALITY_VERY_UNHEALTHY: AQI 201-300 is very unhealthy. Avoid outdoor activity. Stay indoors with air purifier. Wear N95 mask if must go out.",

    // Pollen & Allergies
    "POLLEN_LOW: Low pollen count (0-2.4) is safe for most people. Allergy sufferers may still need antihistamines.",
    "POLLEN_MODERATE: Moderate pollen count (2.5-4.8) affects sensitive individuals. Keep windows closed, shower after being outside.",
    "POLLEN_HIGH: High pollen count (4.9-7.2) affects most allergy sufferers. Take antihistamines, wear sunglasses, avoid outdoor activities during peak hours (5am-10am).",
    "POLLEN_VERY_HIGH: Very high pollen count (7.3+) is severe. Stay indoors with windows closed, use air purifier, take allergy medication, and shower immediately after coming inside.",

    // Sun Glare
    "SUN_GLARE_MORNING: Morning sun glare (6-9am) occurs when driving east. Keep sunglasses in car, use sun visor, and increase following distance.",
    "SUN_GLARE_EVENING: Evening sun glare (4-7pm) occurs when driving west. Reduce speed, use polarized sunglasses, and be extra cautious at intersections.",

    // ==================== DRIVING SAFETY ====================

    "WET_ROAD_BRAKING: Wet roads double your braking distance. If dry stopping distance is 20m, wet is 40m. Brake early and gently.",
    "TIRE_PRESSURE_COLD: Tire pressure drops 1 PSI for every 5°C decrease in temperature. Check and adjust tire pressure when temperature changes significantly.",
    "TIRE_PRESSURE_HOT: Tire pressure increases in hot weather. Check tire pressure when tires are cold (before driving or 3+ hours after driving).",
    "WINTER_CAR_KIT: Winter car emergency kit: blanket, flashlight, first aid kit, water, snacks, ice scraper, jumper cables, and sand/kitty litter for traction.",
    "FUEL_LINE_FREEZE: Keep gas tank at least half full in winter to prevent fuel line from freezing and to add weight for better traction.",

    // ==================== PET SAFETY ====================

    "PET_HOT_PAVEMENT: Pavement above 40°C can burn dog paws in 60 seconds. Test with back of hand for 7 seconds. Walk dogs before 9am or after 8pm in summer.",
    "PET_HEAT_SAFETY: Dogs can't sweat like humans. In heat above 25°C, provide shade, unlimited water, and avoid exercise. Watch for excessive panting and drooling.",
    "PET_COLD_SAFETY: Small dogs, short-haired breeds, and puppies need sweaters below 7°C. Limit outdoor time below 0°C. Watch for shivering and lifting paws.",
    "PET_WINTER_PAWS: Salt and ice melt chemicals can burn pet paws and are toxic if ingested. Use pet-safe ice melt and wipe paws after walks.",

    // ==================== HOME & GARDEN ====================

    "FROST_PLANTS: When frost is expected (temperature below 2°C), cover sensitive plants with cloth or bring potted plants indoors. Water plants before frost.",
    "GARDEN_WATERING_HOT: In heat above 30°C, water plants early morning (6-8am) or evening (7-9pm). Midday watering wastes water through evaporation.",
    "GARDEN_WATERING_COLD: In temperatures below 5°C, water plants midday when temperature is warmest to prevent root damage from frozen water.",
    "GUTTER_MAINTENANCE: Clean gutters before rainy season and after autumn to prevent water damage and ice dams in winter.",

    // ==================== EMERGENCY PREPAREDNESS ====================

    "WEATHER_WATCH: Weather 'Watch' means conditions are favorable for severe weather. Stay alert and monitor forecasts.",
    "WEATHER_WARNING: Weather 'Warning' means severe weather is imminent or occurring. Take immediate protective action.",
    "EMERGENCY_KIT: Emergency kit essentials: 3 days water (4 liters per person per day), non-perishable food, flashlight, batteries, first aid kit, medications, phone charger.",
    "POWER_OUTAGE_PREP: Before storms, charge all devices, fill bathtub with water, set fridge to coldest setting, and have cash on hand (ATMs won't work).",
    "STORM_SHELTER: Safest place during tornado or severe storm: basement or interior room on lowest floor, away from windows. Cover yourself with mattress or heavy blankets.",
];

// Category mapping for better retrieval (optional enhancement)
export const weatherCategories = {
    rain: ["LIGHT_RAIN", "HEAVY_RAIN", "RAIN_", "THUNDERSTORM"],
    snow: ["SNOW", "ICE", "BLIZZARD", "FREEZING", "FROZEN"],
    heat: ["HEAT", "HOT", "UV_INDEX", "SUN"],
    cold: ["COLD", "FROST", "HYPOTHERMIA"],
    wind: ["WIND"],
    humidity: ["HUMIDITY"],
    visibility: ["FOG", "GLARE"],
    driving: ["DRIVING", "ROAD", "TIRE", "CAR"],
    health: ["EXHAUSTION", "STROKE", "FROSTBITE", "HYPOTHERMIA"],
    pets: ["PET"],
    home: ["PLANTS", "GARDEN", "PIPES", "GUTTER"],
    emergency: ["EMERGENCY", "WARNING", "WATCH", "SHELTER"]
};
