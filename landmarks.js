/* Curated descriptions checked against linked tourism sources; viewing pins approximate. */
(function(root){const regions=[
  {
    "id": "tokyo",
    "title": "Tokyo",
    "area": "Tokyo Metropolis",
    "lon": 139.75,
    "lat": 35.69,
    "altitude": 45000,
    "description": "Temples, imperial gardens, and the skyline of Japan’s capital.",
    "stops": [
      {
        "id": "tokyo-1",
        "title": "Senso-ji Temple",
        "lon": 139.7967,
        "lat": 35.7148,
        "altitude": 1400,
        "description": "Asakusa’s historic Buddhist temple is a major landmark of traditional Tokyo. Its approach connects the temple grounds with the lively surrounding neighborhood.",
        "source": "https://www.gotokyo.org/en/see-and-do/index.html",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "tokyo-2",
        "title": "Tokyo Skytree",
        "lon": 139.8107,
        "lat": 35.7101,
        "altitude": 1400,
        "description": "This broadcasting and observation tower stands above eastern Tokyo. It offers a striking contrast to the older streets and temple district around nearby Asakusa.",
        "source": "https://www.gotokyo.org/en/see-and-do/index.html",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "tokyo-3",
        "title": "Imperial Palace grounds",
        "lon": 139.7528,
        "lat": 35.6852,
        "altitude": 2200,
        "description": "Moats and green spaces surround the Imperial Palace in central Tokyo. This map stop highlights the palace area, not permission to enter restricted royal grounds.",
        "source": "https://www.gotokyo.org/en/see-and-do/index.html",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "tokyo-4",
        "title": "Meiji Jingu",
        "lon": 139.6993,
        "lat": 35.6764,
        "altitude": 1400,
        "description": "A forested Shinto shrine near Harajuku, Meiji Jingu offers a quieter setting within the city. Its wooded approach contrasts with the surrounding shopping districts.",
        "source": "https://www.gotokyo.org/en/see-and-do/index.html",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "tokyo-5",
        "title": "Shibuya Scramble Crossing",
        "lon": 139.7006,
        "lat": 35.6595,
        "altitude": 1400,
        "description": "The crossing outside Shibuya Station is a recognizable scene of modern Tokyo. Multiple pedestrian flows meet at the center of this busy urban district.",
        "source": "https://www.gotokyo.org/en/see-and-do/index.html",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      }
    ]
  },
  {
    "id": "kyoto",
    "title": "Kyoto",
    "area": "Kyoto Prefecture",
    "lon": 135.75,
    "lat": 35.02,
    "altitude": 35000,
    "description": "Temple landscapes, a shogunal castle, and the western bamboo grove.",
    "stops": [
      {
        "id": "kyoto-1",
        "title": "Fushimi Inari Taisha",
        "lon": 135.7727,
        "lat": 34.9671,
        "altitude": 1400,
        "description": "Vermilion torii gates line routes through the shrine grounds and up Mount Inari. This stop centers on the lower shrine area in southern Kyoto.",
        "source": "https://www.kyoto.travel/en/areas/fushimi/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "kyoto-2",
        "title": "Kiyomizu-dera",
        "lon": 135.785,
        "lat": 34.9949,
        "altitude": 1400,
        "description": "This temple is one of eastern Kyoto’s major cultural landmarks. The surrounding Gion and Kiyomizu area connects hillside temple scenery with historic streets.",
        "source": "https://kyoto.travel/en/destinations",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "kyoto-3",
        "title": "Nijo Castle",
        "lon": 135.7482,
        "lat": 35.0142,
        "altitude": 1400,
        "description": "Built for Tokugawa Ieyasu in 1603, this moated castle served as a shogunal residence in Kyoto. Its palace buildings reflect the power of the Tokugawa rulers.",
        "source": "https://shugakuryoko.kyoto.travel/spot/506/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "kyoto-4",
        "title": "Kinkaku-ji · Golden Pavilion",
        "lon": 135.7292,
        "lat": 35.0394,
        "altitude": 1400,
        "description": "The Golden Pavilion is reflected in a pond surrounded by carefully arranged garden scenery. The temple is one of Kyoto’s best-known architectural landmarks.",
        "source": "https://www.kyoto.travel/en/shrine_temple/165.html",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "kyoto-5",
        "title": "Arashiyama Bamboo Grove",
        "lon": 135.6713,
        "lat": 35.017,
        "altitude": 1400,
        "description": "Tall bamboo creates a distinctive landscape in western Kyoto’s Saga–Arashiyama district. The wider area also includes temples and the Togetsukyo Bridge.",
        "source": "https://www.kyoto.travel/en/areas/saga-arashiyama/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      }
    ]
  },
  {
    "id": "osaka",
    "title": "Osaka",
    "area": "Osaka Prefecture",
    "lon": 135.51,
    "lat": 34.68,
    "altitude": 30000,
    "description": "Castle grounds, downtown streets, temples, and observation towers.",
    "stops": [
      {
        "id": "osaka-1",
        "title": "Osaka Castle",
        "lon": 135.5262,
        "lat": 34.6873,
        "altitude": 1400,
        "description": "Osaka’s castle area is a major historic sightseeing destination within the modern city. The surrounding grounds give a clear sense of the site’s scale.",
        "source": "https://osaka-info.jp/en/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "osaka-2",
        "title": "Umeda Sky Building",
        "lon": 135.4896,
        "lat": 34.7053,
        "altitude": 1400,
        "description": "The elevated Kuchu-Teien Observatory provides broad views across Osaka. The building is a prominent landmark in the Umeda district.",
        "source": "https://osaka-info.jp/en/special/universal/tourism/梅田スカイビル（空中庭園展望台）/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "osaka-3",
        "title": "Dotonbori",
        "lon": 135.5013,
        "lat": 34.6687,
        "altitude": 1400,
        "description": "Dotonbori is a lively center of Osaka’s Minami district, associated with dining, shopping, and bright city streets. This pin marks a representative canal-side location.",
        "source": "https://osaka-info.jp/en/special/kita-minami/course01/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "osaka-4",
        "title": "Shitenno-ji",
        "lon": 135.5168,
        "lat": 34.6545,
        "altitude": 1400,
        "description": "Founded in 593 by Prince Shotoku, Shitenno-ji is an important early Buddhist temple. The site brings a much older layer of history into urban Osaka.",
        "source": "https://osaka-info.jp/en/special/kita-minami/course01/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "osaka-5",
        "title": "Tsutenkaku",
        "lon": 135.5063,
        "lat": 34.6525,
        "altitude": 1400,
        "description": "This landmark observation tower rises over Shinsekai. Its surroundings and city views make it a recognizable symbol of Osaka.",
        "source": "https://www.osaka-info.jp/en/spot/tsutenkaku/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      }
    ]
  },
  {
    "id": "hiroshima",
    "title": "Hiroshima",
    "area": "Hiroshima Prefecture",
    "lon": 132.36,
    "lat": 34.33,
    "altitude": 65000,
    "description": "Places of remembrance, gardens, castle history, and Miyajima.",
    "stops": [
      {
        "id": "hiroshima-1",
        "title": "Atomic Bomb Dome",
        "lon": 132.4536,
        "lat": 34.3955,
        "altitude": 1400,
        "description": "The preserved remains of this building bear witness to the atomic bombing of Hiroshima on August 6, 1945. The memorial stands as a call for peace.",
        "source": "https://www.japan.travel/en/destinations/chugoku/hiroshima/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "hiroshima-2",
        "title": "Peace Memorial Park",
        "lon": 132.4523,
        "lat": 34.3928,
        "altitude": 2200,
        "description": "This memorial landscape commemorates those who died in the atomic bombing. Its monuments provide a setting for remembrance and reflection on peace.",
        "source": "https://www.japan.travel/en/destinations/chugoku/hiroshima/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "hiroshima-3",
        "title": "Hiroshima Castle grounds",
        "lon": 132.4596,
        "lat": 34.4028,
        "altitude": 2200,
        "description": "The original castle dates to the late sixteenth century and was destroyed in 1945. A reconstructed keep represents the city’s earlier castle-town history.",
        "source": "https://www.japan.travel/en/spot/146/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "hiroshima-4",
        "title": "Shukkeien Garden",
        "lon": 132.4676,
        "lat": 34.399,
        "altitude": 1400,
        "description": "A landscaped garden in central Hiroshima, Shukkeien offers a compact setting of water, paths, and carefully composed scenery. It provides a quieter contrast to nearby city streets.",
        "source": "https://www.japan.travel/en/spot/889/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "hiroshima-5",
        "title": "Itsukushima Shrine · Miyajima",
        "lon": 132.3198,
        "lat": 34.2959,
        "altitude": 1400,
        "description": "Itsukushima Shrine is associated with Miyajima’s famous red torii gate and coastal setting. This stop is on Miyajima in Hiroshima Prefecture, outside Hiroshima City.",
        "source": "https://www.japan.travel/en/destinations/chugoku/hiroshima/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      }
    ]
  },
  {
    "id": "fukuoka",
    "title": "Fukuoka",
    "area": "Fukuoka Prefecture",
    "lon": 130.44,
    "lat": 33.56,
    "altitude": 55000,
    "description": "City parks and Hakata heritage, followed by Dazaifu.",
    "stops": [
      {
        "id": "fukuoka-1",
        "title": "Fukuoka Tower",
        "lon": 130.3515,
        "lat": 33.5933,
        "altitude": 1400,
        "description": "An observation tower near the waterfront, Fukuoka Tower is a prominent feature of the city’s coastal skyline. It connects the urban view with Hakata Bay.",
        "source": "https://www.japan.travel/en/itineraries/exploring-fukuoka-citys-past-and-present/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "fukuoka-2",
        "title": "Ohori Park",
        "lon": 130.3763,
        "lat": 33.5861,
        "altitude": 2200,
        "description": "Ohori is a large city-center park organized around a pond. Its name recalls the moat associated with the nearby Fukuoka Castle site.",
        "source": "https://www.japan.travel/en/itineraries/exploring-fukuoka-citys-past-and-present/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "fukuoka-3",
        "title": "Fukuoka Castle ruins",
        "lon": 130.383,
        "lat": 33.5845,
        "altitude": 1400,
        "description": "The castle remains lie within Maizuru Park. The site preserves traces of Fukuoka’s castle history amid the modern city.",
        "source": "https://www.japan.travel/en/spot/795/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "fukuoka-4",
        "title": "Kushida Shrine",
        "lon": 130.4107,
        "lat": 33.5931,
        "altitude": 1400,
        "description": "Kushida Shrine is associated with the guardian deity of Hakata. It is an important cultural landmark within Fukuoka’s historic Hakata district.",
        "source": "https://www.japan.travel/en/itineraries/exploring-fukuoka-citys-past-and-present/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "fukuoka-5",
        "title": "Dazaifu Tenmangu",
        "lon": 130.5348,
        "lat": 33.5215,
        "altitude": 1400,
        "description": "Dedicated to the scholar Sugawara no Michizane, this shrine is a major destination in Dazaifu. Dazaifu is a separate city within Fukuoka Prefecture.",
        "source": "https://www.japan.travel/en/spot/798/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      }
    ]
  },
  {
    "id": "okinawa",
    "title": "Okinawa",
    "area": "Okinawa Prefecture · main island",
    "lon": 127.85,
    "lat": 26.48,
    "altitude": 125000,
    "description": "Ryukyuan heritage and coastal landscapes from Naha to Motobu.",
    "stops": [
      {
        "id": "okinawa-1",
        "title": "Kokusai Street · Naha",
        "lon": 127.6853,
        "lat": 26.2153,
        "altitude": 1400,
        "description": "Naha’s central shopping street brings together restaurants, souvenir shops, and city life. The pin represents one point along the street rather than its full extent.",
        "source": "https://visitokinawajapan.com/plan-your-trip/recommended-trips/three-day-main-island/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "okinawa-2",
        "title": "Shurijo Castle Park",
        "lon": 127.7194,
        "lat": 26.217,
        "altitude": 2200,
        "description": "Shuri was the political and cultural center of the Ryukyu Kingdom. This stop highlights the castle park and its royal heritage, without implying current building access.",
        "source": "https://visitokinawajapan.com/discover/world-heritage-top/shurijo-castle-park/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "okinawa-3",
        "title": "Cape Manzamo",
        "lon": 127.8501,
        "lat": 26.5049,
        "altitude": 1400,
        "description": "This coastal viewpoint is known for its distinctive cliff landscape and sea views. It introduces the open coastline of Okinawa’s main island.",
        "source": "https://visitokinawajapan.com/plan-your-trip/recommended-trips/three-day-main-island/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "okinawa-4",
        "title": "Okinawa Churaumi Aquarium",
        "lon": 127.8779,
        "lat": 26.6943,
        "altitude": 1400,
        "description": "Located on the Motobu Peninsula, the aquarium introduces marine life associated with Okinawa’s surrounding seas. This is a map visit to the facility’s location.",
        "source": "https://visitokinawajapan.com/plan-your-trip/recommended-trips/three-day-main-island/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "okinawa-5",
        "title": "Nakijin Castle ruins",
        "lon": 127.9295,
        "lat": 26.6915,
        "altitude": 1400,
        "description": "The stone walls of Nakijin recall the northern kingdom of Hokuzan before the unification of the Ryukyu Kingdom. The hilltop site is part of Okinawa’s World Heritage landscape.",
        "source": "https://visitokinawajapan.com/discover/world-heritage-top/nakijin-castle-ruins/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      }
    ]
  },
  {
    "id": "sapporo",
    "title": "Sapporo",
    "area": "Hokkaido · Sapporo area",
    "lon": 141.33,
    "lat": 43.04,
    "altitude": 40000,
    "description": "City history, parkland, a shrine, and a mountain viewpoint.",
    "stops": [
      {
        "id": "sapporo-1",
        "title": "Odori Park",
        "lon": 141.3508,
        "lat": 43.06,
        "altitude": 2200,
        "description": "This central park forms a green corridor through Sapporo. It is a useful starting point for understanding the city’s layout and nearby landmarks.",
        "source": "https://visit.sapporo.travel/itineraries/02/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "sapporo-2",
        "title": "Sapporo Clock Tower",
        "lon": 141.3535,
        "lat": 43.0626,
        "altitude": 1400,
        "description": "The clock tower building is linked to the former Sapporo Agricultural College. It preserves a visible connection to the city’s early modern development.",
        "source": "https://visit.sapporo.travel/discover/art-culture/sapporo-clock-tower/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "sapporo-3",
        "title": "Sapporo Beer Museum",
        "lon": 141.3687,
        "lat": 43.0713,
        "altitude": 1400,
        "description": "The museum traces the history of beer production and beer culture in Japan. Its exhibits connect brewing with the development of Hokkaido.",
        "source": "https://visit.sapporo.travel/discover/cuisine/sapporo-beer-garden/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "sapporo-4",
        "title": "Hokkaido Shrine",
        "lon": 141.3078,
        "lat": 43.0543,
        "altitude": 1400,
        "description": "Set in the Maruyama area, Hokkaido Shrine combines a spiritual site with a wooded setting. Its grounds are also part of everyday walks for local residents.",
        "source": "https://visit.sapporo.travel/discover/art-culture/hokkaido-shrine/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      },
      {
        "id": "sapporo-5",
        "title": "Mount Moiwa viewpoint",
        "lon": 141.3225,
        "lat": 43.022,
        "altitude": 1400,
        "description": "Mount Moiwa overlooks Sapporo and the surrounding landscape. The summit viewpoint is known for its broad city panorama, including views after dark.",
        "source": "https://visit.sapporo.travel/discover/nature/mt-moiwa/",
        "checked": "2026-10-07",
        "coordinateNote": "Approximate viewing pin; not a surveyed entrance or navigation point."
      }
    ]
  }
];root.JAPAN_REGIONS=regions;if(typeof module!=="undefined")module.exports=regions;})(globalThis);
