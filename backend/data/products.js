const PACKAGE_SIZES = {
  XSMALL: "Très petit",
  SMALL: "Petit",
  MEDIUM: "Moyen",
  LARGE: "Grand",
  XLARGE: "Très grand",
};

const products = [
  {
    name: "Airpods Wireless Bluetooth Headphones",
    mainImage: "/images/airpods.jpg",
    thumbnailImages: [
      "/images/airpods_thumb1.jpg",
      "/images/airpods_thumb2.jpg",
      "/images/airpods_thumb3.jpg"
    ],
    description:
      "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
    brand: "Apple",
    category: "topRated",
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
    packageSize: {
      size: PACKAGE_SIZES.XSMALL,
      dimensions: {
        L: 10,
        W: 5,
        H: 3,
      },
    }
  },
  {
    name: "iPhone 13 Pro 256GB Memory",
    mainImage: "/images/phone.jpg",
    thumbnailImages: [
      "/images/phone_thumb1.jpg",
      "/images/phone_thumb2.jpg",
      "/images/phone_thumb3.jpg"
    ],
    description:
      "Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life",
    brand: "Apple",
    category: "newArrivals",
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
    packageSize: {
      size: PACKAGE_SIZES.SMALL,
      dimensions: {
        L: 10,
        W: 5,
        H: 3,
      },
    },
  },
  {
    name: "Cannon EOS 80D DSLR Camera",
    mainImage: "/images/camera.jpg",
    thumbnailImages: [
      "/images/camera_thumb1.jpg",
      "/images/camera_thumb2.jpg",
      "/images/camera_thumb3.jpg"
    ],
    description:
      "Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design",
    brand: "Cannon",
    category: "bestSellers",
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
    packageSize: {
      size: PACKAGE_SIZES.MEDIUM,
      dimensions: {
        L: 10,
        W: 5,
        H: 3,
      },
    }
  },
  {
    name: "Sony Playstation 5",
    mainImage: "/images/playstation.jpg",
    thumbnailImages: [
      "/images/playstation_thumb1.jpg",
      "/images/playstation_thumb2.jpg",
      "/images/playstation_thumb3.jpg"
    ],
    description:
      "The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music",
    brand: "Sony",
    category: "newArrivals",
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
    packageSize: {
      size: PACKAGE_SIZES.LARGE,
      dimensions: {
        L: 10,
        W: 5,
        H: 3,
      },
    },
  },
  {
    name: "Logitech G-Series Gaming Mouse",
    mainImage: "/images/mouse.jpg",
    thumbnailImages: [
      "/images/mouse_thumb1.jpg",
      "/images/mouse_thumb2.jpg",
      "/images/mouse_thumb3.jpg"
    ],
    description:
      "Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience",
    brand: "Logitech",
    category: "bestSellers",
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
    packageSize: {
      size: PACKAGE_SIZES.SMALL,
      dimensions: {
        L: 10,
        W: 5,
        H: 3,
      },
    }
  },
  {
    name: "Amazon Echo Dot 3rd Generation",
    mainImage: "/images/alexa.jpg",
    thumbnailImages: [
      "/images/alexa_thumb1.jpg",
      "/images/alexa_thumb2.jpg",
      "/images/alexa_thumb3.jpg"
    ],
    description:
      "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
    brand: "Amazon",
    category: "topRated",
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
    packageSize: {
      size: PACKAGE_SIZES.MEDIUM,
      dimensions: {
        L: 10,
        W: 5,
        H: 3,
      },
    }
  },
];

export default products;
