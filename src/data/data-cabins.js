import { supabaseUrl } from "../services/supabase";

const imageUrl = `${supabaseUrl}/storage/v1/object/sign/cabin-images/`;

export const cabins = [
  {
    name: "001",
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    image:
      imageUrl +
      "cabin-001.jpg" +
      "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDAxLmpwZyIsImlhdCI6MTcyNDUyNDEyMywiZXhwIjo0ODc4MTI0MTIzfQ.PyC0OZ7Q57e7w_5T-YpYwdPQCBL1nbbqMVz0uA0hGYQ&t=2024-08-24T18%3A28%3A42.299Z",
    description:
      "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
  },
  {
    name: "002",
    maxCapacity: 2,
    regularPrice: 350,
    discount: 25,
    image:
      imageUrl +
      "cabin-002.jpg" +
      "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDAyLmpwZyIsImlhdCI6MTcyNDUyNDA0OCwiZXhwIjo0ODc4MTI0MDQ4fQ.5LmirTJCZcuV1VovXjter2RFrRfjFN5KwaUCoX88K1o&t=2024-08-24T18%3A27%3A27.256Z",
    description:
      "Escape to the serenity of nature and indulge in luxury in our cozy cabin 002. Perfect for couples, this cabin offers a secluded and intimate retreat in the heart of a picturesque forest. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace and a fully-equipped kitchen. The luxurious bedroom features a plush king-size bed and spa-like shower. Relax on the private deck with hot tub and take in the beauty of nature.",
  },
  {
    name: "003",
    maxCapacity: 4,
    regularPrice: 300,
    discount: 0,
    image:
      imageUrl +
      "cabin-003.jpg" +
      "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDAzLmpwZyIsImlhdCI6MTcyNDUyNDE4OCwiZXhwIjo0ODc4MTI0MTg4fQ.QRJy15PZfAdjQwQhXp6zhleFQXU3s_AFYvu-IkQVcd4&t=2024-08-24T18%3A29%3A47.675Z",
    description:
      "Experience luxury family living in our medium-sized wooden cabin 003. Perfect for families of up to 4 people, this cabin offers a comfortable and inviting space with all modern amenities. Inside, you will find warm and inviting interiors crafted from high-quality wood, a comfortable living area, a fireplace, and a fully-equipped kitchen. The bedrooms feature plush beds and spa-like bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.",
  },
  {
    name: "004",
    maxCapacity: 4,
    regularPrice: 500,
    discount: 50,
    image:
      imageUrl +
      "cabin-004.jpg" +
      "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDA0LmpwZyIsImlhdCI6MTcyNDUyNDIxNywiZXhwIjo0ODc4MTI0MjE3fQ.mefSkXJSfs2eIFvMACYNWDDW9CFwuL-QhwImvgAXBgM&t=2024-08-24T18%3A30%3A15.943Z",
    description:
      "Indulge in the ultimate luxury family vacation in this medium-sized cabin 004. Designed for families of up to 4, this cabin offers a sumptuous retreat for the discerning traveler. Inside, the cabin boasts of opulent interiors crafted from the finest quality wood, a comfortable living area, a fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-inspired en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    name: "005",
    maxCapacity: 6,
    regularPrice: 350,
    discount: 0,
    image:
      imageUrl +
      "cabin-005.jpg" +
      "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDA1LmpwZyIsImlhdCI6MTcyNDUyNDIzNCwiZXhwIjo0ODc4MTI0MjM0fQ.-62ytXes2s6Z4FKUdHCQcE6Ni9cv7l7CWUcm9DjGwbc&t=2024-08-24T18%3A30%3A33.196Z",
    description:
      "Enjoy a comfortable and cozy getaway with your group or family in our spacious cabin 005. Designed to accommodate up to 6 people, this cabin offers a secluded retreat in the heart of nature. Inside, the cabin features warm and inviting interiors crafted from quality wood, a living area with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. Step outside to your private deck and take in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    name: "006",
    maxCapacity: 6,
    regularPrice: 800,
    discount: 100,
    image:
      imageUrl +
      "cabin-006.jpg" +
      "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDA2LmpwZyIsImlhdCI6MTcyNDUyNDI2MywiZXhwIjo0ODc4MTI0MjYzfQ.S34fzB4t1_eaqRLt6ViePf6McpdJoDPj1O8-3vXwNT8&t=2024-08-24T18%3A31%3A02.124Z",
    description:
      "Experience the epitome of luxury with your group or family in our spacious wooden cabin 006. Designed to comfortably accommodate up to 6 people, this cabin offers a lavish retreat in the heart of nature. Inside, the cabin features opulent interiors crafted from premium wood, a grand living area with fireplace, and a fully-equipped gourmet kitchen. The bedrooms are adorned with plush beds and spa-like en-suite bathrooms. Step outside to your private deck and soak in the natural surroundings while relaxing in your own hot tub.",
  },
  {
    name: "007",
    maxCapacity: 8,
    regularPrice: 600,
    discount: 100,
    image:
      imageUrl +
      "cabin-007.jpg" +
      "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDA3LmpwZyIsImlhdCI6MTcyNDUyNDI4MiwiZXhwIjo0ODc4MTI0MjgyfQ.HdljOmaMmGYNU8kaXw6Rxol4d3JiNT1Mp3zlYt4gv10&t=2024-08-24T18%3A31%3A21.080Z",
    description:
      "Accommodate your large group or multiple families in the spacious and grand wooden cabin 007. Designed to comfortably fit up to 8 people, this cabin offers a secluded retreat in the heart of beautiful forests and mountains. Inside, the cabin features warm and inviting interiors crafted from quality wood, multiple living areas with fireplace, and a fully-equipped kitchen. The bedrooms are comfortable and equipped with en-suite bathrooms. The cabin has a private deck with a hot tub and outdoor seating area, perfect for taking in the natural surroundings.",
  },
  {
    name: "008",
    maxCapacity: 10,
    regularPrice: 1400,
    discount: 0,
    image:
      imageUrl +
      "cabin-008.jpg" +
      "?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbi1pbWFnZXMvY2FiaW4tMDA4LmpwZyIsImlhdCI6MTcyNDUyNDMwOCwiZXhwIjo0ODc4MTI0MzA4fQ.xNqqZZ_deXnwJ1Oz7ABsmPVRA7E_A3Qjmn6ohkTvd3U&t=2024-08-24T18%3A31%3A47.610Z",
    description:
      "Experience the epitome of luxury and grandeur with your large group or multiple families in our grand cabin 008. This cabin offers a lavish retreat that caters to all your needs and desires. The cabin features an opulent design and boasts of high-end finishes, intricate details and the finest quality wood throughout. Inside, the cabin features multiple grand living areas with fireplaces, a formal dining area, and a gourmet kitchen that is a chef's dream. The bedrooms are designed for ultimate comfort and luxury, with plush beds and en-suite spa-inspired bathrooms. Step outside and immerse yourself in the beauty of nature from your private deck, featuring a luxurious hot tub and ample seating areas for ultimate relaxation and enjoyment.",
  },
];
